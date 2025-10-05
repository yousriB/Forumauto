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
    
    // Convert the date to a local date string to avoid timezone issues
    const date = dateString ? new Date(dateString) : null;
    const localDate = date ? new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : null;

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
