import { getSession } from "@/helper/getSession";
import { decrypt } from "@/lib/jwt";
import { GoogleGenAI } from "@google/genai";
type session = {
  role: string;
  id: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  iat: number;
  exp: number;
};
export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) return Response.json({ status: 400 });

    const data = (await decrypt(session.value)) as session;

    // Default latitude & longitude if not provided
    const latitude = data?.location?.latitude || 20;
    const longitude = data?.location?.longitude || 70;
    // console.log(latitude+"  "+longitude)
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
   temp: '30°C', condition: 'Sunny', forecast: 'Rain expected in 2 days'
   insights:['Use organic fertilizers for better soil health.',
      'Pest activity detected: Consider neem-based pesticides.',
      *this is must *'Best crop to plant this season: Wheat,etc',
      andd  2 - 3 more insights ]
  "soil_composition": [
    { "element": "Nitrogen", "percentage": 2.1 },
    { "element": "Phosphorus", "percentage": 1.3 },
    { "element": "Potassium", "percentage": 0.8 }
  ]
}
\`\`\`
Now, generate the JSON response for latitude ${latitude} and longitude ${longitude}.`,
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
