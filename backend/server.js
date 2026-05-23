require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs-extra');

const app = express();


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {

  try {

    const { name, email, message } = req.body;

    console.log("FORM HIT");
    console.log(req.body);

    res.json({
      message: 'Message sent successfully ✨'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Something broke bestie 💀'
    });

  }

});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});