import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req, res) {
  try {
    const { car, formData } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or any other email service you use
      auth: {
        user: 'forumautoserver@gmail.com',
        pass: 'zfrqhafrqicvvnwy'
      },
    });

    const mailOptions = {
      from: 'Forum Auto Gabès <forumautoserver@gmail.com>', // Sender's email address
      to: 'devisforumauto@gmail.com', // Admin email address
      subject: 'Demande de devis',
      text: `Demande de devis:

        Car Details:
        Brand: ${car.brand}
        Model: ${car.model}
        Version: ${car.version}
        Price: ${car.price}

        Contact Information:
        First Name: ${formData.firstName}
        Last Name: ${formData.lastName}
        Email: ${formData.email}
        Phone Number: ${formData.phoneNumber}
        CIN / N° Fiscal: ${formData.cinOrNf}
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
