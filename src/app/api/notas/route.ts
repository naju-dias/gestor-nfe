import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseNFeXML } from "@/lib/parseNFe";
import { categorizarItens } from "@/lib/categorizar";

export async function POST(request: NextRequest) {
  try {
    const { xml } = await request.json();

    if (!xml) {
      return NextResponse.json(
        { error: "Campo 'xml' é obrigatório" },
        { status: 400 }
      );
    }

    let dados;
    try {
        dados = parseNFeXML(xml);
    } catch {
      return NextResponse.json(
        { error: "XML inválido: não foi possível extrair os dados da NFe" },
        { status: 400 }
      );
    }

    // evita importar a mesma nota duas vezes
    const notaExistente = await prisma.nota.findUnique({
      where: { chaveAcesso: dados.chaveAcesso },
    });

    if (notaExistente) {
      return NextResponse.json(
        { error: "Nota já importada", notaId: notaExistente.id },
        { status: 409 }
      );
    }

    // upsert do fornecedor: cria se não existir, reaproveita se já existir
    const fornecedor = await prisma.fornecedor.upsert({
      where: { cnpj: dados.fornecedor.cnpj },
      update: {},
      create: {
        cnpj: dados.fornecedor.cnpj,
        nome: dados.fornecedor.nome,
      },
    });

    const nota = await prisma.nota.create({
      data: {
        chaveAcesso: dados.chaveAcesso,
        numero: dados.numero,
        dataEmissao: new Date(dados.dataEmissao),
        valorTotal: dados.valorTotal,
        fornecedorId: fornecedor.id,
        itens: {
          create: dados.itens.map((item) => ({
            descricao: item.descricao,
            quantidade: item.quantidade,
            valorUnit: item.valorUnit,
            valorTotal: item.valorTotal,
          })),
        },
      },
      include: { itens: true },
    });

    const categorias = await categorizarItens(
        nota.itens.map((item) => item.descricao)
        );

        await Promise.all(
        nota.itens.map((item, i) =>
            prisma.item.update({
            where: { id: item.id },
            data: { categoria: categorias[i] },
            })
        )
        );

    return NextResponse.json({ nota }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao processar a nota" },
      { status: 500 }
    );
  }
}