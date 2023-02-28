import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
const serversAdapter = createEntityAdapter();
const initialState = serversAdapter.getInitialState();
export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServers: builder.query({
      query: () => "/servers",
      transformResponse: (res) => {
        return serversAdapter.setAll(initialState, res);
      },
      providesTags: ["server"],
    }),
    getServer: builder.query({
      query: (serverId) => `/servers/${serverId}`,
      providesTags: ["server"],
    }),
    getServerChannels: builder.query({
      query: (serverId) => `/servers/${serverId}/channels`,
      providesTags: ["channel"],
    }),
    getServerSorts: builder.query({
      query: (serverId) => `/servers/${serverId}/sorts`,
      providesTags: ["sort"],
    }),
    addNewSorts: builder.mutation({
      query: ({ serverId, body }) => ({
        url: `/servers/${serverId}/sort`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["sort"],
    }),
    getServerUsers: builder.query({
      query: ({ serverId, online }) =>
        `/servers/${serverId}/users?online=${online}&filter=true`,
      providesTags: ["user","group"],
    }),
    getAllServerUsers: builder.query({
      query: (serverId) => `/servers/${serverId}/users`,
      providesTags: ["user","group"],
    }),
    getServerGroups: builder.query({
      query: ({ serverId, split }) =>
        `/servers/${serverId}/groups?split=${split}`,
      invalidatesTags: ["group"],
    }),
    getAllServerGroups: builder.query({
      query: (serverId) => `/servers/${serverId}/groups`,
      invalidatesTags: ["group"],
    }),
    getServerGroup: builder.query({
      query: ({ serverId, groupId }) =>
        `/servers/${serverId}/groups/${groupId}`,
    }),
    getServerInvites: builder.query({
      query: (serverId) => `/servers/${serverId}/invites`,
      providesTags: ["invite"],
    }),
    createInviteCode: builder.mutation({
      query: ({ serverId, body }) => ({
        url: `/servers/${serverId}/invites`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["invite"],
    }),
    editServer: builder.mutation({
      query: ({ serverId, body }) => ({
        url: `/servers/${serverId}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["server"],
    }),
  }),
});

export const {
  useGetServersQuery,
  useGetServerQuery,
  useGetServerUsersQuery,
  useGetServerGroupsQuery,
  useGetServerGroupQuery,
  useGetServerChannelsQuery,
  useGetServerSortsQuery,
  useAddNewSortsMutation,
  useGetAllServerGroupsQuery,
  useGetAllServerUsersQuery,
  useGetServerInvitesQuery,
  useCreateInviteCodeMutation,
  useEditServerMutation,
} = extendedApiSlice;

export const selectServersResult =
  extendedApiSlice.endpoints.getServers.select();
const selectServersData = createSelector(
  selectServersResult,
  (serversResult) => serversResult.data
);
export const { selectAll: selectAllServers, selectById: selectServerById } =
  serversAdapter.getSelectors(
    (state) => selectServersData(state) ?? initialState
  );
