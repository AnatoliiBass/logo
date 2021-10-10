//Burgers and drop-down menu
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
   iconMenu.addEventListener("click", (e) => {
      iconMenu.classList.toggle('active');
      menuBody.classList.toggle('active');
   });
}
const iconAside = document.querySelector('.menu-page__burger');
const menuPageBody = document.querySelector('.menu-page__body');
const searchTitle = document.querySelector('.search-page__title');
const categoriesSearch = document.querySelector('.categories-search');
if (iconAside) {
   iconAside.addEventListener("click", (e) => {
      iconAside.classList.toggle('active');
      slideToggle(menuPageBody);
   });
}
if (searchTitle && categoriesSearch) {
   searchTitle.addEventListener('click', (e) => {
      searchTitle.classList.toggle('active');
      slideToggle(categoriesSearch);
   });
}
