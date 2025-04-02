import { GoogleGenAI } from "@google/genai";
export async function POST(req:Request){
//req.body should contain latitude and longitude
const data=await req.json();
console.log(data);
const latitude=data?.latitude||22;
const longitude=data?.longitude||73;
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Give soil composition and temperature of lat:"+latitude+"lon:"+longitude+" in json format",
    });
    console.log(response.text);
  }
  await main();
}