//Building slider(to give some changes for swiper.js)
const sliders = document.querySelectorAll('.swiperplus');
if (sliders) {
   sliders.forEach(slider => {
      if (!slider.classList.contains('swiper-bild')) {
         let sliderItems = slider.children;
         if (sliderItems) {
            for (let i = 0; i < sliderItems.length; i++) {
               sliderItems[i].classList.add('swiper-slide');
            };
         }
         let sliderContent = slider.innerHTML;
         let sliderWrapper = document.createElement('div');
         sliderWrapper.classList.add('swiper-wrapper');
         sliderWrapper.innerHTML = sliderContent;
         slider.innerHTML = '';
         slider.appendChild(sliderWrapper);
         slider.classList.add('swiper-bild');
      }
   });
}

if (document.querySelector('.mainslider')) {
   const mainslider = new Swiper('.mainslider__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,
      pagination: {
         el: '.mainslider__dots',
         clickable: true,
      }
   });
   const mainsliderImages = document.querySelectorAll('.mainslider__image');
   const mainsliderDots = document.querySelectorAll('.mainslider__dots .swiper-pagination-bullet');
   for (let i = 0; i < mainsliderImages.length; i++) {
      let mainsliderImage = mainsliderImages[i].querySelector('img').getAttribute('src');
      mainsliderDots[i].style.backgroundImage = "url('" + mainsliderImage + "')";
   }
}

if (document.querySelector('.products-slider')) {
   const productsSlider = new Swiper('.products-slider__item', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,
      pagination: {
         el: '.products-slider__info',
         type: 'fraction',
      },
      navigation: {
         nextEl: '.products-slider__arrow-next',
         prevEl: '.products-slider__arrow-prev',
      },

   });
}

if (document.querySelector('.brands-slider')) {
   const brandsSlider = new Swiper('.brands-slider__body', {
      observer: true,
      observeParents: true,
      slidesPerView: 5,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,
      loop: true,
      navigation: {
         nextEl: '.brands-slider__arrow-next',
         prevEl: '.brands-slider__arrow-prev',
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
         },
         480: {
            slidesPerView: 2,
         },
         600: {
            slidesPerView: 3,
         },
         768: {
            slidesPerView: 4,
         },
         992: {
            slidesPerView: 5,
         },
      },
   });
}

if (document.querySelector('.images-product')) {
   const imagesSubSlider = new Swiper('.images-product__subslider', {
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 0,
      //autoHeight: true,
      speed: 800
   });

   const imagesMainSlider = new Swiper('.images-product__mainslider', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      thumbs: {
         swiper: imagesSubSlider
      },
      //autoHeight: true,
      speed: 800
   });
}
