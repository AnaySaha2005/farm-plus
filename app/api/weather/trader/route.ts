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
                text: `You are an API that provides trends in crop marketing in the given latitude and longitude and temperature.
Return a valid JSON object formatted like this:
\`\`\`json
{
   temp: '30°C', condition: 'Sunny', forecast: 'Rain expected in 2 days'
   insights:['High demand for organic wheat in your area...etc',
      'Stock up on corn as prices are predicted to rise.',
      'Monitor tomato prices, expected to fluctuate soon.',
      and  2 - 3 more insights ],
      marketTrends:[
      {Crop: 'Wheat',
       Price: '(currency sign based on latitude and longitude)200/kg',
       Demand: 'High'},
       .. atleast 5 more such objects based on loaction
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
