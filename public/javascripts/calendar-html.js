var calendar = new Calendar();

$('#calendar').ready( function (){
  configuration = { 
    language: 'en',
    display_as_calendar: true,
    display_holidays: true,
    display_sunsets: true,
    display_sunrises: true,
    calendar_div_id: 'calendar',
    show_event_onclick: function(event_id){
	    return "$('#calendar_navigation').hide('drop'); " +
	      "$('.calender_event').hide(); " + 
	      "$('#" + event_id + "').show('drop');";
    },
	  show_title_onclick: function(){
		  return "$('.calender_event').hide('drop'); " +
		    "$('#calendar_navigation').show('drop');";
		},
  };
  calendar.configure(configuration);
  calendar.generate();
});