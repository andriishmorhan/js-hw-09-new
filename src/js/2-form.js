const STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;
const textarea = form.querySelector('textarea');

populateForm();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = { email: '', message: '' };
}

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    formData = JSON.parse(savedData) || {};

    if (formData.email) email.value = formData.email;
    if (formData.message) message.value = formData.message;
  } catch (err) {
    console.error('Failed to parse saved form data:', err);
  }
}
