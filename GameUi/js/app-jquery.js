$('.menu')
    .on('click', '.menu_item', function() {
        $(this)
        .addClass("active")
        .siblings().removeClass("active");

        $('.information_icons').removeClass("active");
        $(this).find($('.information_icons')).addClass("active");

            if( $(this).hasClass("menu_info") ){
                $(".information").addClass("active_display");
            }else {
                $(".information").removeClass("active_display");
            }
            if( $(this).hasClass("menu_rating") ) {
                $(".ratingInfo").addClass("active_display");
            }else {
                $(".ratingInfo").removeClass("active_display");
            }
            if( $(this).hasClass("menu_buy") ) {
                $(".buy").addClass("active_display");
            }else {
                $(".buy").removeClass("active_display");
            }
        
    })