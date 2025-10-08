import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  // Use absolute URL for redirect
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url.toString());
}
