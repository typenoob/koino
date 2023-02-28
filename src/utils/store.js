import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "./redux/channel";

export default configureStore({
  reducer: {
    channel: channelReducer,
  },
});
