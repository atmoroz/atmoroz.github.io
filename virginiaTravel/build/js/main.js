document.addEventListener('DOMContentLoaded', load);

function load() {
    /*
        Меню бургер
    */
    document.querySelector('.header_openTabs').addEventListener('click', () => {
        document.querySelector('.header_menu__open').classList.add('_headerMenu');
    });
    document.querySelector('.header_closeTabs').addEventListener('click', () => {
        document.querySelector('.header_menu__open').classList.remove('_headerMenu');
    });

    /*
    Активация slick slider
    */
    $('._sliderActive').slick({
        dots: false,
         infinite: true,
         speed: 500,
         fade: true,
         cssEase: 'linear'
    });

    //по умолчанию подсветка кнопки
    document.querySelector('.slick-next').style.background = "url('../images/button_hover.png')";

    /*
        Собыия click на кнопки
    */
    document.querySelector('.roadmap').addEventListener('click', checked);
    document.querySelector('.slick-prev').addEventListener('click', showSlide);
    document.querySelector('.slick-next').addEventListener('click', showSlide);
}


/*
    В зависимости от выбранного road step запускаается та или инная ф-ция
*/
function checked() {
    const TARGET = event.target;

    switch(true) {
        case TARGET.classList.contains('step_progress__static') : checkedItem();
            return;
        case TARGET.classList.contains('step_progress__reverse'): checkedItemReverse();
            return;
    }
};


function checkedItem() {
    const TARGET = event.target;
    const CLOSEST_STEP_ITEM = TARGET.closest('.step_item');

    //При выборе активной кнопки удаляем класс active
    CLOSEST_STEP_ITEM.classList.contains('_active') ? TARGET.closest('.step_item').classList.remove('_active') : false;
    //При выборе степа удаляем или добавляем класс checked
    CLOSEST_STEP_ITEM.classList.contains('_checked') ? TARGET.closest('.step_item').classList.remove('_checked') :
            CLOSEST_STEP_ITEM.classList.add('_checked');
    // Проверка, что это не крайний элемент
    if(CLOSEST_STEP_ITEM.previousElementSibling == null && !TARGET.closest('.step_item').nextElementSibling.classList.contains('_checked')) {
    
        CLOSEST_STEP_ITEM.nextElementSibling.classList.add('_active');
        return;
    }

    if(CLOSEST_STEP_ITEM.classList.contains('_checked')) {

        // При нажатии на степ задаем предыдущему степу состояние или active || checked
        CLOSEST_STEP_ITEM.previousElementSibling == null ? false : 
            CLOSEST_STEP_ITEM.previousElementSibling.classList.contains('_active') ? CLOSEST_STEP_ITEM.previousElementSibling.classList.remove('_active') : false;
            
        CLOSEST_STEP_ITEM.previousElementSibling.classList.contains('_checked') ? false : CLOSEST_STEP_ITEM.previousElementSibling.classList.add('_checked'); // проверяет существует ли предыдущий элемент


        CLOSEST_STEP_ITEM.nextElementSibling.classList.contains('_checked') ? false :
            CLOSEST_STEP_ITEM.nextElementSibling.classList.add('_active');
    } else {
        CLOSEST_STEP_ITEM.nextElementSibling.classList.remove('_active');
    }
}

function checkedItemReverse() {
    const TARGET = event.target;
    const CLOSEST_STEP_ITEM_REVERSE = TARGET.closest('.step_item__reverse');

    CLOSEST_STEP_ITEM_REVERSE.classList.contains('_checked') ? TARGET.closest('.step_item__reverse').classList.remove('_checked') :
        CLOSEST_STEP_ITEM_REVERSE.classList.add('_checked') ;

    CLOSEST_STEP_ITEM_REVERSE.classList.contains('_active') ? TARGET.closest('.step_item__reverse').classList.remove('_active') : false;


    if(CLOSEST_STEP_ITEM_REVERSE.previousElementSibling == null) return;

    CLOSEST_STEP_ITEM_REVERSE.previousElementSibling.classList.contains('_active') ? 
        CLOSEST_STEP_ITEM_REVERSE.previousElementSibling.classList.remove('_active') : false;

    if(CLOSEST_STEP_ITEM_REVERSE.classList.contains('_checked')) {

        CLOSEST_STEP_ITEM_REVERSE.previousElementSibling == null ? false :
        CLOSEST_STEP_ITEM_REVERSE.previousElementSibling.classList.add('_checked');

        CLOSEST_STEP_ITEM_REVERSE.nextElementSibling.classList.contains('_checked') ? false : 
            CLOSEST_STEP_ITEM_REVERSE.nextElementSibling.classList.add('_active');
    } else {
        CLOSEST_STEP_ITEM_REVERSE.nextElementSibling.classList.remove('_active');
    }

};

function showSlide() {
    /*
        Инициализация переменных
    */
    const TARGET = event.target;
    let activeSlide = document.querySelector('.slick-active');
    let allSlides = document.querySelectorAll('.slider_slider').length;
    let indexCurrent = activeSlide.getAttribute('data-slick-index');

    document.querySelector('.slider_count__active').innerText = +indexCurrent + 1; //Добавляем в ДОМ элемент номер текущего слайда
    document.querySelector('.slider_count__all').innerText = allSlides; // выводим в ДОМ элемент колличество слайдеров

    /*
        Задаем состояние кнопкам в зависимости от номера текущего слайда
    */
    if(indexCurrent == '0') {
        document.querySelector('.slick-next').style.background = "url('../images/button_hover.png')";
    }else {
        document.querySelector('.slick-next').style.background = "url('../images/button_static.png')";
    }
    if(+indexCurrent == +allSlides-1) {
        document.querySelector('.slick-prev').style.background = "url('../images/button_hover.png')";
    } else {
        document.querySelector('.slick-prev').style.background = "url('../images/button_static.png')";
    }
};
