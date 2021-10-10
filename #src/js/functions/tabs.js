if (document.querySelector('.tabs')) {
   const tabsItems = document.querySelectorAll('.tabs-item');
   const tabsBlocks = document.querySelectorAll('.tabs-block');
   for (let i = 0; i < tabsItems.length; i++) {
      tabsItems[i].addEventListener('click', () => {
         for (let j = 0; j < tabsItems.length; j++) {
            tabsItems[j].classList.remove('active')
            tabsBlocks[j].classList.remove('active')
         }
         tabsItems[i].classList.add('active')
         tabsBlocks[i].classList.add('active')
      })
   }
}
