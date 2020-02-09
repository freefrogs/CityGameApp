document.addEventListener('DOMContentLoaded', function() {
  //form validation
  const button = document.querySelector('.register button');
  const name = document.querySelector('.name');
  const email = document.querySelector('.email');
  const password = document.querySelector('.password');
  const password2 = document.querySelector('.password2');
  const error = document.querySelector('.status');

  button.addEventListener('click', function(e) {
    error.innerHTML = '';
    const nameVal = name.value;
    const emailVal = email.value;
    const passwordVal = password.value;
    const password2Val = password2.value;

    if (nameVal.length < 2 || nameVal.length > 20) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Nazwa drużyny powinna mieć od 2 do 20 znaków';
      error.appendChild(newError);
    }

    if (!(emailVal.length >= 6 && emailVal.length <= 60 && emailVal.includes('@') && emailVal.includes('.'))) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Niepoprawny e-mail';
      error.appendChild(newError);
    }

    if (passwordVal.length < 6 || passwordVal.length > 30) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Hasło powinno mieć od 6 do 30 znaków';
      error.appendChild(newError);
    }

    if (passwordVal != password2Val) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Pola hasło i powtórz hasło mają różne wartości';
      error.appendChild(newError);
    }
  });
});