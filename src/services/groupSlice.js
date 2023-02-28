import { apiSlice } from "./apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGroupUsers: builder.query({
      query: (groupId) => `/groups/${groupId}/users`,
      providesTags: ["user", "group"],
    }),
  }),
});

export const { useGetGroupUsersQuery } = extendedApiSlice;
