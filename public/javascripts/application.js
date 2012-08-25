// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
	
$(window).load( function () {
  $('#logout_action').bind( 'ajax:complete', function(){
		window.location.href = '/';
	});
  $('.equipment_delete').bind( 'ajax:complete', function(){
		window.location.href = '/equipment';
	});
  $('.slides_delete').bind( 'ajax:complete', function(){
		window.location.href = '/slides';
	});
  $('.meeting_notes_delete').bind( 'ajax:complete', function(){
		window.location.href = '/meeting_notes';
	});
	$('.hasDatePicker').datepicker();
	$('.hasDateTimePicker').datetimepicker({ 
    dateFormat: $.datepicker.RFC_2822, 
    timeFormat: 'hh:mm z', 
    showTimezone: true, 
    timezone: "-0700" 
  });
  $('textarea.tinymce').tinymce({
			// Location of TinyMCE script
			script_url : '/javascripts/tiny_mce/tiny_mce.js',

			// General options
			theme : "simple",
			plugins : "autolink,lists,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,advlist",

			// Theme options
			theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull",
			theme_advanced_buttons2 : "bullist,numlist,|,outdent,indent,blockquote,|,undo,redo",
			theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,fullscreen",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,

			// Example content CSS (should be your site CSS)
			content_css : "/stylesheets/tiny_mce.css",

			// Drop lists for link/image/media/template dialogs
			template_external_list_url : "lists/template_list.js",
			external_link_list_url : "lists/link_list.js",
			external_image_list_url : "lists/image_list.js",
			media_external_list_url : "lists/media_list.js",

			// Replace values for the template plugin
			// template_replace_values : {
			// 	username : "Some User",
			// 	staffid : "991234"
			// }
		});

	$('#slider').nivoSlider({
		effect: 'slideInLeft', // Specify sets like: 'fold,fade,sliceDown'
        slices: 15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed: 500, // Slide transition speed
        pauseTime: 3000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        directionNav: true, // Next & Prev navigation
        directionNavHide: true, // Only show on hover
        controlNav: true, // 1,2,3... navigation
        controlNavThumbs: false, // Use thumbnails for Control Nav
        pauseOnHover: true, // Stop animation while hovering
        manualAdvance: false, // Force manual transitions
        prevText: 'Prev', // Prev directionNav text
        nextText: 'Next', // Next directionNav text
        randomStart: false, // Start on a random slide
        beforeChange: function(){}, // Triggers before a slide transition
        afterChange: function(){}, // Triggers after a slide transition
        slideshowEnd: function(){}, // Triggers after all slides have been shown
        lastSlide: function(){}, // Triggers when last slide is shown
        afterLoad: function(){} // Triggers when slider has loaded
	});
});