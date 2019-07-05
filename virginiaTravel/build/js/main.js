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
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

    //по умолчанию подсветка кнопки
    document.querySelector('.slick-next').style.background = "url('../images/button_hover.png')";

    /*
        Обратный отсчет даты и времени
    */
    timer();
    /*
        Собыия click на кнопки
    */
    document.querySelector('.roadmap').addEventListener('click', checked);
    document.querySelector('.slick-prev').addEventListener('click', showSlide);
    document.querySelector('.slick-next').addEventListener('click', showSlide);
};

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

    let prevSibling = getPrevSiblings(CLOSEST_STEP_ITEM);
    let nextSibling = getNextSiblings(CLOSEST_STEP_ITEM);

    prevSibling.forEach(item => { item.classList.add('_checked') });
    prevSibling.forEach(item => { item.classList.remove('_active') });

    nextSibling.forEach(item => { item.classList.remove('_checked') });
    nextSibling.forEach(item => { item.classList.remove('_active') });

    CLOSEST_STEP_ITEM.classList.contains('_active') ? CLOSEST_STEP_ITEM.classList.remove('_active') : false;
    CLOSEST_STEP_ITEM.classList.contains('_checked') ? false : CLOSEST_STEP_ITEM.classList.add('_checked')
    CLOSEST_STEP_ITEM.nextElementSibling.classList.add('_active');
}

function checkedItemReverse() {
    const TARGET = event.target;
    const CLOSEST_STEP_ITEM_REVERSE = TARGET.closest('.step_item__reverse');

    let prevSibling = getPrevSiblings(CLOSEST_STEP_ITEM_REVERSE);
    let nextSibling = getNextSiblings(CLOSEST_STEP_ITEM_REVERSE);
    
    prevSibling.forEach(item => { item.classList.add('_checked') });
    prevSibling.forEach(item => { item.classList.remove('_active') });

    nextSibling.forEach(item => { item.classList.remove('_checked') });
    nextSibling.forEach(item => { item.classList.remove('_active') });

    CLOSEST_STEP_ITEM_REVERSE.classList.contains('_active') ? CLOSEST_STEP_ITEM_REVERSE.classList.remove('_active') : false;
    CLOSEST_STEP_ITEM_REVERSE.classList.contains('_checked') ? false : CLOSEST_STEP_ITEM_REVERSE.classList.add('_checked');
    CLOSEST_STEP_ITEM_REVERSE.nextElementSibling.classList.add('_active');
};

function getPrevSiblings(elem) {
    var siblings = [];
    var sibling = elem;
    while (sibling.previousSibling) {
        sibling = sibling.previousSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    return siblings;
};

function getNextSiblings(elem) {
    var siblings = [];
    var sibling = elem;

    while (sibling.nextSibling) {
        sibling = sibling.nextSibling;
        sibling.nodeType == 1 && siblings.push(sibling);
    }

    return siblings;
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

function timer() {
    let d = document.querySelector('.timer_time__day');
    let h = document.querySelector('.timer_time__hours');
    let m = document.querySelector('.timer_time__minutes');
    let s = document.querySelector('.timer_time__seconds');
    var nowDate = new Date();
    var achiveDate = new Date(2019,5,22,7,0,0); //Задаем дату, к которой будет осуществляться обратный отсчет
    //console.log((achiveDate - nowDate));
    var result = (achiveDate - nowDate)+1000;
    if (result < 0) {
        d.innerText = '--';
        h.innerText = '--';
        m.innerText = '--';
        s.innerText = '--';
        return undefined;
    }
    var seconds = Math.floor((result/1000)%60);
    var minutes = Math.floor((result/1000/60)%60);
    var hours = Math.floor((result/1000/60/60)%24);
    var days = Math.floor(result/1000/60/60/24);
    if (seconds < 10) seconds = '0' + seconds;
    if (minutes < 10) minutes = '0' + minutes;
    if (hours < 10) hours = '0' + hours;
    d.innerText = days;
    h.innerText = hours;
    m.innerText = minutes;
    s.innerText = seconds;
    setTimeout(timer, 1000);
}
