require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs-extra');

const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {

  const { name, email, message } = req.body;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'New Portfolio Message',
  text: `
Name: ${name}
Email: ${email}

Message:
${message}
`
});

  const newMessage = {
    name,
    email,
    message,
    date: new Date()
  };

  let messages = [];

  try {
    messages = await fs.readJson('messages.json');
  } catch {
    messages = [];
  }

  messages.push(newMessage);

  await fs.writeJson('messages.json', messages, { spaces: 2 });

  res.json({
    message: 'Message sent successfully ✨'
  });

});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});