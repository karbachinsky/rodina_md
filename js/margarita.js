$(function(){

    var slides = [];
    $('.slide').each(function() {
       slides.push($(this));
    });


    var windowHeight = $(window).height();


    function activate_slide(pos) {
        var i = Math.floor(pos / windowHeight);
        console.log(i, pos);
        var slide = slides[i];

        slide.css("position", "absolute");
        slide.css("top", (windowHeight * i) + "px");

        for (var j=i+1 ; j < slides.length; ++j) {
            slides[j].css("position", "fixed");
            slides[j].css("top", "0px");
        }
    }

    activate_slide(0);

    $(window).scroll(function(event){
        var pos = $(this).scrollTop();

        activate_slide(pos);
    });

});

