import "dotenv/config";
import { prisma } from "./prisma";

async function main() {
  await prisma.item.deleteMany({ where: { categoria: null } });
  await prisma.nota.deleteMany({
    where: { itens: { none: {} } },
  });
  console.log("Limpeza concluída");
}

main();