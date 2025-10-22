// app/api/appointment-request/route.js

import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      carBrand,
      carModel,
      carYear,
      carChassis,
      serviceType, // array
      message,
      date: dateString,
      time,
    } = body;

    // The date is now sent as YYYY-MM-DD string from frontend, so use it directly
    const localDate = dateString;

    const { error } = await supabase.from("appointment_requests").insert([
      {
        name,
        email,
        phone,
        car_brand: carBrand,
        car_model: carModel,
        car_year: carYear,
        car_chassis: carChassis,
        service_types: serviceType,
        message,
        appointment_date: localDate,
        appointment_time: time,
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
