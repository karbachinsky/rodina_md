(function($) {
    $(function() {

        /**
         * Callback on slider change slide event
         * @return
         */
        var menuActivateSlide = function(slide) {
            var currentIndex = slide.index();

            $("#menu .wordhover").removeClass('active');
            $("#menu .circle").removeClass('circle-active');

            if (slide.hasClass('about')) {
                $(".menu-about").addClass('active');
                $(".menu-about-circle:eq(" + currentIndex + ")").addClass('circle-active');
            }
            else if(slide.hasClass('works')) {
                $(".menu-works").addClass('active');
                $(".menu-works-circle").addClass('circle-active');
            }
            else if(slide.hasClass('contacts')) {
                $(".menu-contacts").addClass('active');
                $(".menu-contacts-circle").addClass('circle-active');
            }

        };

        /**
         * Menu handler
         * @param {BlockScrollSlider} slider
         * @return
         */
        var menu = function(slider) {
            // Click on menu item link
            $("#menu .wordhover").on('click', function(e){
                e.preventDefault();
                // Find first circle after this label and click it
                $(this).parent().next().children().click();
            });

            // Click on circle
            $("#menu .circle").on('click', function(e){
                e.preventDefault();
                var index = $(this).data("index");

                slider.scrollTo(index);
            });
        };


        var works = function(slider) {
            // Hover
            $(".work").on("mouseenter", function() {
                var img = $(this).find("img");
                var new_src = img.data("hover-src");
                img.attr("src", new_src);

                $(this).find(".description").hide();

                var color = $(this).data("hover-color")

                $(this).css({
                    'border-color': color
                });

                var details = $(this).find(".details");

                details.css({
                    'background-color': color
                });

                details.animate({
                    'left': 0
                }, 200);
            });

            // mouseout
            $(".work").on("mouseleave", function() {
                var img = $(this).find("img");
                var new_src = img.data("initial-src");
                img.attr("src", new_src);

                $(this).find(".description").show();

                $(this).css({
                    'border-color': 'white'
                });

                var details = $(this).find(".details");

                details.animate({
                    'left': '-80%'
                }, 200);
            });

            // click
            $(".work").on("click", function() {
                $(".slide-wrapper").hide();
                $(".works-full").show();

                $("#header").hide();
                $("#headercontainer").show();

                var index = $(this).index();

                slideToWork(index);
            });

            var current_work_index = 0;

            function slideToWork(index) {
                $(".works-full ul").animate({
                    'margin-left': -(index * $(window).width()) + "px"
                }, 250);
                current_work_index = index;

                // coloring menu
                var $work = getWorkByIndex(current_work_index);

                $work.find("img").each(function(){
                    var fakeSrc = $(this).attr("fsrc");
                    if (fakeSrc) {
                        $(this).attr("src", fakeSrc);
                        $(this).removeAttr("fsrc");
                    }
                });

                var color = $work.data("color");

                $("#headercontainer").css({
                    'border-color': color
                });

                $("#headercontainer a").css({
                    color: color
                });

                $work.css({height: ""});

                $(".work-full").not($work).css({
                    height: "1px"
                });

                $(window).scrollTop(0);
            }

            function getWorkByIndex(index) {
                return $(".work-full:eq(" + index + ")");
            }

            function nextWork(direction) {
                var $work = getWorkByIndex(current_work_index);

                var $next_work = 'next' == direction ? $work.next() : $work.prev();

                if ( ! $next_work.length ) {
                    $next_work = 'next' == direction ? $(".work-full:eq(0)") : $(".work-full:last");
                }

                slideToWork($next_work.index());
            }

            function setWorksSLiderWidth(){
                $(".work-full").css({
                    width: $(window).width() + "px"
                });

                $(".works-full ul").css({
                    width: ($(".work-full").length * $(window).width()) + "px"
                });
            }
            setWorksSLiderWidth();
            $(window).on('resize', function() {
                setWorksSLiderWidth();
                slideToWork(current_work_index);
            });


            $("#headercontainer .back-to-works").on("click", function(e) {
               e.preventDefault();
               $(".works-full").hide();
               $("#headercontainer").hide();
               $("#header").show();
               $(".slide-wrapper").show();
               slider.scrollTo(4);
            });

            $("#headercontainer .next").on("click", function(e) {
               e.preventDefault();

               nextWork('next');
            });

            $("#headercontainer .prev").on("click", function(e) {
               e.preventDefault();

               nextWork('prev');
            });
        };


        var keepScrollig = function() {
            var mouse = $(".mouse");

            function _show_mouse() {
                mouse.show();
                mouse.animate({opacity: 1}, 500);
            }

            if (50 >= $(window).scrollTop())
                _show_mouse();


            $(window).scroll(function(e){
                /*if (50 >= $(window).scrollTop()) {
                    _show_mouse();
                    return;
                }
                */

                mouse.animate({opacity: 0}, 500, function() {
                    $(this).hide();
                });
            });
        }


        var backgroundResizer = function($block) {
            var $device = $block.find(".device");
            var $background = $block.find(".background-img");
            var $textSection = $device.find(".text-section");
            // Scale background for mobiles
            /*
            if ($(window).height() > $(window).width()) {
                $background.find(".background-img").css({
                    width: "100%"
                });
            }
            else {
                $background.find(".background-img").css({
                    height: "100%"
                });
            }

            $background.css({
                'height': $background.find(".background-img").height()
            });
            */


            /*if ($device.data("height")) {
                blockCurrentHeight = $device.data("height");
                blockCurrentWidth = $device.data("width");
            }
            else {
            */
            var deviceOriginalHeight, deviceOriginalWidth, deviceOriginalTop, deviceOriginalFontSize, deviceOriginalFontTop;
            if (!$device.data("height")) {
                deviceOriginalHeight = $device.height();
                deviceOriginalWidth = $device.width();
                deviceOriginalTop = parseInt($device.css("top"));

                deviceOriginalFontSize = parseFloat($textSection.css("font-size"))
                deviceOriginalFontTop = parseInt($textSection.css("top"));

                $device.attr({
                    "data-height": deviceOriginalHeight,
                    "data-width": deviceOriginalWidth,
                    "data-top": deviceOriginalTop,
                    "data-font-size": deviceOriginalFontSize,
                    "data-font-top": deviceOriginalFontTop
                })
            }
            else {
                deviceOriginalHeight = $device.data("height");
                deviceOriginalWidth = $device.data("width");
                deviceOriginalTop = $device.data("top");
                deviceOriginalFontSize = $device.data("font-size");
                deviceOriginalFontTop = $device.data("font-top");
            }
            //background.css({height: "100%"});
            var bgImgHeight = $background.height();

            var k = parseFloat(bgImgHeight) / $device.data("initial-height");
            console.log(deviceOriginalHeight, k);

            var blockNewHeight = parseInt(k * deviceOriginalHeight);
            var blockNewWidth = parseInt(k * deviceOriginalWidth);

            var newTop = parseInt(k * deviceOriginalTop);

            $device.css({
                "margin-left": parseInt(-(blockNewWidth)/2) + "px",
                "width": blockNewWidth + "px",
                "height": blockNewHeight + "px",
                "top": newTop + "px"
            });

            $textSection.css({
                "font-size": parseInt(k * deviceOriginalFontSize) + "px",
                "top": parseInt(k * deviceOriginalFontTop) + "px"
            });
        };


        var slider = $('.slide').blockScrollSlider({
            changeSlideCallback: menuActivateSlide,
            initialZIndex: 110
        });


        var blocks = ["#background1", "#background2", "#background3", "#background4", "#backgroundcontacts"];

        function resizeAllBlocks() {
            // Scaling each block with image
            for (var i=0; i<blocks.length; ++i) {
                var $block = $(blocks[i]);
                (function($block){
                    imagesLoaded($block.find("img") , function( instance ) {
                        backgroundResizer($block);
                    });
                    /*
                    $block.find(".background-img").load(function() {
                         backgroundResizer($block);
                    });
                    */
                })($block);
            }
        }

        $(window).resize(function() {
            for (var i=0; i<blocks.length; ++i) {
                backgroundResizer($(blocks[i]));
            }
        });

        resizeAllBlocks();
        menu(slider);
        works(slider);
        keepScrollig();
    });
})(jQuery);