class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :prepare_for_mobile
  rescue_from ActionController::RoutingError, :with => :render_404
  
  private

  def mobile_device?
    if session[:mobile_param]
      session[:mobile_param] == "1"
    else
      request.user_agent =~ /Mobile|webOS/
    end
  end
  helper_method :mobile_device?

  def prepare_for_mobile
    session[:mobile_param] = params[:mobile] if params[:mobile]
    request.format = :mobile if mobile_device?
  end 
  
private
  
  def render_404(exception = nil)
    if exception
        logger.info "Rendering 404: #{exception.message}"
    end

    redirect_to '/', :status => 404
  end
  
end
