// 从特定于 React 的入口点导入 RTK Query 方法
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// 定义我们的单个 API Slice 对象
export const apiSlice = createApi({
  tagTypes: ["sort", "channel", "invite","server","user","group","message"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  // “endpoints” 代表对该服务器的操作和请求
  endpoints: (builder) => ({
  }),
});


