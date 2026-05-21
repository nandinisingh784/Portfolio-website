const form = document.getElementById('contactForm');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    const response = await fetch('https://portfolio-backend-wzon.onrender.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    responseMsg.innerText = result.message;

    form.reset();

  } catch (error) {
    responseMsg.innerText = 'Something broke bestie 💀';
  }
});
const typingText = document.querySelector('.typing');

const words = [
  'Full Stack Developer',
  'Creative Coder',
  'UI Enthusiast',
  'JavaScript Developer'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex--);
  } else {
    typingText.textContent = currentWord.substring(0, charIndex++);
  }

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {

    speed = 1500;
    isDeleting = true;

  } else if (isDeleting && charIndex === 0) {

    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;

  }

  setTimeout(typeEffect, speed);
}

typeEffect();