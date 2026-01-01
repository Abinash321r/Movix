 import nodemailer from 'nodemailer';
 import 'dotenv/config';

 export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: `${process.env.TRANSPORTER_EMAIL}`,   // your Gmail
    pass: `${process.env.TRANSPORTER_PASSWORD}`,      // the app password you generated
  },
});
