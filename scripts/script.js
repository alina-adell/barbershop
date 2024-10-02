'use strict';
const popupTrigger = document.getElementById('popup-trigger');
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.close-popup');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.registration-modal');
const openModalButtons = document.getElementsByClassName('open-modal');
const closeModalBtn = document.querySelector('.close-modal');



$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: true,
        centerMode: true,
        centerPadding: '-20px',
        focusOnSelect: true
    });
});

document.getElementById('burger').onclick = function () {
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'block';
};

document.getElementById('menu__close').onclick = function () {
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'none';
};

popupTrigger.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
}


for (let i = 0; i < openModalButtons.length; i++) {
    openModalButtons[i].addEventListener('click', openModal);
}
// Закрытие модального окна по клику на кнопку "Закрыть"
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';


});

overlay.addEventListener('click', () => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
});





