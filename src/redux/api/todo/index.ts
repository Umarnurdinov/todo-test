import { api as index } from "..";

const ENDPOINT = process.env.NEXT_PUBLIC_API;
const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TODO.GetTodosResponse, TODO.GetTodosRequest>({
      query: () => ({
        url: ENDPOINT,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),
    postTodo: builder.mutation<TODO.PostTodosResponse, TODO.PostTodosRequest>({
      query: (data) => ({
        url: ENDPOINT,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),
    updateTodo: builder.mutation<TODO.PatchTodoResponse, TODO.PatchTodoRequest>(
      {
        query: ({ _id, data }) => ({
          url: `/${ENDPOINT}/${_id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["todo"],
      }
    ),
    deleteTodo: builder.mutation<
      TODO.DeleteTodoResponse,
      TODO.DeleteTodoRequest
    >({
      query: (_id) => ({
        url: `/${ENDPOINT}/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
    deleteTodos: builder.mutation<
      TODO.DeleteTodosResponse,
      TODO.DeleteTodosRequest
    >({
      query: () => ({
        url: ENDPOINT,
        method: "DELETE",
      }),
      invalidatesTags: ["todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useDeleteTodosMutation,
} = api;
