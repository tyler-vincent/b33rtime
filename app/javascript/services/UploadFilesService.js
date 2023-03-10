import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("upload[image]", file);

    return http.post("uploads.json", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      onUploadProgress
    });
  }
}

export default new UploadFilesService();
