import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req, res) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or any other email service you use
      auth: {
        user: 'forumautoserver@gmail.com',
        pass: 'zfrqhafrqicvvnwy'
      },
    });

    const mailOptions = {
      from: 'Forum Auto Gabès <forumautoserver@gmail.com>', // Sender's email address
      to: 'benaliyousri00@gmail.com', // Admin email address
      subject: 'New Contact Form Submission',
      text: `You have a new contact form submission:

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
