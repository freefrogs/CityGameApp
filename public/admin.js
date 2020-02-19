document.addEventListener('DOMContentLoaded', function(){
  const button = document.querySelector('.mainButton.email_button');
  const emails = document.querySelector('.emails_string');

  button.addEventListener('click', e => {
    e.preventDefault;
    emails.classList.toggle('emails_visible');
  })
});
