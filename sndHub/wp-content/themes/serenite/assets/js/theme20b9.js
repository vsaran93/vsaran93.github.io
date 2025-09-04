;(function ($) {
    "use strict";
    var scroll_top;
    var window_height;
    var window_width;
    var scroll_status = '';
    var lastScrollTop = 0;
   
    $( document ).ready( function() {
        window_width = $(window).outerWidth();
        serenite_wow_init();
        serenite_nice_select();

        serenite_header_sticky();
        serenite_open_menu_toggle();

        serenite_mega_menu_style();
        serenite_panel_mobile_menu();
        serenite_panel_cart_toggle();
        serenite_panel_anchor_toggle();
        serenite_document_click();
         
        serenite_scroll_to_top();
        serenite_footer_fixed();
         
        serenite_shop_view_layout();
        serenite_wc_single_product_gallery();
        serenite_quantity_plus_minus();
        serenite_quantity_plus_minus_action();
        serenite_product_single_variations_att();
        serenite_table_cart_content();
        serenite_table_move_column('.woocommerce-cart-form__contents', '.woocommerce-cart-form__cart-item' ,0, 5, '', '.product-subtotal', '');
         
 
    });
     
    $(window).on('load', function () {
        if($(document).find('.pxl-loader').length > 0){
            $(".pxl-loader").fadeOut("slow");
        }
        
    });

    $(window).on('resize', function () {
        window_width = $(window).outerWidth();
        serenite_mega_menu_style();
        serenite_footer_fixed();
    });

    $(window).on('scroll', function () {
        scroll_top = $(window).scrollTop();
        window_height = $(window).height();
        window_width = $(window).outerWidth();
        if (scroll_top < lastScrollTop) {
            scroll_status = 'up';
        } else {
            scroll_status = 'down';
        }
        lastScrollTop = scroll_top;
 
        serenite_header_sticky();
        serenite_scroll_to_top();
    });
 
    jQuery( document ).on( 'updated_wc_div', function() {
        serenite_quantity_plus_minus();
        serenite_table_cart_content();
        serenite_table_move_column('.woocommerce-cart-form__contents', '.woocommerce-cart-form__cart-item' ,0, 5, '', '.product-subtotal', '');
    } );
    
    function serenite_wow_init() {
        var wow = new WOW(
            {
                boxClass:     'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset:       0,          // distance to the element when triggering the animation (default is 0)
                mobile:       true,       // trigger animations on mobile devices (default is true)
                live:         true,       // act on asynchronously loaded content (default is true)
                callback:     function(box) {
                    // the callback is fired every time an animation is started
                    // the argument that is passed in is the DOM node being animated
                },
                scrollContainer: null,    // optional scroll container selector, otherwise use window,
                resetAnimation: true,     // reset animation on end (default is true)
            }
        );
        wow.init();
    }

    function serenite_nice_select(){
        if($('body').hasClass('theme-core')){
            $('select:not([id*="ui-id-"])').each(function () {
                $(this).niceSelect();
            });

            setTimeout(function(){
                $('.nice-select').on('click', function () {
                    $(this).find('.list').toggleClass('open');
                });
            }, 300);
        }
    }

    function serenite_open_menu_toggle(){
        'use strict';
        $('.pxl-primary-menu > li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.pxl-mobile-menu li.menu-item-has-children').append('<span class="main-menu-toggle"></span>');
        $('.main-menu-toggle').on('click', function () {
            $(this).toggleClass('open');
            $(this).parent().find('> .sub-menu').toggleClass('submenu-open');
            $(this).parent().find('> .sub-menu').slideToggle();
        });
    } 

    function serenite_mega_menu_style(){
        if($(document).find('.pxl-mega-menu').length > 0){
            if($(window).outerWidth() < 1200 ){
                $('.pxl-mega-menu').closest("li.pxl-megamenu").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-widget").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-container").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-widget-wrap").css('position', 'relative');    
                $('.pxl-mega-menu').closest(".elementor-column").css('position', 'relative');
            }else{
                $('.pxl-mega-menu').closest("li.pxl-megamenu").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-widget").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-container").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-widget-wrap").css('position', 'static');    
                $('.pxl-mega-menu').closest(".elementor-column").css('position', 'static');
            }
        }
    }
    /* Header Sticky */
    function serenite_header_sticky() {
        'use strict';
        if($(document).find('.pxl-header-sticky').length > 0 && window_width >= 1200){
            var header_height = $('.pxl-header-desktop').outerHeight();
            var header_transparent_height = $('.pxl-header-transparent').outerHeight();
            var offset_top_nimation = (header_height + header_transparent_height);
             
             
            if ( scroll_status == 'down' && scroll_top > offset_top_nimation) {
                $(document).find('.pxl-header-sticky').addClass('h-fixed');
            }else{
                $(document).find('.pxl-header-sticky').removeClass('h-fixed');
            }
        } 
        if($(document).find('.pxl-header-main-sticky').length > 0 && window_width >= 1200){
            var header_height = $('.pxl-header-desktop').outerHeight();
            var main_sticky_height = $('.pxl-header-main-sticky').outerHeight();    
            if (scroll_status == 'down' && scroll_top > (header_height + main_sticky_height)) {
                $(document).find('.pxl-header-main-sticky').addClass('h-fixed');
            }else{
                $(document).find('.pxl-header-main-sticky').removeClass('h-fixed');
            }
        } 
        if ( $(document).find('.pxl-header-mobile-sticky').length > 0 && window_width < 1200  ) {
            var offset_top = $('.pxl-header-mobile').outerHeight();
            var offset_top = ($('.pxl-header-mobile').outerHeight() + $('.pxl-header-mobile-transparent').outerHeight() ); 
            if (scroll_status == 'down' && scroll_top > offset_top) {
                $(document).find('.pxl-header-mobile-sticky').addClass('mh-fixed');
            }else{
                $(document).find('.pxl-header-mobile-sticky').removeClass('mh-fixed');
            }
        }
        if ( $(document).find('.pxl-header-mobile-main-sticky').length > 0 && window_width < 1200  ) {
            var offset_top = $('.pxl-header-mobile').outerHeight();
            var mobile_main_sticky_height = $('.pxl-header-mobile-main-sticky').outerHeight(); 
            if (scroll_status == 'down' && scroll_top > (offset_top + mobile_main_sticky_height)) {
                $(document).find('.pxl-header-mobile-main-sticky').addClass('mh-fixed');
            }else{
                $(document).find('.pxl-header-mobile-main-sticky').removeClass('mh-fixed');
            }
        }
       
    }

    function serenite_panel_mobile_menu(){
        'use strict';
        $(document).on('click','.btn-nav-mobile',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
        });
    }
    function serenite_panel_cart_toggle(){
        'use strict';
        $(document).on('click','.pxl-cart-toggle',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
        });
    }
    function serenite_panel_anchor_toggle(){
        'use strict';
        $(document).on('click','.pxl-anchor.side-panel',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-target');
            $(this).toggleClass('cliked');
            $(target).toggleClass('open');
            $('body').toggleClass('side-panel-open');
 
            var attr = $(this).attr('data-form-type');
            if (typeof attr !== 'undefined' && attr == 'login') {
                $(target).find('.pxl-register-form').removeClass('active');
                $(target).find('.pxl-login-form').addClass('active');
            }
            if (typeof attr !== 'undefined' && attr == 'reg') {
                $(target).find('.pxl-login-form').removeClass('active');
                $(target).find('.pxl-register-form').addClass('active');
            }
              
        });
    }

    function serenite_document_click(){
        $(document).on('click',function (e) {
            var target = $(e.target);
            var check = '.btn-nav-mobile';
            
            if (!(target.is(check)) && target.closest('.pxl-hidden-template').length <= 0 && $('body').hasClass('side-panel-open')) { 
                $('.btn-nav-mobile').removeClass('cliked');
              
                $('.pxl-hidden-template').removeClass('open');
                $('body').removeClass('side-panel-open');
            }
        });
        $(document).on('click','.pxl-close',function(e){
            e.preventDefault();
            e.stopPropagation();
            $(this).closest('.pxl-hidden-template').toggleClass('open');
            $('.btn-nav-mobile').removeClass('cliked');
           
            $('body').toggleClass('side-panel-open');
        });
        
        $('.pxl-scroll-top').click(function(e) {
            e.preventDefault();
            e.stopPropagation();
            var _target = $(this).attr('href');
            $('html, body').stop().animate({ scrollTop: $(_target).offset().top }, 1000);   
        });
        
    }


    /* Scroll To Top */
    function serenite_scroll_to_top() {
        if (scroll_top < window_height) {
            $('.pxl-scroll-top').addClass('off').removeClass('on');
        }
        if (scroll_top > window_height) {
            $('.pxl-scroll-top').addClass('on').removeClass('off');
        }
    }
    function serenite_footer_fixed() {
        if($('.footer-fixed').length <= 0) return;
        setTimeout(function(){
            var h_footer = $('.pxl-footer-fixed').outerHeight() - 1;
            $('.footer-fixed .pxl-main').css('margin-bottom', h_footer + 'px');
        }, 600);
    }
    

    function serenite_shop_view_layout(){
        
        $(document).on('click','.pxl-view-layout .view-icon a', function(e){
            e.preventDefault();
            if(!$(this).parent('li').hasClass('active')){
                $('.pxl-view-layout .view-icon').removeClass('active');
                $(this).parent('li').addClass('active');
                $(this).parents('.pxl-content-area').find('ul.products').removeAttr('class').addClass($(this).attr('data-cls'));
            }
        });
    }

    function serenite_wc_single_product_gallery(){
        'use strict';
        if(typeof $.flexslider != 'undefined'){
            $('.wc-gallery-sync').each(function() {
                var itemW      = parseInt($(this).attr('data-thumb-w')),
                    itemH      = parseInt($(this).attr('data-thumb-h')),
                    itemN      = parseInt($(this).attr('data-thumb-n')),
                    itemMargin = parseInt($(this).attr('data-thumb-margin')),
                    window_w = $(window).outerWidth(),
                    itemSpace  = itemH - itemW + itemMargin;
                var gallery_layout = window_w > 575 ? 'vertical' : 'horizontal';

                if($(this).hasClass('thumbnail-vertical')){
                    $(this).flexslider({
                        selector       : '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation      : 'slide',
                        controlNav     : false,
                        directionNav   : true,
                        prevText       : '<span class="flex-prev-icon"></span>',
                        nextText       : '<span class="flex-next-icon"></span>',
                        asNavFor       : '.woocommerce-product-gallery',
                        direction      : gallery_layout,
                        slideshow      : false,
                        animationLoop  : false,
                        itemWidth      : itemW, // add thumb image height
                        itemMargin     : itemSpace, // need it to fix transform item
                        move           : 1,
                        start: function(slider){
                            var asNavFor     = slider.vars.asNavFor,
                                height       = $(asNavFor).height(),
                                height_thumb = $(asNavFor).find('.flex-viewport').height();
                            if(window_w > 575) {
                                slider.css({'max-height' : height_thumb, 'overflow': 'hidden'});
                                slider.find('> .flex-viewport > *').css({'height': height, 'width': ''});
                            } 
                        }
                    });
                }
                if($(this).hasClass('thumbnail-horizontal')){
                    $(this).flexslider({
                        selector       : '.wc-gallery-sync-slides > .wc-gallery-sync-slide',
                        animation      : 'slide',
                        controlNav     : false,
                        directionNav   : true,
                        prevText       : '<span class="flex-prev-icon"></span>',
                        nextText       : '<span class="flex-next-icon"></span>',
                        asNavFor       : '.woocommerce-product-gallery',
                        slideshow      : false,
                        animationLoop  : false, // Breaks photoswipe pagination if true.
                        itemWidth      : itemW,
                        itemMargin     : itemMargin,
                        start: function(slider){

                        }
                    });
                };
            });
        }
    }

    function serenite_quantity_plus_minus(){
        "use strict";
        $( ".quantity input" ).wrap( "<div class='pxl-quantity'></div>" );
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
        // contact form 7 input number
        $('<span class="pxl-input-number-spin"><span class="pxl-input-number-spin-inner pxl-input-number-spin-up"></span><span class="pxl-input-number-spin-inner pxl-input-number-spin-down"></span></span>').insertAfter('.wpcf7-form-control-wrap input[type="number"]');
    }
    function serenite_ajax_quantity_plus_minus(){
        "use strict";
        $('<span class="quantity-button quantity-down"></span>').insertBefore('.quantity input');
        $('<span class="quantity-button quantity-up"></span>').insertAfter('.quantity input');
    }
    function serenite_quantity_plus_minus_action(){
        "use strict";
        $(document).on('click','.quantity .quantity-button',function () {
            var $this = $(this),
                spinner = $this.closest('.quantity'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('quantity-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
        $(document).on('click','.pxl-input-number-spin-inner',function () {
            var $this = $(this),
                spinner = $this.parents('.wpcf7-form-control-wrap'),
                input = spinner.find('input[type="number"]'),
                step = input.attr('step'),
                min = input.attr('min'),
                max = input.attr('max'),value = parseInt(input.val());
            if(!value) value = 0;
            if(!step) step=1;
            step = parseInt(step);
            if (!min) min = 0;
            var type = $this.hasClass('pxl-input-number-spin-up') ? 'up' : 'down' ;
            switch (type)
            {
                case 'up':
                    if(!(max && value >= max))
                        input.val(value+step).change();
                    break;
                case 'down':
                    if (value > min)
                        input.val(value-step).change();
                    break;
            }
            if(max && (parseInt(input.val()) > max))
                input.val(max).change();
            if(parseInt(input.val()) < min)
                input.val(min).change();
        });
    }
    function serenite_product_single_variations_att(){
        $(document).on('mousedown', '.pro-variation-select', function (e) {
            e.preventDefault();
            var $this_var = $(this).closest('.variations'),
                this_closest = $(this).closest('.pxl-variation-att-terms'),
                target_hidden = $this_var.find('#'+this_closest.attr('data-id'));
            var $this = $(this);
            if (!$this.hasClass('custom-vari-enabled'))
                return;
            var target = $this.attr('data-value');
            if (!target)
                return;
            target_hidden.val(target).change();
            this_closest.find('li.pxl-vari-item').removeClass('active');
            $this.parent('li').addClass('active');
        });
    }
    function serenite_table_cart_content(){
        "use strict";
        var table = jQuery('.woocommerce-cart-form__contents'),
            table_head = table.find('thead');
            table_head.find('.product-remove').remove();
            table_head.find('.product-thumbnail').remove();
            table_head.find('.product-name').attr('colspan',2);
            table_head.find('tr').append('<th class="product-remove">&nbsp;</th>');
    }

    function serenite_table_move_column(table, selected ,from, to, remove, colspan, colspan_value) {
        "use strict";
        var rows = jQuery(selected, table);
        var cols;
        rows.each(function() {
            cols = jQuery(this).children('th, td');
            cols.eq(from).detach().insertAfter(cols.eq(to));
        });
        var rows_remove = jQuery(remove, table);
        rows_remove.each(function(){
            jQuery(this).remove(remove);
        });
        var colspan = jQuery(colspan, table);
        colspan.each(function(){
            jQuery(this).attr('colspan',colspan_value);
        });
    }

})(jQuery);
