console.log("JS Loaded");

const hamburger = document.querySelector('.hamburger-menu');
const navElement = document.querySelector('.nav-element');

const form = document.querySelector('.contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

hamburger.addEventListener('click', function () {
  navElement.classList.toggle('active');
  hamburger.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-element ul li a');

navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    navElement.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

function showError(input, message) {
  const formGroup = input.closest('.form-group');
  let errorMsg = formGroup.querySelector('.error-message');

  input.classList.add('input-error');

  if (!errorMsg) {
    errorMsg = document.createElement('span');
    errorMsg.classList.add('error-message');
    formGroup.appendChild(errorMsg);
  }

  errorMsg.textContent = message;
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  const errorMsg = formGroup.querySelector('.error-message');

  input.classList.remove('input-error');

  if (errorMsg) {
    errorMsg.remove();
  }
}

function showSuccess() {
  let successMsg = form.querySelector('.success-message');

  if (!successMsg) {
    successMsg = document.createElement('p');
    successMsg.classList.add('success-message');
    successMsg.textContent = 'Message sent successfully!';
    form.prepend(successMsg);
  }

  setTimeout(function () {
    successMsg.remove();
  }, 3000);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (!emailInput.checkValidity()) {
    showError(emailInput, 'Please enter a valid email');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, 'Message must be at least 10 characters');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  if (isValid) {
    showSuccess();
    form.reset();
  }
});