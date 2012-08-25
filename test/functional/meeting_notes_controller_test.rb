require 'test_helper'

class MeetingNotesControllerTest < ActionController::TestCase
  include Devise::TestHelpers 

  setup do
    @meeting_note = meeting_notes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:meeting_notes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create meeting_note" do
    assert_difference('MeetingNote.count') do
      post :create, :meeting_note => @meeting_note.attributes
    end

    assert_redirected_to meeting_note_path(assigns(:meeting_note))
  end

  test "should show meeting_note" do
    get :show, :id => @meeting_note.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @meeting_note.to_param
    assert_response :success
  end

  test "should update meeting_note" do
    put :update, :id => @meeting_note.to_param, :meeting_note => @meeting_note.attributes
    assert_redirected_to meeting_note_path(assigns(:meeting_note))
  end

  test "should destroy meeting_note" do
    assert_difference('MeetingNote.count', -1) do
      delete :destroy, :id => @meeting_note.to_param
    end

    assert_redirected_to meeting_notes_path
  end
end
