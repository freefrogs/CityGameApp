document.addEventListener('DOMContentLoaded', function() {
  //form validation
  const button = document.querySelector('.register button');
  const name = document.querySelector('.name');
  const password = document.querySelector('.password');
  const error = document.querySelector('.status');

  button.addEventListener('click', function(e) {
    error.innerHTML = '';
    const nameVal = name.value;
    const passwordVal = password.value;

    if (nameVal.length < 2 || nameVal.length > 60) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Wprowadzona nazwa drużyny lub e-mail są nieprawidłowe';
      error.appendChild(newError);
    }

    if (passwordVal.length < 6 || passwordVal.length > 30) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Hasło powinno mieć od 6 do 30 znaków';
      error.appendChild(newError);
    }
  });
});