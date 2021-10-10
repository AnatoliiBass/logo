const spoller = document.querySelectorAll('.spoller');
spoller.forEach(item => {
   item.addEventListener('click', () => {
      item.classList.toggle('active');
      slideToggle(item.nextElementSibling);
   });
});