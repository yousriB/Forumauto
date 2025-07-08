import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    const { error } = await supabase
      .from("newsletter_subscriptions")
      .insert([{ email }]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }
}
