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
