import { Delete } from "@mui/icons-material";
import { Grid, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { useGetChannelQuery } from "../../services/channelSlice";
import {
  Invite,
  Notifications,
  Pencil,
  PlusDir,
  PlusRound,
  Setting,
  Square,
  SquareChecked,
} from "../../svgs";
import AddChannel from "../dialogs/AddChannel";
import AddSort from "../dialogs/AddSort";
import EditServer from "../dialogs/EditServer";
import EditUser from "../dialogs/EditUser";
import InviteFriend from "../dialogs/InviteFriend";
import SetNotification from "../dialogs/SetNotification";
const CustomMenuItem = (props) => (
  <MenuItem
    divider={props.divider}
    onClick={(e) => {
      props.stay && e.stopPropagation();
      props.onClick();
    }}
  >
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: 204,
        height: 32,
        padding: "6px 8px",
        color: props.important ? "rgb(240, 71, 71)" : "inherent",
      }}
    >
      {props.text}
      <Grid item style={{ width: 18, height: 18 }}>
        {props.icon}
      </Grid>
    </Grid>
  </MenuItem>
);
const ConfigureServer = (props) => {
  const [openAddChannel, setOpenAddChannel] = useState(false);
  const [openAddSort, setOpenAddSort] = useState(false);
  const [openInviteFriend, setOpenInviteFriend] = useState(false);
  const [openEditServer, setOpenEditServer] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [checked, setChecked] = useState(false);
  const { serverId, channelId } = useParams();
  const { data: channel } = useGetChannelQuery(channelId);
  return (
    <>
      {openInviteFriend && (
        <InviteFriend
          open={openInviteFriend}
          onClose={() => setOpenInviteFriend(false)}
        />
      )}
      {openEditServer && (
        <EditServer
          server_name={props.server_name}
          open={openEditServer}
          onClose={() => setOpenEditServer(false)}
        />
      )}
      {openAddChannel && (
        <AddChannel
          open={openAddChannel}
          onClose={() => setOpenAddChannel(false)}
          sort_name={channel?.sort.name}
          sort_id={channel?.sort.id}
        />
      )}

      {openAddSort && (
        <AddSort open={openAddSort} onClose={() => setOpenAddSort(false)} />
      )}
      {openNotification && (
        <SetNotification
          open={openNotification}
          onClose={() => setOpenNotification(false)}
        />
      )}
      {openEditUser && (
        <EditUser
          serverProfile
          open={openEditUser}
          onClose={() => setOpenEditUser(false)}
        />
      )}
      <Menu
        id="demo-customized-menu"
        open={Boolean(props.anchorEl)}
        anchorOrigin={{
          vertical: 34,
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        {...props}
        onClick={props.onClose}
        sx={{
          "& .MuiMenu-paper": {
            bgcolor: "rgb(24, 25, 28)",
            padding: "0 8px",
          },
          "& .MuiMenuItem-root": {
            typography: "body3",
            borderRadius: 0.5,
            color: "rgb(185, 187, 190)",
            padding: 0,
            margin: "2px 0",
            ":hover": {
              bgcolor: "rgb(71, 82, 196)",
            },
          },
        }}
      >
        <CustomMenuItem
          text="邀请其他人"
          divider
          icon={<Invite />}
          onClick={() => setOpenInviteFriend(true)}
        />
        <CustomMenuItem
          text="服务器设置"
          icon={<Setting />}
          onClick={() => setOpenEditServer(true)}
        />
        <CustomMenuItem
          text="创建频道"
          icon={<PlusRound />}
          onClick={() => setOpenAddChannel(true)}
        />
        <CustomMenuItem
          text="创建类别"
          divider
          icon={<PlusDir />}
          onClick={() => setOpenAddSort(true)}
        />
        <CustomMenuItem
          text="通知设定"
          divider
          icon={<Notifications />}
          onClick={() => setOpenNotification(true)}
        />
        <CustomMenuItem
          text="编辑服务器个人资料"
          icon={<Pencil />}
          onClick={() => setOpenEditUser(true)}
        />
        <CustomMenuItem
          onClick={() => setChecked(!checked)}
          text="隐藏已静音的频道"
          divider
          icon={
            checked ? <SquareChecked color="rgb(88, 101, 242)" /> : <Square />
          }
          stay
        />
        <CustomMenuItem
          text="删除服务器"
          important
          icon={
            <Delete
              sx={{ width: "100%", height: "100%", color: "rgb(240, 71, 71)" }}
            />
          }
          onClick={() => console.log(`delete server ${serverId}`)}
        />
      </Menu>
    </>
  );
};
export default ConfigureServer;
