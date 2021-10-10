const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows());
   }
};
//Dinamic adaptive
class DynamicAdapt {
   constructor(type) {
      this.type = type;
   }

   init() {
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = [...document.querySelectorAll('[data-da]')];

      // наполнение оbjects объeктами
      this.nodes.forEach((node) => {
         const data = node.dataset.da.trim();
         const dataArray = data.split(',');
         const оbject = {};
         оbject.element = node;
         оbject.parent = node.parentNode;
         оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
         оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
         оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
         оbject.index = this.indexInParent(оbject.parent, оbject.element);
         this.оbjects.push(оbject);
      });

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = this.оbjects
         .map(({
            breakpoint
         }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
         .filter((item, index, self) => self.indexOf(item) === index);

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaQueries.forEach((media) => {
         const mediaSplit = media.split(',');
         const matchMedia = window.matchMedia(mediaSplit[0]);
         const mediaBreakpoint = mediaSplit[1];

         // массив объектов с подходящим брейкпоинтом
         const оbjectsFilter = this.оbjects.filter(
            ({
               breakpoint
            }) => breakpoint === mediaBreakpoint
         );
         matchMedia.addEventListener('change', () => {
            this.mediaHandler(matchMedia, оbjectsFilter);
         });
         this.mediaHandler(matchMedia, оbjectsFilter);
      });
   }

   // Основная функция
   mediaHandler(matchMedia, оbjects) {
      if (matchMedia.matches) {
         оbjects.forEach((оbject) => {
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
         });
      } else {
         оbjects.forEach(
            ({ parent, element, index }) => {
               if (element.classList.contains(this.daClassname)) {
                  this.moveBack(parent, element, index);
               }
            }
         );
      }
   }

   // Функция перемещения
   moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
         destination.append(element);
         return;
      }
      if (place === 'first') {
         destination.prepend(element);
         return;
      }
      destination.children[place].before(element);
   }

   // Функция возврата
   moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
         parent.children[index].before(element);
      } else {
         parent.append(element);
      }
   }

   // Функция получения индекса внутри родителя
   indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
   }

   // Функция сортировки массива по breakpoint и place 
   // по возрастанию для this.type = min
   // по убыванию для this.type = max
   arraySort(arr) {
      if (this.type === 'min') {
         arr.sort((a, b) => {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }
               if (a.place === 'first' || b.place === 'last') {
                  return -1;
               }
               if (a.place === 'last' || b.place === 'first') {
                  return 1;
               }
               return a.place - b.place;
            }
            return a.breakpoint - b.breakpoint;
         });
      } else {
         arr.sort((a, b) => {
            if (a.breakpoint === b.breakpoint) {
               if (a.place === b.place) {
                  return 0;
               }
               if (a.place === 'first' || b.place === 'last') {
                  return 1;
               }
               if (a.place === 'last' || b.place === 'first') {
                  return -1;
               }
               return b.place - a.place;
            }
            return b.breakpoint - a.breakpoint;
         });
         return;
      }
   }
}
const da = new DynamicAdapt("max");
da.init();;
//change type yours images to webp
function testWebP(callback) {
   let webP = new Image(); webP.onload = webP.onerror = function () { callback(webP.height == 2); }; webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";

}

testWebP(function (support) {
   if (support == true) { document.querySelector('body').classList.add('webp'); } else { document.querySelector('body').classList.add('no-webp'); }

});
;
//Slide Toggle
const slideUp = (target, duration = 500) => {
   target.style.transitionProperty = 'height, margin, padding';
   target.style.transitionDuration = duration + 'ms';
   target.style.height = target.offsetHeight + 'px';
   target.offsetHeight;
   target.style.overflow = 'hidden';
   target.style.height = 0;
   target.style.paddingTop = 0;
   target.style.paddingBottom = 0;
   target.style.marginTop = 0;
   target.style.marginBottom = 0;
   window.setTimeout(() => {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('slide');
   }, duration);
}
const slideDown = (target, duration = 500) => {
   target.style.removeProperty('display');
   let display = window.getComputedStyle(target).display;
   if (display === 'none') display = 'block';
   target.style.display = display;
   let height = target.offsetHeight;
   target.style.overflow = 'hidden';
   target.style.height = 0;
   target.style.paddingTop = 0;
   target.style.paddingBottom = 0;
   target.style.marginTop = 0;
   target.style.marginBottom = 0;
   target.offsetHeight;
   target.style.transitionProperty = 'height, margin, padding';
   target.style.transitionDuration = duration + 'ms';
   target.style.height = height + 'px';
   target.style.removeProperty('padding-top');
   target.style.removeProperty('padding-bottom');
   target.style.removeProperty('margin-top');
   target.style.removeProperty('margin-bottom');
   window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('slide');
   }, duration);
}
const slideToggle = (target, duration = 500) => {
   if (!target.classList.contains('slide')) {
      target.classList.add('slide');
      if (window.getComputedStyle(target).display === 'none') {
         return slideDown(target, duration);
      } else {
         return slideUp(target, duration);
      }
   }
};
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
;
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
};
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
;
//Function for change image from img to background
function ibg() {
   const ibg = document.querySelectorAll(".ibg");
   for (let i = 0; i < ibg.length; i++) {
      if (ibg[i].querySelector('img')) {
         ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
      }
   }
}
ibg();;
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
;
const deliveryServices = document.querySelectorAll('.delivery-footer__item img');
const deliveryServicesExtra = document.querySelectorAll('.delivery-footer__item source');
for (let i = 0; i < deliveryServices.length; i++) {
   let basicSrc = deliveryServices[i].attributes.src.nodeValue.split('.');
   let hoverSrc = [basicSrc[0] + '_h', basicSrc[1]];
   let basicSrcExtra = deliveryServicesExtra[i].attributes.srcset.nodeValue.split('.');
   let hoverSrcExtra = [basicSrcExtra[0] + '_h', basicSrcExtra[1]];
   deliveryServices[i].addEventListener('mouseenter', () => {
      if (i === 0) {
         deliveryServices[i].parentElement.parentElement.style.backgroundColor = '#333333';
      }
      deliveryServices[i].attributes.src.nodeValue = hoverSrc.join('.');
      deliveryServicesExtra[i].attributes.srcset.nodeValue = hoverSrcExtra.join('.');
   });
   deliveryServices[i].addEventListener('mouseleave', () => {
      if (i === 0) {
         deliveryServices[i].parentElement.parentElement.style.backgroundColor = '#ffffff';
      }
      deliveryServices[i].attributes.src.nodeValue = basicSrc.join('.');
      deliveryServicesExtra[i].attributes.srcset.nodeValue = basicSrcExtra.join('.');
   });
};
;
const spoller = document.querySelectorAll('.spoller');
spoller.forEach(item => {
   item.addEventListener('click', () => {
      item.classList.toggle('active');
      slideToggle(item.nextElementSibling);
   });
});;
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
};
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
;
