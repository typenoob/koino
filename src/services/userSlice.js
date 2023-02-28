import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/users`,
      providesTags: ["user", "group"],
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ["user", "group"],
    }),
    getCurrentUser: builder.query({
      query: () => `/users/me`,
    }),
    getUserGroups: builder.query({
      query: (userId) => `/users/${userId}/groups`,
      providesTags: ["user", "group"],
    }),
    addGroupToUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/group`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["group"],
    }),
    delelteGroupToUser: builder.mutation({
      query: ({ userId, body }) => ({
        url: `/users/${userId}/group`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["group"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetCurrentUserQuery,
  useGetUserGroupsQuery,
  useAddGroupToUserMutation,
  useDelelteGroupToUserMutation,
} = extendedApiSlice;
