# coding: utf-8
class PageController < ApplicationController
  
	before_filter :global_notice, :except => [:error]

	def global_notice
    flash[:notice] = "This calendar-widget is currently <b>beta</b> quality.  It <em>should</em> work out of the box; but, if it does not then <a href='/contact'>please contact the author</a>."
	end

  def error
	  flash[:notice] = nil
    flash[:alert] = 'An error occurred; we are unable to find the page you are looking for.'

    respond_to do |format|
      format.html { render :layout => 'home' }
      format.mobile { render :layout => 'application' }
    end    
  end

  def home
    @outer_nav = 'o_home'
    @title = 'Night Sky Network › Calendar'
    @mobile = 'Calendar'
    respond_to do |format|
      format.html { render :layout => 'home' }
      format.mobile { render :layout => 'application' }
    end    
  end

  def contact
    @outer_nav = 'o_contact'
    @title = 'Night Sky Network › Contact'
    @mobile = 'Contact'
    respond_to do |format|
      format.html { render :layout => 'home' }
      format.mobile { render :layout => 'application' }
    end    
  end
  
  def about
    @outer_nav = 'o_about'
    @title = 'Night Sky Network › About'
    @mobile = 'About'
    respond_to do |format|
      format.html { render :layout => 'home' }
      format.mobile { render :layout => 'application' }
    end    
  end
  
  def instructions
    @outer_nav = 'o_examples'
    @title = 'Night Sky Network › Examples'
    @mobile = 'Examples'
    respond_to do |format|
      format.html { render :layout => 'application' }
      format.mobile { render :layout => 'application' }
    end    
  end

  def example_simple
    @outer_nav = 'o_examples'
    @title = 'Night Sky Network › Simple Example'
    @mobile = 'Examples'
    respond_to do |format|
      format.html { render :layout => 'application' }
      format.mobile { render :layout => 'application' }
    end    
  end
  
  def configuration
    @outer_nav = 'o_examples'
    @title = 'Night Sky Network › Configuration'
    @mobile = 'Configuration'
    respond_to do |format|
      format.html { render :layout => 'application' }
      format.mobile { render :layout => 'application' }
    end    
  end
    
  def news_and_events_calendar
    @outer_nav = 'o_home'
    @title = 'News & Events › Calendar'
    @mobile = 'Calendar'
    respond_to do |format|
      format.html { render :layout => 'application' }
      format.mobile { render :layout => 'application' }
    end    
  end
  
  

end
