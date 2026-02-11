import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();

    const { car, formData } = body;

    const { error } = await supabase.from("devis_requests").insert([
      {
        car_brand: car.brand,
        car_model: car.model,
        car_version: car.version,
        car_price: car.price,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        cin_or_nf: formData.cinOrNf,
        payment_mode: formData.paymentMode,
        bank_name: formData.bankName,
        leasing_name: formData.leasingName,
        is_first_sale: formData.isFirstSale,
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
