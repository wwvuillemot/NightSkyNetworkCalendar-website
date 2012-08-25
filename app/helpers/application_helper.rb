module ApplicationHelper
  def resource_name
    :user
  end
  
  def show_title?
    return true
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
  
  def outer_navigation
    outer_navigation = [ 
      { :text => "Home",
        :outer_nav => "o_home",
        :path => home_path },
      { :text => "Examples",
        :outer_nav => "o_examples",
        :path => examples_path },
      { :text => "About",
        :outer_nav => "o_about",
        :path => about_path },
      ]
        
    return outer_navigation
  end
  
  def full_url(link)
    request.host + link
  end

  def inner_navigation
    #reset_session
    # defines the sidebar navigation
    # a new path need only define what outer_nav it belongs to show all the children paths
    # (its siblings) in its own sidebar
    # use the routes in routes.rb to ensure we can match the current path
    inner_navigation = {}
    
    outer_navigation.each do |item| 
      inner_navigation[item[:outer_nav]] = []
    end

    inner_navigation['o_home'] << { :paths => [examples_path], :text => 'Examples' }
    inner_navigation['o_home'] << { :paths => [examples_path], :text => 'About' }

    inner_navigation['o_examples'] << { :paths => [examples_path], :text => 'Getting Started' }
    inner_navigation['o_examples'] << { :paths => [configuration_path], :text => 'Configuration Options' }
    inner_navigation['o_examples'] << { :paths => [examples_simple_path], :text => 'Simple Example' }
    
    inner_navigation['o_about'] << { :paths => [about_path], :text => 'About' }
        
    return inner_navigation
  end
  
end
