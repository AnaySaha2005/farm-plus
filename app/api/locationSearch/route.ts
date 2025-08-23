import { GoogleGenAI } from "@google/genai";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Initialize Gemini API
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

    async function fetchData() {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are an API that provides location insight for farmers.
Return a valid JSON object formatted like this:
\`\`\`json
{
locInsight:a short compact description for the location also include hazards if occuring and importantly give weather forecast too
}
\`\`\`
Now, generate the JSON response for ${body.location}`,
              },
            ],
          },
        ],
      });

      // Extract raw response text
      const responseText = await response.text;
      // console.log("Raw API Response:", responseText);

      // Extract JSON using regex (in case response contains markdown ```json format)
      if (responseText == undefined) return new Response("hello");
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonResponse = jsonMatch
        ? JSON.parse(jsonMatch[1])
        : JSON.parse(responseText);
      return new Response(JSON.stringify(jsonResponse), { status: 200 });
    }

    return await fetchData();
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
