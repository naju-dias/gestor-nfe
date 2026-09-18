import fs from "fs";
import { parseNFeXML } from "./parseNFe";

const xml = fs.readFileSync("src/lib/exemplo-nfe.xml", "utf-8");
console.log(JSON.stringify(parseNFeXML(xml), null, 2));