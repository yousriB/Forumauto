import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      phoneNumber,
      cinOrNf,
      email,
      marque,
      model,
      version,
      region,
      paymentMode,
    } = body;

    const { error } = await supabase.from("custom_devis_requests").insert([
      {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        cin_or_nf: cinOrNf,
        email,
        car_brand: marque,
        car_model: model,
        car_version: version,
        region,
        payment_mode: paymentMode,
        status:"pending",
      },
    ]);

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
