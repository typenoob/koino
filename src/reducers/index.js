import { combineReducers } from "redux";
import { apiSlice } from "../services/apiSlice";
import channel from "./channel";
import channelList from "./channelList";
import groupList from "./groupList";
import memberList from "./memberList";
import messageList from "./messageList";
import server from "./server";
import serverList from "./serverList";
export default combineReducers({
  channelList,
  groupList,
  serverList,
  messageList,
  memberList,
  server,
  channel,
  [apiSlice.reducerPath]: apiSlice.reducer,
});
