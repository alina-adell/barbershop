'use strict';
const popupTrigger = document.getElementById('popup-trigger');
const popup = document.getElementById('popup');
const popup2 = document.getElementById('popup2');
const closePopup = document.querySelector('.close-popup');
const openModalButtons = document.querySelectorAll('.design .open-modal, .main__btn');
const formRequest = document.getElementById('popuprequest');
const closeFormBtn = document.querySelector('.close-form');
const container = document.querySelector('.container');
let loader = $('.loader');

$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
        speed: 400,
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
                breakpoint: 705,
                settings: {
                    slidesToShow: 1, //
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

function validateInput(input) {
    const hasValue = input.value && input.value !== ''; // Проверяем наличие значения

    input.classList.toggle('error', !hasValue); // Добавляем или удаляем класс 'error' в зависимости от hasValue

    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        input.parentNode.removeChild(errorMessage);
    }

    if (!hasValue) {
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        errorMessage.textContent = 'Поле обязательно для заполнения';
        input.parentNode.appendChild(errorMessage);
        return false;
    }
    return true;
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let isValid = true;
    const data = {};

    inputGroups.forEach((inputGroup) => {
        const input = inputGroup.querySelector('input, select'); // Валидация для всех типов input
        isValid = validateInput(input) && isValid;
        if (input.name) {
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
                        popup2.style.display = 'block';
                        closePopup.addEventListener('click', () => {
                            popup2.style.display = 'none';
                        });
                    } else {
                        alert('Возникла ошибка при оформлении заявки, позвоните нам или повторите позже.');
                    }
});
    }
})

closeFormButton.addEventListener('click', () => {
    popupRequest.style.display = 'none';
});

function populateSelectWithServices() {
    const servicesList = document.querySelectorAll('.list__price_info');
    const selectElement = document.getElementById('services');

    servicesList.forEach(service => {
        const serviceName = service.textContent.trim(); // Извлекаем текст услуги
        const option = document.createElement('option');
        option.value = serviceName;
        option.textContent = serviceName;
        selectElement.appendChild(option);
    });
}
// Вызываем функцию при загрузке страницы или после загрузки данных
populateSelectWithServices();

function populateMastersSelect() {
    const mastersList = document.querySelectorAll('.slide .info p');
    const selectElement = document.getElementById('masters');

    mastersList.forEach(master => {
        const masterName = master.textContent.trim();
        const option = document.createElement('option');
        option.value = masterName;
        option.textContent = masterName;
        selectElement.appendChild(option);
    });
}

// Вызываем функцию при загрузке страницы или после загрузки данных
populateMastersSelect();








