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

        var slider = $('.slide').blockScrollSlider({
            changeSlideCallback: menuActivateSlide
        });

        menu(slider);

    });
})(jQuery);