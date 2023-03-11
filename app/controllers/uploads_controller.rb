class UploadsController < ApplicationController
  include CacheCrispies::Controller

  def index
    @uploads = Upload.order("created_at desc").paginate(:per_page => 50, :page => params[:page])
    cache_render UploadSerializer, @uploads
  end

  def stream_image
    if params[:id].present?
      @upload = Upload.find(params[:id])
    else
      @upload = Upload.find_by_token(params[:token])
    end

    #file_data = URI.open(@upload.image_url(:full))
    #send_data file_data.read, :filename => @upload[:image], :disposition => 'inline'
    redirect_to @upload.image_url(:full, query: {"response-content-disposition" => "inline;"}), allow_other_host: true
  end

  def create
    @upload = Upload.create(upload_params)
    cache_render UploadSerializer, @upload
  end

 private

  def upload_params
    params.require(:upload).permit(:image, :name, :remote_image_url)
  end

end
