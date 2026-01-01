
import {transporter} from '../Middlewares/Transporter.js'
import 'dotenv/config';

const getMailData = async(req, res) => {
console.log(req.body)
  const { name, email, subject, message } = req.body;
  const mailOptions = {
    from: `${process.env.TRANSPORTER_EMAIL}`, // replace with your Gmail email
    to: email,
    subject: `Subject: ${subject}`,
    text: `Dear ${name},\n\nThank you for reaching out to us. Your message has been received with the following details:\n\nMessage: ${message}\n\nWe will get back to you as soon as possible.\n\nBest regards`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Form submitted successfully. Thank you!' });
    }
  });
}

export default getMailData;