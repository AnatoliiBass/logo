//Apear sub-menu
if (isMobile.any()) {
   const menuParents = document.querySelectorAll('.menu-page__link-parent');
   const filterTitle = document.querySelector('.filter__title');
   if (filterTitle) {
      filterTitle.addEventListener('click', () => {
         slideToggle(filterTitle.nextElementSibling);
      });
   }

   for (let i = 0; i < menuParents.length; i++) {
      let menuParent = menuParents[i];
      menuParent.addEventListener('click', (e) => {
         menuParent.parentNode.classList.toggle('active');
         e.preventDefault();
      });
   }
} else {
   const menuParents = document.querySelectorAll('.menu-page__link-parent');
   const pageSearch = document.querySelector('.page__search')
   menuParents.forEach(item => {
      item.addEventListener('mouseenter', () => {
         item.parentNode.classList.add('active');
         slideUp(categoriesSearch);
         searchTitle.classList.remove('active');
         pageSearch.style.zIndex = 3;
      });
      item.parentNode.addEventListener('mouseleave', () => {
         item.parentNode.classList.remove('active');
         pageSearch.style.zIndex = 4;
      });
   });
}
