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

            $(".work-full").css({
                width: $(window).width() + "px"
            });

            $(".works-full ul").css({
                width: ($(".work-full").length * $(window).width()) + "px"
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


        var slider = $('.slide').blockScrollSlider({
            changeSlideCallback: menuActivateSlide,
            initialZIndex: 110
        });

        menu(slider);
        works(slider);
    });
})(jQuery);