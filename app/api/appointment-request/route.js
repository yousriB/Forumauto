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

    // Handle date conversion to avoid timezone issues
    let localDate = null;
    if (dateString) {
      // Create a date object and format it as YYYY-MM-DD in local timezone
      const date = new Date(dateString);
      // Get the local date components to avoid timezone conversion issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      localDate = `${year}-${month}-${day}`;
    }

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
