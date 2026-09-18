async function main() {
  const res = await fetch("http://localhost:3000/api/notas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xml: "<xml>isso não é uma nota fiscal</xml>" }),
  });

  const data = await res.json();
  console.log(res.status, data);
}

main();