require 'test_helper'
require 'rails/performance_test_help'
require 'app/helpers/application_helper'

# Profiling results for each test method are written to tmp/performance.
class BrowsingTest < ActionDispatch::PerformanceTest
  include ApplicationHelper
  
  def test_homepage
    get '/'
  end
  
  def test_pages
    outer_navigation.each do |outer|
      get outer[:path]
      inner_navigation[outer[:outer_nav]].each do |inner|
         get inner[:path]
      end
    end
  end
  
  # overload this method
  def mobile_device?
    true
  end 
end
