import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (channelId) => `/channels/${channelId}/messages`,
      providesTags: ["message"],
    }),
    deleteMessages: builder.mutation({
      query: ({ messageId }) => ({
        url: `/channels/messages/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
    addNewMessages: builder.mutation({
      query: ({ channelId, body }) => ({
        url: `/channels/${channelId}/messages`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddNewMessagesMutation,
  useDeleteMessagesMutation,
} = extendedApiSlice;
