document.addEventListener('DOMContentLoaded', function() {
  //navigation hamburger
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.navigation');

  const changeOverflow = () => {
    nav.classList.toggle('overflow');
  }

  menu.addEventListener('click', changeOverflow);
});