import { NextRequest, NextResponse } from "next/server";

export async function GET(req:Request){
//req.body should contain latitude and longitude
const {data}=await req.json();
const latitude=data?.latitude||22;
const longitude=data?.longitude||73;
}