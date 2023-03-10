class UploadsController < ApplicationController

  def index
    @uploads = Upload.order("created_at desc").paginate(:per_page => 20, :page => params[:page])
  end

  def stream_image
    if params[:id].present?
      @upload = Upload.find(params[:id])
    else
      @upload = Upload.find_by_token(params[:token])
    end

    URI.open(@upload.image_url(:full)) {|img|
      tmpfile = Tempfile.new("download")
      File.open(tmpfile.path, 'wb') do |f|
        f.write img.read
      end
      send_file tmpfile.path, :filename => @upload[:image], :disposition => 'inline'
    }
  end

  def create
    @upload = Upload.create(upload_params)
  end

 private

  def upload_params
    params.require(:upload).permit(:image, :name, :remote_image_url)
  end

end
