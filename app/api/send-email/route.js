import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import format from 'date-fns/format';

export async function POST(req, res) {
  try {
    const { name, phone, email, carBrand, carModel, carYear, carChassis, serviceType, message, date, time } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or any other email service you use
      auth: {
        user: 'forumautoserver@gmail.com',
        pass: 'zfrqhafrqicvvnwy'
      },
    });

    const mailOptions = {
      from: '"Forum Auto Gabès" <forumautoserver@gmail.com>', // Sender's email address
      to: 'rendezvousforum@gmail.com', // Admin email address
      subject: 'New Appointment Request',
      text: `
        You have a new appointment request:

        Name: ${name}
        Phone: ${phone}
        Email: ${email}

        Car Information:
        - Brand: ${carBrand}
        - Model: ${carModel}
        - Year: ${carYear}
        - Chassis Number: ${carChassis}

        Service Types: ${serviceType.join(', ')}

        Message: ${message}

        Appointment Details:
        - Date: ${date ? format(date, 'PPP') : 'Not selected'}
        - Time: ${time}

        Please review the request and contact the customer to confirm.
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
