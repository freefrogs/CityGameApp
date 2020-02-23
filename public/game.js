document.addEventListener('DOMContentLoaded', function() {
  const transform = document.querySelector('.liquid').dataset.transform;
  const translate = `${ -55 - transform }%`;

  document.documentElement.style.setProperty('--transform-anim', `${translate}`);
});
