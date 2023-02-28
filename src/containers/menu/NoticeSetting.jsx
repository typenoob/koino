import {
  ChevronRight,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Grid, Menu, MenuItem, Popover } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import useHover from "../../utils/useHover";
import EditUser from "../dialogs/EditUser";
const CustomMenuItem = ({ divider, onClick, text, more, checked }) => {
  const [hoverRef, isHovered] = useHover();
  const [openMore, setOpenMore] = useState(false);
  return (
    <MenuItem
      ref={hoverRef}
      divider={divider}
      onMouseEnter={() => more && setOpenMore(true)}
      onMouseLeave={() => more && setOpenMore(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Popover
        open={openMore}
        anchorEl={hoverRef.current}
        onClose={() => setOpenMore(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 3,
          horizontal: -10,
        }}
        color="transparent"
        PaperProps={{
          onMouseEnter: () => setOpenMore(true),
          onMouseLeave: () => setOpenMore(false),
        }}
        sx={{
          pointerEvents: "none",
          ".MuiPopover-paper": {
            bgcolor: "transparent",
            pointerEvents: "auto",
          },
        }}
      >
        <Grid
          container
          alignItems="center"
          direction="column"
          sx={{
            bgcolor: "rgb(24, 25, 28)",
            padding: "6px 8px",
            borderRadius: 0.5,
            cursor: "pointer",
            "& .MuiGrid-item": {
              typography: "body3",
              borderRadius: 0.5,
              width: 172,
              height: 32,
              padding: "6px 8px",
              color: "rgb(185,187,190)",
              ":hover": {
                bgcolor: "rgb(71, 82, 196)",
                color: "white",
              },
            },
          }}
        >
          <Grid item>持续15分钟</Grid>
          <Grid item>持续1小时</Grid>
          <Grid item>持续3小时</Grid>
          <Grid item>持续8小时</Grid>
          <Grid item>持续24小时</Grid>
          <Grid item>直到我再次开启</Grid>
        </Grid>
      </Popover>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{
          width: 172,
          height: 32,
          padding: "6px 8px",
          color: isHovered && "white",
        }}
      >
        {text}
        <Grid item style={{ width: 18, height: 18 }}>
          {more ? (
            <ChevronRight sx={{ width: "18px", height: "18px" }} />
          ) : checked ? (
            <RadioButtonChecked
              sx={{
                color: isHovered ? "white" : "rgb(88, 101, 242)",
                width: "18px",
                height: "18px",
              }}
            />
          ) : (
            <RadioButtonUnchecked
              sx={{
                color: isHovered ? "white" : "rgb(185, 187, 190)",
                width: "18px",
                height: "18px",
              }}
            />
          )}
        </Grid>
      </Grid>
    </MenuItem>
  );
};
const NoticeSetting = ({ anchorEl, onClose, me = false, ...props }) => {
  const [checked, setChecked] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const muteChannel = true;

  const { serverId } = useParams();
  const menu = [
    {
      text: muteChannel ? "取消频道静音" : "静音频道",
      more: true,
      divider: true,
    },
    { text: "所有消息", action: () => setSelectedItem(1) },
    { text: "仅@被提及", action: () => setSelectedItem(2) },
    { text: "无通知", action: () => setSelectedItem(3) },
  ];

  return (
    <>
      <Menu
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: -8,
          horizontal: "right",
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
            color: "rgb(185, 187, 190)",
            padding: 0,
            margin: "2px 0",
            ":hover": {
              bgcolor: "rgb(71, 82, 196)",
            },
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

        {menu.map((item, index) => (
          <CustomMenuItem
            key={index}
            text={item.text}
            divider={item.divider}
            onClick={item.action}
            more={item.more}
            checked={index === selectedItem}
          />
        ))}
      </Menu>
    </>
  );
};
export default NoticeSetting;
