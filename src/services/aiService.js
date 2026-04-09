import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `
Tu es un expert IT support pour entreprises africaines.
Réponds uniquement en JSON avec:
probleme, categorie, priorite, solution, creer_ticket, titre_ticket, description_ticket
`;

export async function analyzeMessage(message) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message }
    ]
  });

  return JSON.parse(response.choices[0].message.content);
}
