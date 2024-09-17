namespace UPLOAD {
  type PostUploadFileResponse = {
    name: string;
    format: string;
    url: string;
  };
  type PostUploadFileRequest = FormData;
}
