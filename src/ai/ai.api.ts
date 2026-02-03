export async function askAI(prompt: string): Promise<string> {
  const apiKey = process.env.EXPO_PUBLIC_OPENAI_KEY;

  if (!apiKey) {
    throw new Error("Brak klucza OpenAI");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.log("OpenAI error:", errText);
    throw new Error("Błąd OpenAI");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
