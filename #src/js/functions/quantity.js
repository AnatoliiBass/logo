const quantityBtns = document.querySelectorAll('.quantity__button');
if (quantityBtns.length > 0) {
   for (let index = 0; index < quantityBtns.length; index++) {
      const quantityBtn = quantityBtns[index];
      quantityBtn.addEventListener('click', () => {
         let value = parseInt(quantityBtn.closest('.quantity').querySelector('input').value);
         if (quantityBtn.classList.contains('quantity__button-plus')) {
            value = value + 1;
         } else {
            value = value - 1;
            if (value < 1) {
               value = 1;
            }
         }
         quantityBtn.closest('.quantity').querySelector('input').value = value;
      })
   }
}