require 'test_helper'

class PageControllerTest < ActionController::TestCase
  include Devise::TestHelpers 

  # Replace this with your real tests.
  test "the truth" do
    assert true
  end
  
  test "pages" do
    %w(home membership membership_join 
    news_and_events news_and_events_calendar news_and_events_star_parties  
    news_and_events_meetings news_and_events_maps_and_directions 
    community community_photo_gallery community_members_websites community_special_interest_groups
    about_us about_us_mission_and_goals about_us_board_members
    resources resources_telescope resources_observing resources_regional_clubs resources_further_reading
    resources_outreach contact forum email).each do |method|
      assert get(method), method
    end
  end
  
end
