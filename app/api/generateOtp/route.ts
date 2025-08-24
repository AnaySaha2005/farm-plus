import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const phone = body.phone;
        const max=999999;
        const min=100000
        const otp=Math.floor(Math.random() * (max - min + 1)) + min;
        client.messages
        .create({
            body: `${otp}`,
            from: process.env.PHONE,
            to: phone
        })
        return Response.json({otp:otp,status:200})
    }
    catch (e) {
        console.log(e);
        return Response.json({ status: 400 })
    }
    

}