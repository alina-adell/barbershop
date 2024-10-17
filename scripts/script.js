'use strict';
const popupTrigger = document.getElementById('popup-trigger');
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.close-popup');
const openModalButtons = document.querySelectorAll('.design .open-modal');
const formRequest = document.getElementById('popuprequest');
const closeFormBtn = document.querySelector('.close-form');
const container = document.querySelector('.container');
let loader = $('.loader');




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
        focusOnSelect: true,
        appendArrows: $('.nav-masters'),
        appendDots: $('.nav-masters'),
        responsive: [
            {
                breakpoint: 426,
                settings: {
                    slidesToShow: 1, // При ширине экрана меньше 425px отображаем 2 слайда
                    slidesToScroll: 1
                }
            }
        ],
        customPaging: function(index) {
            const totalSlides = $('.slider .slick-slide').length;
            const visibleDots = 3;
            const dotIndex = index % visibleDots;
            const dotClass = dotIndex === 0 ? 'slick-active' : '';
            return '<button type="button" role="tab" id="slick-slide-control' + dotIndex + '" aria-controls="slick-slide' + index + '" aria-label="' + (dotIndex + 1) + ' of ' + visibleDots + '" tabindex="-1" class="' + dotClass + '">' + (dotIndex + 1) + '</button>';
        }
    });
    new WOW().init();
});

document.getElementById('burger').onclick = function () {
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'block';
};

document.getElementById('menu__close').onclick = function () {
    const menuModal = document.getElementById('menuModal');
    menuModal.style.display = 'none';
};

popup.style.width = `${container.offsetWidth}px`;
popupTrigger.addEventListener('click', () => {
    popup.style.display = 'block';
});
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        formRequest.style.display = 'grid';
    });
});
formRequest.style.width = `${container.offsetWidth}px`;

closeFormBtn.addEventListener('click', () => {
    formRequest.style.display = 'none';
});

const popupRequest = document.getElementById('popuprequest');
const formGrid = popupRequest.querySelector('.form-grid');
const inputGroups = formGrid.querySelectorAll('.input-group');
const submitButton = popupRequest.querySelector('.submit');
const closeFormButton = popupRequest.querySelector('.close-form');
const successMessage = popupRequest.querySelector('.success-message');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let isValid = true;
    let data = {};


    inputGroups.forEach((inputGroup) => {
        const input = inputGroup.querySelector('input');
        const errorMessage = inputGroup.querySelector('.error-message');


        if (!input.value) {
            isValid = false;
            input.classList.add('error');
            if (!errorMessage) {
                const errorMessageElement = document.createElement('div');
                errorMessageElement.classList.add('error-message');
                errorMessageElement.textContent = 'Поле обязательно для заполнения';
                inputGroup.appendChild(errorMessageElement);
            }
        } else {
            input.classList.remove('error'); // Remove the error class from the input
            if (errorMessage) {
                inputGroup.removeChild(errorMessage);
            }
        }
        if (isValid) {
            data[input.name] = input.value;
        }
    });

    if (isValid) {
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: data
            })
                .done(function (msg) {
                    loader.hide();
                    console.log(msg);
                    if (msg.success === 1) {
                        formRequest.style.display = 'none';
                        const successMessage = document.createElement('div');
                        successMessage.classList.add('success-message');
                        successMessage.textContent = 'Спасибо!';
                        const container = document.querySelector('.masters .container');
                        container.appendChild(successMessage);
                    } else {
                        alert('Возникла ошибка при оформлении заявки, позвоните нам или повторите позже.');
                    }
});
    }
})

closeFormButton.addEventListener('click', () => {
    popupRequest.style.display = 'none';
});








