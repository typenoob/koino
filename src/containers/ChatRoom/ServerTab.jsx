import { Add, Mail } from "@mui/icons-material";
import { Divider, Icon, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TabItem from "../../components/ServerTabItem";
import {
  selectAllServers,
  useGetServersQuery,
} from "../../services/serverSlice";
const mapStateToProps = (state) => ({
  ...state.serverList,
  ...state.server,
});
const mapDispatchToProps = (dispatch) => ({
  onLoad: (servers) => dispatch({ type: "PAGE_LOADED", servers }),
  onUnload: () => dispatch({ type: "PAGE_UNLOADED" }),
  onSelectServer: (server, groups, channels, members) =>
    dispatch({ type: "SERVER_LOADED", server, groups, channels, members }),
});
const TabDivider = () => (
  <Tab
    icon={
      <Divider
        variant={"middle"}
        sx={{ width: "57%", bgcolor: "#36393f", borderBottomWidth: 3 }}
      />
    }
    sx={{
      height: "5px",
      marginBottom: "8px",
      minHeight: "100%",
      padding: 0,
      minWidth: "100%",
    }}
    disabled
  />
);

const ServerTab = (props) => {
  const [value, setValue] = useState(0);
  const { onLoad, onUnload, onSelectServer, currentServer } = props;
  const { isSuccess, data } = useGetServersQuery();
  const servers = useSelector(selectAllServers);
  const { serverId } = useParams(); // 当前所在的服务器ID
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    navigate(`/channels/${newValue.id}/${123}`);
  };
  return (
    <Tabs
      TabIndicatorProps={{ style: { display: "none" } }}
      TabScrollButtonProps={{ style: { display: "none" } }}
      orientation="vertical"
      value={value}
      className="scrollable"
      onChange={handleChange}
      aria-label="ServerTab"
      variant="scrollable"
      sx={{
        boxSizing: "border-box",
        paddingTop: "12px",
        bgcolor: "secondary.main",
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <TabItem
        bgcolor="rgb(88, 101, 242)"
        icon={
          <Mail
            sx={{
              color: "rgb(220, 221, 222)",
            }}
          />
        }
      />
      <TabDivider />
      {servers?.map((server, index) => (
        <TabItem
          key={index}
          value={server}
          decoration={server.id === serverId}
          icon={
            <Icon
              sx={{
                color: "rgb(255,255,255)",
                typography: "body3",
              }}
            >
              {server.name}
            </Icon>
          }
        />
      ))}
      <TabDivider />
      <TabItem bgcolor="rgb(59, 165, 93)" icon={<Add />} />
    </Tabs>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ServerTab);
