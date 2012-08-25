$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return (results != null ? results[1] : results);
}

/*
 * Copy and localize CALENDAR_LABELS['en']  
 */
var CALENDAR_LABELS = {};
CALENDAR_LABELS['en'] = 
{
  months: { 
    1: 'January', 
    2: 'February', 
    3: 'March', 
    4: 'April', 
    5: 'May', 
    6: 'June', 
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  },
  months_short: { 
    1: 'Jan', 
    2: 'Feb', 
    3: 'Mar', 
    4: 'Apr', 
    5: 'May', 
    6: 'Jun', 
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  },
  days_of_week: {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  }
};

function Calendar(){

  this.configure = function(configuration){
	  var language =  $.urlParam('language') || window.navigator.userLanguage || window.navigator.language || configuration['language'] ;
	  if (CALENDAR_LABELS[language] == undefined)
	  {
	    this.labels = CALENDAR_LABELS['en'];
	  } else {
	    this.labels = CALENDAR_LABELS[language];
	  }
	  this.display_as_calendar = configuration['display_as_calendar'] || true;
	  this.display_holidays = configuration['display_holidays'] || false;
	  this.display_sunrises = configuration['display_sunrises'] || false;
	  this.display_sunsets = configuration['display_sunsets'] || false;
	  this.show_event_onclick =  configuration['show_event_onclick']
	  if (this.show_event_onclick == undefined)
	  {
	    this.show_event_onclick = function(event_id){
		    return "$('.calender_event').hide(); $('#" + event_id + "').toggle();"
	    };
	  } 
	  this.show_title_onclick =  configuration['show_title_onclick']
	  if (this.show_title_onclick == undefined)
	  {
	    this.show_title_onclick = function(){
		    return "$('.calender_event').hide('scale'); $('#calendar_navigation').show('scale');";
		  };
	  } 
  };
  
  this.generate = function(a_year, a_month){
    this._prepare();

	  this.year = a_year || $.urlParam('year') || this.today.getFullYear();
    this.month = a_month || $.urlParam('month') || (this.today.getMonth() + 1);
    this.first_of_month = new Date(this.year, this.month-1, 1, 0, 0, 0);
	
	  this.calendar_div.fadeOut('slow');

    this._fetch();

	  this.calendar_div.fadeIn('slow');
		
    // if today is not found within the calendar default to the 
    // first day of the month
    if(false == this.today_in_calendar )
    {
      $('#event_1').show();
    }

  };

  this._prepare = function()
  {	
	  this.today = new Date();
	  this.today.setHours(0);
	  this.today.setMinutes(0);
	  this.today.setSeconds(0);
	  this.today.setMilliseconds(0);
	  this.today_in_calendar = false;
	
	  this.calendar_div = $('#'+ (configuration['calendar_div_id'] || 'calendar'));
	  this.calendar_div.html(
"	<div id='calendar_header'> " +
"      <div id='calendar_previous'></div> " +
"      <div id='calendar_title'></div> " +
"      <div id='calendar_next'></div> " +
"    </div> " +
"    <div id='calendar_navigation'></div> " +
"    <div id='calendar_body'> " +
"      <div id='calendar_events'></div> " +
"    </div> " +
"  </div>");
	  this.calendar_events_div = $('#calendar_events');
	  this.calendar_title_div = $('#calendar_title');
	  this.calendar_previous_div = $('#calendar_previous');
	  this.calendar_next_div = $('#calendar_next');
	  this.calendar_navigation_div = $('#calendar_navigation');	
  };
  
  this._fetch = function(){
    var source = 'http://nightsky.jpl.nasa.gov/event-calendar-xml.cfm?Club_ID=1438&Year=' + this.year + '&Month=' + this.month;
    var query = "SELECT * FROM xml WHERE url='" + encodeURI(source) + "'";
    var url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent(query) + "&format=xml";

    var __calendar = this;
     $.get(url, function(xml){  __calendar.process(xml) });
  };

  this.process = function(xml){
    var calendar_month = $(xml).find('calendar').attr('month');
    var calendar_year = $(xml).find('calendar').attr('year');

    var previous_month_link = document.createElement('a');
    var previous_month = parseInt(calendar_month) == 1 ? 12 : parseInt(calendar_month) - 1;
    var previous_year = parseInt(calendar_month) == 1 ?  parseInt(calendar_year) - 1 : parseInt(calendar_year) ;
    //$(previous_month_link).attr({ href: '/news_and_events/calendar?' + $.param( { year: previous_year, month: previous_month })});
    $(previous_month_link).attr({ onclick: 'calendar.generate(' + previous_year + ', ' + previous_month + ')'  });

    var next_month_link = document.createElement('a');
    var next_month = parseInt(calendar_month) == 12 ? 1 : parseInt(calendar_month) + 1;
    var next_year = parseInt(calendar_month) == 12 ? parseInt(calendar_year) + 1 : parseInt(calendar_year) ;
    //$(next_month_link).attr({ href: '/news_and_events/calendar?' + $.param( { year: next_year, month: next_month })});
    $(next_month_link).attr({ onclick: 'calendar.generate(' + next_year + ', ' + next_month + ')'  });

    this.calendar_previous_div.html($(previous_month_link).html('&lt;'));
    this.calendar_next_div.html($(next_month_link).html('&gt;'));  

    title_link = document.createElement('a');
    $(title_link).attr({ onclick: this.show_title_onclick() });
    $(title_link).html(calendar_year + ' ' + this.labels['months'][calendar_month])
    this.calendar_title_div.html( title_link );
    
    var current_month =  $(xml).find('calendar').find('currentmonth');
    var first_day = 1;
    var last_day = parseInt(current_month.attr('days'));
    var day_list = $(document.createElement('ul'));
    if (this.display_as_calendar)
    {
      day_list.attr({ class: 'as_calendar'});
      for(var day_of_week = 0; day_of_week <= 6; day_of_week++)
      {
        var day_item = $(document.createElement('li'));
        day_item.attr({ class: 'as_calendar'});
        day_item.html( this.labels['days_of_week'][day_of_week] );
        day_list.append(day_item);
      }
      for(var day_of_week = 0; day_of_week < this.first_of_month.getDay(); day_of_week++)
      {
        var day_item = $(document.createElement('li'));
        day_item.html( ' ' );
        day_list.append(day_item);
      }
    }
    for(var day = first_day; day <= last_day; day++)
    {
      var event_day = 'event_' + day;
       var day_item = $(document.createElement('li'));
      day_item.attr({ onclick: this.show_event_onclick(event_day), id: event_day + '_button', class: 'event_day_button' });
      day_item.html( day );
      day_list.append(day_item);
    }
    this.calendar_navigation_div.html( day_list );
      
    var __calendar = this;
    $(xml).find('calendar').find('currentmonth').find('date').each( function(){ __calendar._date(this); });
  };

  this._moonphase = function(date, day)
  {
	  var day = date.attr('day');
    var moon_phase = $(date).find('moonphase');
    if (moon_phase.length > 0)
    {
      $('#event_'+day+'_button').addClass('calendar_info');
      var title = moon_phase.find('title');
      if(title.length > 0)
      {
        var image_url = moon_phase.find('image');
        var image_tag = document.createElement('img');
        $(image_tag).attr({
          src: image_url.text(),
          title: title.text(),
          alt: title.text() 
        });

        var moonphase_link = moon_phase.find('url');
        var image_link = document.createElement('a');
        $(image_link).attr({
          href:  moonphase_link.text(),
          rel: 'external'
        });
        var div = $(document.createElement('div'));  
        div.attr({ class: 'moonphase' });          
        div.html(  image_tag );
        $('#event_' + day + '_button').append(div);
      }  
    }	
  };

  this._holiday = function(date, a_event_div)
  {
    var holiday = $(date).find('holiday');
    if (holiday.length > 0)
    {
      a_event_div.append(  holiday.find('displaytitle') );
    }
  };

  this._sunset = function(date, a_event_div)
  {        
    var sunset = $(date).find('sunset');
    if (sunset.length > 0)
    {
      a_event_div.append(  'Sunset: ' + sunset.find('title').text() );
    } 
  };   
     
  this._sunrise = function(date, a_event_div)
  {       
    var sunrise = $(date).find('sunrise');
    if (sunrise.length > 0)
    {
      a_event_div.append(  'Sunrise: ' + sunset.find('sunrise').text() );
    }  	
  };

  this._event = function(event, a_event_div)
  {
    this._event_status(event, a_event_div);
  
    this._event_title(event, a_event_div);

    this._event_location(event, a_event_div);

    this._event_description(event, a_event_div);

	  this._event_links(event,a_event_div);
  };

  this._event_status = function(event, a_event_div)
  {
  	var status = event.attr('status');
	  var div = $(document.createElement('div'));
	  div.attr({ class: 'status' });
	  a_event_div.append( div.html(status) );
  };

  this._event_title = function(event, a_event_div)
  {
	  var title = event.find('title');
	  var event_url = event.find('eventurl');
	  var event_link = document.createElement('a');
	  $(event_link).attr({ 
		 href: event_url.text(),
     rel: 'external'
    });
	  var div = $(document.createElement('div'));
	  div.attr({ class: 'title' });
	  a_event_div.append( div.html( $(event_link).html( title ) ) );
  };
  

  this._event_description = function(event, a_event_div)
  {
		var description = event.find('description');
	  var div = $(document.createElement('div'));  
	  div.attr({ class: 'description' });
	  a_event_div.append( div.append(description.text()) );
  };

  this._event_location = function(event, a_event_div)
  {
	  var event_location = event.find('eventlocation');
	  if(event_location.length > 0)
	  {
	    var event_latitude = event_location.attr('latitude');
	    var event_longitude = event_location.attr('longitude');
	    var event_location_name = '';
	    var event_location_address = [];
	    if (event_location.find('locationname').text() != 'null')
	      event_location_name = event_location.find('locationname').text();
	    if (event_location.find('locationaddress').length > 0)
	      event_location_address.push(event_location.find('locationaddress').text());
	    if (event_location.find('locationcity').text() != 'null')
	      event_location_address.push(event_location.find('locationcity').text());
	    if (event_location.find('locationstate').text() != 'null')
	      event_location_address.push(event_location.find('locationstate').text());
	    if (event_location.find('locationzip').text() != 'null')
	      event_location_address.push(event_location.find('locationzip').text());
	    var event_location_link = document.createElement('a');
	    $(event_location_link).attr({
	      href: 'https://maps.google.com/maps?q=' + event_latitude + ',+' + event_longitude + '+(' + encodeURI(event_location_name) + ')&iwloc=A',
        rel: 'external'
	    });
	    var div = $(document.createElement('div'));
	    div.attr({ class: 'location' });
	    a_event_div.append( div.html( $(event_location_link).html( event_location_address.join(', ') ) ) );
	  }	
  };

  this._event_links = function(event, a_event_div)
  {
     var links = event.find('link');
     if(links.length > 0)
     {
      links.each( function(index){
        var event_link = $(links[index]);
        var link_type = event_link.find('linktype');
        var link_title = event_link.find('linktitle');
        var link_url = event_link.find('linkurl');
        if( link_title.text() == link_url.text())
          link_title = link_type;
        var link = document.createElement('a');
        $(link).attr({
          href: link_url.text(),
      	  rel: 'external'
        });
        var div = $(document.createElement('div'));
        div.attr({ class: 'link' });
        a_event_div.append( div.html( $(link).html( link_title ) ) );
      });
     }	
  };

  this._date = function(date){
    var date = $(date);
    var year = date.attr('year');
    var month = date.attr('month');
    var day = date.attr('day');

    var event_div = $(document.createElement('div'));
    event_div.attr({ id: 'event_' + day, class: 'calender_event' })

    var event_date = new Date(year, month-1, day, 0, 0, 0, 0);
    var date_text = "<div class='event_date'><div class='day_of_week'>" + this.labels['days_of_week'][event_date.getDay()] + "</div>" 
    date_text += "<div class='month'>"+ this.labels['months_short'][month] + '</div>' 
    date_text += "<div class='day'>" + (day < 10 ? '0'+day : day) + '</div></div>';
    event_div.append( date_text );

    this._moonphase(date);

    if (this.display_holidays)
      this._holiday(date, event_div);
    if (this.display_sunrises)
      this._sunrise(date, event_div);
    if (this.display_sunsets)
      this._sunset(date, event_div);

    var events = $(date).find('event');
    if (events.length > 0)
    {
      var events_div = $(document.createElement('div'));
      events_div.attr({ class: 'events' });
      $('#event_'+day+'_button').addClass('calendar_event_occuring');

      var __calendar = this;
      events.each( function(index, event){
		    var event_details_div = $(document.createElement('div'));
    	  event_details_div.attr({ class: 'event_details '});
        
        __calendar._event( $(event), event_details_div );

 	      events_div.append(event_details_div)
	      event_div.append(events_div);                  	
      });

    }      
    this.calendar_events_div.append(event_div);        
    if (this.today.toString() == event_date.toString()){
      this.today_in_calendar = true;
      var event_day = '#event_' + day;
      //$(event_day).show();
      $(event_day + '_button').addClass('today');
    }
  };
};
