"use server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  // console.log(!session)
  if (!session) return undefined;
  return session;
}
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
