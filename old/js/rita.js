/* Rodina M.D. site script
 *
 */

  
function scale_triangle1(main_img, triangle_img) {

	var img_w = parseInt(main_img.width());

	var koef = img_w/1280;
	
	console.log('k=' + koef);

	var triangle_w = 34;

	console.log('trw1 = '+ triangle_w);	

	triangle_w = parseInt(koef * triangle_w);

	console.log('trw2 = '+ triangle_w);

	triangle_img.css('width', triangle_w + 'px');
}

/*
function scale_main_img(main_img) {
	return 0;
	var doc_w = parseInt($(window).width()),
		doc_h = parseInt($(window).height());

	var img_w = parseInt(main_img.width()),
		img_h = parseInt(main_img.height());

	var header_block = $('#header');
		
	var header_w = parseInt(header_block.width()),
		header_h = parseInt(header_block.height());
			
	// Counting real height that image must be 	
	var img_scaled_h = doc_h - header_h;

	var img_scaled_w = parseInt( (img_scaled_h / img_h) * img_w );	
			
	// Now we got sclaed sizes. 
		
	console.log( img_scaled_w, img_scaled_h );
		
	main_img.attr({
		width: img_scaled_w + 'px', 
		height: img_scaled_h + 'px',
		left: parseInt( (doc_w  - img_scaled_w ) / 2 ) + 'px'
	});		
} 
 */
 
$(document).ready(function() {
	var main_img = $('#main-image img');

	// Scaling main image
	//main_img.on('load', function() {
	//	scale_main_img($(this));
	//	scale_triangle1($(this));
	//})

	// FIXME	
	var triangle1_img = $('#triangle1 img');
	main_img.on('load', function() {
		scale_triangle1(main_img, triangle1_img);
	});

	//triangle1_img.on('load', function() {
	//	scale_triangle1(main_img, triangle1_img);
	//});

	$(window).resize(function(){
		//scale_main_img(main_img);
		scale_triangle1(main_img, triangle1_img);
	});

	$('.work-item').mouseover(function() {
		$(this).find('img').addClass('clicked');
		var work_descr = $(this).find('.work-descr');
		work_descr.addClass('clicked');
		work_descr.find('a').addClass('clicked');
	});
	
	$('.work-item').mouseout(function() {
		$(this).find('img').removeClass('clicked');
		var work_descr = $(this).find('.work-descr');
		work_descr.removeClass('clicked');
		work_descr.find('a').removeClass('clicked');
	});
	
	$("#see-more").click(function() {
		$(this).closest('tr').siblings('tr:hidden').show('fast');
		
		$(this).parent().replaceWith($(this).closest('tr').siblings('tr:last').find('td:last'));
		
		return false;
	});
	
	$('#see-more').hover(function(){
		$(this).find('img').attr('src', 'img/portfolio/see_more_plus.png');
	}, function() {
		$(this).find('img').attr('src', 'img/portfolio/see_more.png');
	});	
	
	// Images navigation
	$('#works').find("a").fancybox({
		loop: true,
		centerOnScroll: true,
		scrolling: 'yes',
		overlay : {
			css : { 'overflow' : 'hidden !important' }
		},
		autoScale: false,
		fitToView: false
	});
	
	// Menu
	$('#menu').find('li a').click(function() {
		$('#' + $(this).attr('to')).ScrollTo({
			duration: 800
		});
		return false;
	});
	

	// Scrool Up
	var scrollUp = $('#scrollUp');
	if(scrollUp.length > 0) {
		scrollUp.liScrollToTop();
	}

	// Form handler
	$('form').submit(function() {
		var self = $(this);
			
		var from = self.find('[name=from]').val();
		var msg = self.find('[name=message]').val();	

		$.ajax({
			type: 'POST',
			url:'send.php', 
			data: {
				from: from, msg: msg, fr: 'rodina_md'
			},
			success: function(data) {
				self.replaceWith('<p class="ok">Спасибо! Я постараюсь ответить тебе в ближайшее время!</p>');
			},
			error: function() {
				self.replaceWith('<p class="error">Кажется произошла ошибка :(<br/>Попробуй отправить мне письмо на rodinamd@gmail.com!</p>');
			}	
		});
		return false;    	
        });

});

