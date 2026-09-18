import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const itens = await prisma.item.findMany({
    include: { nota: { include: { fornecedor: true } } },
  });

  const porCategoria: Record<string, number> = {};
  const porFornecedor: Record<string, number> = {};
  let totalGeral = 0;

  for (const item of itens) {
    const categoria = item.categoria ?? "sem categoria";
    porCategoria[categoria] = (porCategoria[categoria] ?? 0) + item.valorTotal;

    const fornecedor = item.nota.fornecedor.nome;
    porFornecedor[fornecedor] = (porFornecedor[fornecedor] ?? 0) + item.valorTotal;

    totalGeral += item.valorTotal;
  }

  return NextResponse.json({
    totalGeral,
    porCategoria,
    porFornecedor,
  });
}