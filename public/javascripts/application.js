// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
	
function BackgroundFlip() {
	  image = Math.floor( Math.random() * 11 );
    $('.constellation-background').css('background-image', 'url(/images/background_' + image + '.jpg)');
}

$(window).load( function () {
	BackgroundFlip();
});