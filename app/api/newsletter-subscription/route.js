import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    const { data, error } = await supabase
      .from("newsletter_subscriptions")
      .insert([{ email }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error); // 👈 log it
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error("Route error:", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}

