import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

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
