import '../css/styles.css';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
let formData = populateForm() || {
  email: '',
  message: '',
};
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedData) return;

  for (const key in savedData) {
    if (savedData.hasOwnProperty(key)) {
      form.elements[key].value = savedData[key];
    }
  }
  return savedData;
}
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  saveToLocalStorage();
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
