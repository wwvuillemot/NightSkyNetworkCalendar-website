# coding: utf-8
class PageController < ApplicationController

  def error
    flash[:notice] = 'An error occurred; we are unable to find the page you are looking for.'

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

  def about
    @outer_nav = 'o_about'
    @title = 'Night Sky Network › About'
    @mobile = 'About'
    respond_to do |format|
      format.html { render :layout => 'home' }
      format.mobile { render :layout => 'application' }
    end    
  end
  
  def examples
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
