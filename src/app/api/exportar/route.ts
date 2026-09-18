import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

export async function GET() {
  const itens = await prisma.item.findMany({
    include: { nota: { include: { fornecedor: true } } },
  });

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Notas Fiscais");

  sheet.columns = [
    { header: "Data Emissão", key: "data", width: 18 },
    { header: "Número Nota", key: "numero", width: 14 },
    { header: "Fornecedor", key: "fornecedor", width: 30 },
    { header: "Item", key: "descricao", width: 35 },
    { header: "Categoria", key: "categoria", width: 20 },
    { header: "Quantidade", key: "quantidade", width: 12 },
    { header: "Valor Unit.", key: "valorUnit", width: 14 },
    { header: "Valor Total", key: "valorTotal", width: 14 },
  ];

  sheet.getRow(1).font = { bold: true };

  for (const item of itens) {
    sheet.addRow({
      data: item.nota.dataEmissao.toLocaleDateString("pt-BR"),
      numero: item.nota.numero,
      fornecedor: item.nota.fornecedor.nome,
      descricao: item.descricao,
      categoria: item.categoria ?? "sem categoria",
      quantidade: item.quantidade,
      valorUnit: item.valorUnit,
      valorTotal: item.valorTotal,
    });
  }

  sheet.getColumn("valorUnit").numFmt = '"R$" #,##0.00';
  sheet.getColumn("valorTotal").numFmt = '"R$" #,##0.00';

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="relatorio-notas.xlsx"',
    },
  });
}