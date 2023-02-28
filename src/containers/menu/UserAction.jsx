import { Grid, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import EditUser from "../dialogs/EditUser";
const CustomMenuItem = (props) => (
  <MenuItem
    divider={props.divider}
    onClick={(e) => {
      e.stopPropagation();
      props.onClick();
    }}
  >
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: 172,
        height: 32,
        padding: "6px 8px",
        color: props.important ? "rgb(240, 71, 71)" : "rgb(185, 187, 190)",
        ":hover": {
          bgcolor: props.important ? "rgb(240, 71, 71)" : "rgb(71, 82, 196)",
          color: "white",
        },
      }}
    >
      {props.text}
    </Grid>
  </MenuItem>
);
const UserAction = ({ anchorEl, onClose, me = false, ...props }) => {
  const [checked, setChecked] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const { serverId } = useParams();
  const menu = [
    { text: "提及", show: true, divider: true },
    {
      text: "编辑服务器个人资料",
      show: me,
      divider: true,
      action: () => setOpenEditUser(true),
    },
    { text: "修改昵称", show: !me, divider: true },
    { text: "禁言coyote", show: !me, important: true },
    { text: "踢除coyote", show: !me, important: true },
    { text: "封锁coyote", show: !me, important: true, divider: true },
  ];
  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 34,
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        {...props}
        onClick={onClose}
        sx={{
          "& .MuiMenu-paper": {
            bgcolor: "rgb(24, 25, 28)",
            padding: "0 8px",
          },
          "& .MuiMenuItem-root": {
            typography: "body3",
            borderRadius: 0.5,
            padding: 0,
            margin: "2px 0",
          },
        }}
      >
        {openEditUser && (
          <EditUser
            serverProfile
            open={openEditUser}
            onClose={() => setOpenEditUser(false)}
          />
        )}
        {menu.map(
          (item, index) =>
            item.show && (
              <CustomMenuItem
                key={index}
                text={item.text}
                important={item.important}
                divider={item.divider}
                onClick={item.action}
              />
            )
        )}
      </Menu>
    </>
  );
};
export default UserAction;
