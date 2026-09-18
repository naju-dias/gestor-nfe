import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

export interface NotaParseada {
  chaveAcesso: string;
  numero: string;
  dataEmissao: string;
  valorTotal: number;
  fornecedor: {
    cnpj: string;
    nome: string;
  };
  itens: {
    descricao: string;
    quantidade: number;
    valorUnit: number;
    valorTotal: number;
  }[];
}

export function parseNFeXML(xmlString: string): NotaParseada {
  const json = parser.parse(xmlString);
  const infNFe = json.nfeProc?.NFe?.infNFe ?? json.NFe?.infNFe;

  if (!infNFe) {
    throw new Error("XML não parece ser uma NFe válida");
  }

  const emit = infNFe.emit;
  const ide = infNFe.ide;
  const total = infNFe.total.ICMSTot;

  const detArray = Array.isArray(infNFe.det) ? infNFe.det : [infNFe.det];

  return {
    chaveAcesso: infNFe["@_Id"].replace("NFe", ""),
    numero: String(ide.nNF),
    dataEmissao: ide.dhEmi,
    valorTotal: parseFloat(total.vNF),
    fornecedor: {
      cnpj: String(emit.CNPJ),
      nome: emit.xNome,
    },
    itens: detArray.map((det: any) => ({
      descricao: det.prod.xProd,
      quantidade: parseFloat(det.prod.qCom),
      valorUnit: parseFloat(det.prod.vUnCom),
      valorTotal: parseFloat(det.prod.vProd),
    })),
  };
}