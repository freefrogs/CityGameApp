document.addEventListener('DOMContentLoaded', function() {
  //form validation
  const button = document.querySelector('.register button');
  const name = document.querySelector('.name');
  const email = document.querySelector('.email');
  const phone = document.querySelector('.phone');
  const regex = /^[0-9]{9}$/;
  const password = document.querySelector('.password');
  const password2 = document.querySelector('.password2');
  const error = document.querySelector('.status');
  const rodo = document.querySelector('.rodo');

  button.addEventListener('click', function(e) {
    error.innerHTML = '';
    const nameVal = name.value;
    const emailVal = email.value;
    const phoneVal = phone.value;
    const phoneCheck = regex.test(phoneVal);
    const passwordVal = password.value;
    const password2Val = password2.value;
    console.log(phoneCheck);

    if (!rodo.checked) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Aby zarejestrować się w grze należy zapoznać się i zaakceptować regulamin';
      error.appendChild(newError);
    }

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

    if (!(phoneVal.length === 9 && phoneCheck)) {
      e.preventDefault();
      const newError = document.createElement('p');
      newError.innerText = 'Nr telefonu powinien być ciągiem 9 cyfr bez dodatkowych znaków';
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