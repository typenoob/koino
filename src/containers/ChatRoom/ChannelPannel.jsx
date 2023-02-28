import {
  Add,
  Close,
  Delete,
  ExpandLess,
  ExpandMore,
  KeyboardArrowDown,
  PersonAddAlt1 as InviteIcon,
  Settings as SettingIcon,
} from "@mui/icons-material";
import {
  Box,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import BootstrapTooltip from "../../components/BootstrapTooltip";
import UserTab from "../../components/UserTab";
import { extendedApiSlice } from "../../services/channelSlice";
import {
  selectServerById,
  useGetServerChannelsQuery,
  useGetServerSortsQuery,
} from "../../services/serverSlice";
import { useDeleteSortMutation } from "../../services/sortSlice";
import { store } from "../../store";
import { Tag } from "../../svgs";
import AddChannel from "../dialogs/AddChannel";
import EditChannel from "../dialogs/EditChannel";
import InviteFriend from "../dialogs/InviteFriend";
import ConfigureServer from "../menu/ConfigureServer";
//TODO: 为成员添加身份组
const mapStateToProps = (state) => ({
  ...state.groupList,
  ...state.channelList,
  ...state.serverList,
  ...state.server,
  ...state.channel,
});
const mapDispatchToProps = (dispatch) => ({
  onUnload: () => dispatch({ type: "CHANNEL_UNLOADED" }),
  onClickAdd: (channel) => dispatch({ type: "ADD_CHANNEL", channel }),
  onClickDelete: (channelId) => dispatch({ type: "DEL_CHANNEL", channelId }), //TODO: 删除时后台同步删除
  onClickAddGroup: (group) => dispatch({ type: "ADD_GROUP", group }),
  onSelectChannel: (channel, messages) =>
    dispatch({ type: "CHANNEL_LOADED", channel, messages }),
});
store.dispatch(extendedApiSlice.endpoints.getChannel.initiate(1));
const ChannelItem = ({ channel }) => {
  const navigate = useNavigate();
  const { serverId, channelId } = useParams();
  const handleChange = (event, newValue) => {
    navigate(`/channels/${serverId}/${newValue}`);
  };
  const [mouseover, setMouseOver] = useState(null); //鼠标在哪个频道上
  const [openInvite, setOpenInvite] = useState(false); //邀请好友对话框打开状态
  const [openEdit, setOpenEdit] = useState(false); //编辑服务器对话框打开状态
  if (!channel) return null;
  else
    return (
      <ListItemButton
        onClick={(event) => handleChange(event, channel?.id)}
        onMouseEnter={() => setMouseOver(channel?.id)}
        onMouseLeave={() => setMouseOver(null)}
        sx={{
          justifyContent: "center",
          pl: 4,
          bgcolor:
            channelId === channel?.id ? "rgb(66, 70, 77)" : "primary.main",
          borderRadius: "4px",
          height: "34px",
          width: "224px",
          margin: "1px auto",
          ":hover": {
            bgcolor: "rgb(66, 70, 77)",
          },
          paddingX: "6px",
        }}
      >
        <Grid
          container
          alignItems="center"
          sx={{
            height: "32px",
          }}
        >
          <Grid item marginRight="6px">
            <BootstrapTooltip
              title="文字信息"
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              }}
            >
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  color: "rgb(142, 146, 151)",
                }}
              >
                <Tag />
              </Box>
            </BootstrapTooltip>
          </Grid>
          <Grid xs item>
            <Typography
              variant="h3"
              sx={{
                margin: 0,
                color:
                  mouseover === channel?.id || channelId === channel?.id
                    ? "white"
                    : "rgb(150,152,157)",
              }}
            >
              {channel?.name}
            </Typography>
          </Grid>
          <Grid item marginLeft="4px">
            <BootstrapTooltip
              title="创建邀请"
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              }}
            >
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenInvite(true);
                  }}
                  sx={{
                    display: "block",
                  }}
                >
                  <InviteIcon
                    sx={{
                      display: "block",
                      width: "16px",
                      height: "16px",
                      color: "rgb(185, 187, 190)",
                      ":hover": { color: "rgb(213, 214, 215)" },
                    }}
                  />
                </IconButton>
                {openInvite && (
                  <InviteFriend
                    open={openInvite}
                    onClose={() => setOpenInvite(false)}
                    channel_name={channel?.name}
                    channel_id={channel?.id}
                  />
                )}
              </>
            </BootstrapTooltip>
          </Grid>
          <Grid item marginLeft="4px">
            <BootstrapTooltip
              title="编辑频道"
              PopperProps={{
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              }}
            >
              <>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenEdit(true);
                    navigate(`/channels/${serverId}/${channel?.id}`);
                  }}
                  sx={{ display: "block" }}
                >
                  <SettingIcon
                    sx={{
                      width: "16px",
                      height: "16px",
                      display: "block",
                      color: "rgb(185, 187, 190)",
                      ":hover": { color: "rgb(213, 214, 215)" },
                    }}
                  />
                </IconButton>
                <EditChannel
                  open={openEdit}
                  onClose={() => setOpenEdit(false)}
                  channel_id={channel?.id}
                />
              </>
            </BootstrapTooltip>
          </Grid>
        </Grid>
      </ListItemButton>
    );
};
const ChannelPannel = ({
  onUnload,
  currentChannel,
  onClickAddGroup,
  onSelectChannel,
}) => {
  const { serverId } = useParams();
  const server = useSelector((state) => selectServerById(state, serverId));
  const { data: channels, isLoading } = useGetServerChannelsQuery(serverId);
  const { data: sorts } = useGetServerSortsQuery(serverId);
  const [open, setOpen] = useState([false, false, false]); //群组打开状态
  const [openAddChannelGroupId, setOpenAddChannelGroupId] = useState(null); //添加频道对话框打开状态
  const [anchorEl, setAnchorEl] = useState(null); // 服务器菜单挂载点
  const [groupId, setGroupId] = useState(null); // 当前群组
  const expandGroup = (index) => {
    const groupId = sorts[index].id;
    if (currentChannel && currentChannel.groupId === groupId) {
      return;
    } //如果当前频道在该群组中，不折叠
    setGroupId(groupId);
    setOpen(open.map((item, _index) => (index === _index ? !item : item)));
  }; //展开群组，展示频道信息
  useEffect(() => {}, [channels, onSelectChannel, onUnload, server]); // channelId变化时更新redux
  const [deleteSort] = useDeleteSortMutation();
  const serverHeader = useRef("");
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "primary.main",
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        userSelect: "none",
      }}
    >
      <Box
        ref={serverHeader}
        sx={{
          display: "flex",
          height: "48px",
          padding: "12px 16px",
          justifyContent: "space-between",
          boxSizing: "border-box",
          boxShadow:
            "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
          zIndex: 1,
          position: "relative",
          cursor: "pointer",
          ":hover": {
            bgcolor: "rgb(60, 63, 69)",
          },
          bgcolor: Boolean(anchorEl) ? "rgb(60, 63, 69)" : "inherit",
        }}
      >
        <Typography
          variant="primary"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "text.primary",
          }}
        >
          {server?.name || "未选择服务器"}
        </Typography>

        <IconButton
          onClick={() => {
            setAnchorEl(serverHeader.current);
          }}
          sx={{ color: "white_500" }}
        >
          {Boolean(anchorEl) ? (
            <Close
              sx={{ height: "100%", width: "100%", transform: "scale(0.8)" }}
            />
          ) : (
            <KeyboardArrowDown sx={{ height: "100%", width: "100%" }} />
          )}
        </IconButton>
        <ConfigureServer
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          server_name={server?.name}
        ></ConfigureServer>
      </Box>
      <List
        className="scrollable"
        sx={{
          width: "100%",
          bgcolor: "primary.main",
          height: "calc(100% - 48px)",
          overflowY: "auto",
          boxSizing: "border-box",
          padding: "0px",
          marginBottom: "52px",
          color: "text.neglect",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {/*群组标签 */}
        {sorts?.map((sort, index) => (
          <Box key={index}>
            <ListItemButton
              onClick={() => expandGroup(index)}
              sx={{
                ":hover": {
                  color: "white",
                },
                height: 40,
                padding: "16px 0px 0px 0px",
              }}
            >
              {open[index] ? (
                <ExpandLess
                  sx={{
                    paddingLeft: "4px",
                    paddingRight: "5px",
                    height: 12,
                    width: 12,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    paddingLeft: "4px",
                    paddingRight: "5px",
                    height: 12,
                    width: 12,
                  }}
                />
              )}
              <ListItemText
                primary={<Typography variant="h4">{sort.name}</Typography>}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSort(sort?.id);
                }}
              >
                <Delete
                  sx={{
                    width: "18px",
                    height: "18px",
                    paddingRight: "5px",
                    color: "text.neglect",
                    ":hover": {
                      color: "text.primary",
                    },
                  }}
                />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenAddChannelGroupId(sort.id);
                }}
              >
                <Add
                  sx={{
                    width: "18px",
                    height: "18px",
                    paddingRight: "5px",
                    color: "text.neglect",
                    ":hover": {
                      color: "text.primary",
                    },
                  }}
                />
              </IconButton>
            </ListItemButton>
            {openAddChannelGroupId && (
              <AddChannel
                open={openAddChannelGroupId === sort.id}
                onClose={() => setOpenAddChannelGroupId(null)}
                sort_name={sort.name}
                sort_id={sort.id}
              />
            )}

            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {channels
                  ?.filter((channel) => channel.sort.id === sort?.id)
                  .map((channel) => {
                    return <ChannelItem key={channel?.id} channel={channel} />;
                  })}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
      <UserTab />
    </Box>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPannel);
