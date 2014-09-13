/**
 * ParallaxBlockSlider.js
 * @author Igor Karbachinsky <igorkarbachinsky@mail.ru>
 * @description Creates a semi-parallax slide effect between an array of blocks layers when scrolling.
 * (c) September 2014
 *
 */

(function($) {

    /**
     * Initialize
     * @param {Jquery selector | object} slides
     * @return
     */
    function BlockScrollSlider(slides, params) {
        var self = this;

        self.$slides = slides;

        self.currentSlide = null;
        self.slidesArray = [];
        self.slidesHeights = [];
        self.slidesAbsPositions = [];
        self.initialZIndex = 100;
        self.slidesCnt = self.$slides.length;
        self.totalHeight = 0;

        self.params = {
            wrapperClass: 'slide-wrapper',
            initialZIndex: 100,
            changeSlideCallback: function(currentSlide) {}
        };

        if("object" == typeof(params)) {
            $.extend(self.params, params);
        }

        var sum = 0, i = 0;
        self.$slides.each(function() {
            $(this).css({ 'z-index': self.params.initialZIndex + self.$slides.length - i++ });
            self.slidesArray.push($(this));
            self.slidesHeights.push($(this).height());

            self.slidesAbsPositions.push(sum);

            sum += $(this).height();
        });

        self.totalHeight = sum;

        self._createWrapper();
        self._activateSlide($(window).scrollTop());

        $(window).scroll(function(e){
            self._activateSlide($(this).scrollTop());
        });

        $(window).resize(function(e) {
            self._activateSlide($(this).scrollTop());
        });
    }

    /**
     * Activates slide corresponding to certain scroll position
     * @param {Number} pos
     * @return
     */
    BlockScrollSlider.prototype._activateSlide = function(pos) {
        var self = this;

        if (pos > self.totalHeight)
            return;

        var i = self.slidesCnt - 1;
        for (var j=1; j<self.slidesCnt; ++j) {
            if (pos < self.slidesAbsPositions[j]) {
                i = j-1;
                break;
            }
        }

        if (i != self.currentSlideIndex) {
            self.params.changeSlideCallback(self.slidesArray[i]);
            self.currentSlideIndex = i;
        }

        for (var j=0; j<self.slidesCnt; ++j) {
            if (j <= i) {
                self.slidesArray[j].css({
                    position: "absolute",
                    top: self.slidesAbsPositions[j] + "px"
                });
            }
            else {
                self.slidesArray[j].css({
                    position: "fixed",
                    top: "0px"
                });
            }
         }
    };

    /**
     * Creates wrapper around slides and set necessary height for it.
     * @return
     */
    BlockScrollSlider.prototype._createWrapper = function() {
        var self = this;

        self.$slides.wrapAll("<div class=\"" + self.params.wrapperClass + "\"></div>");
        $("." + self.params.wrapperClass).css({
            height: self.totalHeight + "px"
        });

    };

    /**
     * Scrolls to certain slider identified by number
     * @param {Number} i
     * @return
     */
    BlockScrollSlider.prototype.scrollTo = function(i) {
        var self = this;

        $(window).scrollTop(self.slidesAbsPositions[ i ]);
    };

    /**
     * Get slide by index
     * @param {Number} i
     * @return
     */
    BlockScrollSlider.prototype.getSlide = function(i) {
        var self = this;

        return self.slidesArray[i];
    };

    /**
     * Wrapper for JQuery
     * @param {Objeet} params
     * @return BlockScrollSlider object
     */
    $.fn.blockScrollSlider = function(params) {
        return new BlockScrollSlider(this, params);
    };

})(jQuery);
