const handlesSlider = document.querySelector('.price-filter__slider');

noUiSlider.create(handlesSlider, {
   start: [0, 100000],
   connect: true,
   tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
   range: {
      'min': [0],
      'max': [200000]
   }
});
let priceStart = document.getElementById('min');
let priceEnd = document.getElementById('max');

priceStart.addEventListener('change', setPriceValue);
priceEnd.addEventListener('change', setPriceValue);
function setPriceValue() {
   let priceStartValue;
   let priceEndValue;
   if (priceStart.value !== '') { priceStartValue = priceStart.value; }
   if (priceEnd.value !== '') { priceEndValue = priceEnd.value; }
   handlesSlider.noUiSlider.set([priceStartValue, priceEndValue]);
}

