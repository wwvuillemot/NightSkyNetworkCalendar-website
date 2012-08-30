NightSkyNetworkCalendarWebsite::Application.routes.draw do
  
  match '/home', :to => 'page#home'
  match '/news_and_events/calendar', :to => 'page#news_and_events_calendar'
  match '/examples',      :to => 'page#examples'
  match '/examples/simple',      :to => 'page#example_simple'
  match '/configuration',      :to => 'page#configuration'
  match '/about',         :to => 'page#about'
  match '/contact',         :to => 'page#contact'


  root :to => "page#home"
  match '/:anything', :to => "page#error", :constraints => { :anything => /.*/ }, :status => 404
  


end
