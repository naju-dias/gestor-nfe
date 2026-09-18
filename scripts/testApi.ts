import fs from "fs";

async function main() {
  const xml = fs.readFileSync("src/lib/exemplo-nfe.xml", "utf-8");

  const res = await fetch("http://localhost:3000/api/notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xml }),
  });

  const data = await res.json();
  console.log(res.status, data);
}

main();