import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteSort: builder.mutation({
      query: (sortId) => ({
        url: `/sorts/${sortId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sort"],
    }),
    addNewChannel: builder.mutation({
      query: ({ sortId, body }) => ({
        url: `/sorts/${sortId}/channel`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["channel"],
    }),
  }),
});

export const { useDeleteSortMutation,useAddNewChannelMutation } = extendedApiSlice;
