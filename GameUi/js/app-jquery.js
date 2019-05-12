$('.menu')
    .on('click', '.menu_item', function() {
        $(this)
        .addClass("active")
        .siblings().removeClass("active");

        let tabs = ($(this).attr("id"));
        //активируем нужный нам таб (привязываемся к id) после удаляем соседей
        $('.'+ tabs)
        .addClass("active_display")
        .siblings()
        .removeClass("active_display");
    })