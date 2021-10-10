//Count checked checkboxes and show for user
const checkboxCategories = document.querySelectorAll('.categories-search__checkbox');
for (let i = 0; i < checkboxCategories.length; i++) {
   let checkboxCategory = checkboxCategories[i];
   checkboxCategory.addEventListener('change', () => {
      checkboxCategory.classList.toggle('active');
      let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox.active');
      if (checkboxActiveCategories.length > 0) {
         searchTitle.classList.add('categories');
         let counter = searchTitle.querySelector('.search-page__counter');
         counter.innerHTML = counter.getAttribute('data-text') + ' ' + checkboxActiveCategories.length;
      } else {
         searchTitle.classList.remove('categories');
      }
   });
}