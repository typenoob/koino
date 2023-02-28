import { Grid } from "@mui/material";
import { useState } from "react";
import ChannelPannel from "./ChannelPannel";
import MemberPannel from "./MemberPannel";
import MessageScreen from "./MessageScreen";
import SearchBar from "./SearchBar";
import ServerTab from "./ServerTab";
//TODO 用redux管理当前的频道
const ChatRoom = () => {
  const [hideMemberPanel, setHideMemberPanel] = useState(false);
  const [channelName, setChannelName] = useState(null);
  //TODO: 成员右键管理
  return (
    <Grid container wrap="nowrap" sx={{ height: "100%" }} >
      <Grid
        item
        sx={{ height: "100%", width: "72px", flexShrink: 0, bgcolor: "blue" }}
      >
        <ServerTab />
      </Grid>
      <Grid
        item
        sx={{ height: "100%", width: "240px", flexShrink: 0, bgcolor: "gray" }}
      >
        <ChannelPannel />
      </Grid>
      <Grid
        container
        wrap="nowrap"
        direction="column"
        item
        sx={{ bgcolor: "red", height: "100%", minWidth: 0, flexGrow: 1 }}
      >
        <Grid
          item
          sx={{
            height: "48px",
            width: "100%",
            bgcolor: "yellow",
            flexShrink: 0,
          }}
        >
          <SearchBar
            onUserPannelCollapse={() => setHideMemberPanel(!hideMemberPanel)}
            userPannelCollapse={hideMemberPanel}
            name={"123"}
          />
        </Grid>
        <Grid item container sx={{ minHeight: 0, minWidth: 0, flexGrow: 1 }}>
          <Grid item sx={{ minWidth: 0, height: "100%", flexGrow: 1 }}>
            <MessageScreen/>
          </Grid>
          <Grid
            item
            sx={{
              bgcolor: "rgb(47,49,54)",
              display: hideMemberPanel ? "none" : "block",
              width: "240px",
              height: "100%",
            }}
          >
            <MemberPannel />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ChatRoom;
