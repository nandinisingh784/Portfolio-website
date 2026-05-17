const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/contact', async (req, res) => {

  const { name, email, message } = req.body;

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