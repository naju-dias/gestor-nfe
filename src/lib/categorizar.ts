import Groq from "groq-sdk";

const groq = new Groq();

export async function categorizarItens(
  descricoes: string[]
): Promise<string[]> {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "user",
        content: `Categorize cada item de nota fiscal abaixo em UMA destas categorias: "material de escritório", "serviço", "equipamento", "alimentação", "outros".

Itens:
${descricoes.map((d, i) => `${i + 1}. ${d}`).join("\n")}

Responda APENAS um array JSON de strings, na mesma ordem, sem nenhum texto antes ou depois. Exemplo: ["material de escritório", "serviço"]`,
      },
    ],
  });

  const texto = completion.choices[0]?.message?.content ?? "[]";

  try {
    return JSON.parse(texto.trim());
  } catch {
    return descricoes.map(() => "outros");
  }
}