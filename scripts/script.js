
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
        centerPadding: '50px',
        focusOnSelect: true
    });
});