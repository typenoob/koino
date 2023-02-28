import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChannel: builder.query({
      query: (channelId) => `/channels/${channelId}`,
      providesTags: ["channel"],
    }),
    getAccessUsers: builder.query({
      query: (channelId) => `/channels/${channelId}/access/users`,
      providesTags: ["channel"],
    }),
    addAccessUsers: builder.mutation({
      query: ({ channelId, body }) => ({
        url: `/channels/${channelId}/access/users`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["channel"],
    }),
    deleteAccessUsers: builder.mutation({
      query: ({ channelId, userId }) => ({
        url: `/channels/${channelId}/access/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["channel"],
    }),
    deleteAccessGroups: builder.mutation({
      query: ({ channelId, groupId }) => ({
        url: `/channels/${channelId}/access/groups/${groupId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["channel"],
    }),
    addAccessGroups: builder.mutation({
      query: ({ channelId, body }) => ({
        url: `/channels/${channelId}/access/groups`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["channel"],
    }),
    getAccessGroups: builder.query({
      query: (channelId) => `/channels/${channelId}/access/groups`,
      providesTags: ["channel"],
    }),
    deleteChannel: builder.mutation({
      query: (channelId) => ({
        url: `/channels/${channelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["channel"],
    }),
    editChannel: builder.mutation({
      query: ({ channelId, body }) => ({
        url: `/channels/${channelId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["channel"],
    }),
  }),
});

export const {
  useGetChannelQuery,
  useDeleteChannelMutation,
  useGetAccessGroupsQuery,
  useGetAccessUsersQuery,
  useDeleteAccessGroupsMutation,
  useDeleteAccessUsersMutation,
  useAddAccessGroupsMutation,
  useAddAccessUsersMutation,
  useEditChannelMutation,
} = extendedApiSlice;
