import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      UPLOAD.PostUploadFileResponse,
      UPLOAD.PostUploadFileRequest
    >({
      query: (data) => ({
        url: `upload/file`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["upload"],
    }),
  }),
});

export const { useUploadFileMutation } = api;
