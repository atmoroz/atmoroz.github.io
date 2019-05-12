const INFORMATIONICONS = $('.information_icons');
$('.menu')
    .on('click', '.menu_item', function() {
        $(this)
        .addClass("active")
        .siblings().removeClass("active");

        INFORMATIONICONS.removeClass("active");
        $(this).find(INFORMATIONICONS).addClass("active");

        let tabs = ($(this).attr("id")).replace('#','.');
        //активируем нужный нам таб (привязываемся к id) после удаляем соседей
        $(tabs)
        .addClass("active_display")
        .siblings()
        .removeClass("active_display");
    })