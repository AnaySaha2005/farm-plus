import { GoogleGenAI } from "@google/genai";

export async function POST(req:Request) {
  try {
    // Parse incoming request body
    const data = await req.json();
    console.log("Received data:", data);

    // Default latitude & longitude if not provided
    const latitude = data?.latitude || 22;
    const longitude = data?.longitude || 73;

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
                text: `You are an API that provides soil composition and temperature.
Return a valid JSON object formatted like this:
\`\`\`json
{
  "temperature": 25.5 Celcius,
  "soil_composition": [
    { "element": "Nitrogen", "percentage": 2.1 },
    { "element": "Phosphorus", "percentage": 1.3 },
    { "element": "Potassium", "percentage": 0.8 }
  ]
}
\`\`\`
Now, generate the JSON response for latitude ${latitude} and longitude ${longitude}.`
              }
            ]
          }
        ]
      });

      // Extract raw response text
      const responseText = await response.text;
      console.log("Raw API Response:", responseText);

      // Extract JSON using regex (in case response contains markdown ```json format)
      if(responseText==undefined)return new Response("hello")
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonResponse = jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(responseText);

      return new Response(JSON.stringify(jsonResponse), { status: 200 });
    }

    return await fetchData();
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500
    });
  }
}
