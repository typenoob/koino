import { Settings } from "@mui/icons-material";
import { Grid, Popover } from "@mui/material";
import { useState } from "react";
import EditUser from "../containers/dialogs/EditUser";
import { useGetCurrentUserQuery } from "../services/userSlice";
import UserAvatar from "./UserAvatar";
import UserCard from "./UserCard";
export default function UserTab() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openEditUser, setOpenEditUser] = useState(false);
  const { data: user } = useGetCurrentUserQuery();
  return (
    <Grid
      container
      sx={{
        position: "absolute",
        bottom: 0,
        height: "52px",
        padding: "0 8px",
        bgcolor: "rgb(41, 43, 47)",
      }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: -12,
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          ".MuiPopover-paper": {
            bgcolor: "transparent",
          },
        }}
      >
        <UserCard user={user} self />
      </Popover>
      <Grid
        onClick={(event) => setAnchorEl(event.currentTarget)}
        item
        sx={{
          width: "120px",
          height: "39px",
          cursor: "pointer",
          ":hover": {
            bgcolor: "rgb(60, 64, 71)",
            borderRadius: 1,
          },
        }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <UserAvatar variant="small" color="rgb(59, 165, 92)" />
          </Grid>
          <Grid item sx={{ paddingLeft: "8px" }}>
            <Grid container direction="column">
              <Grid
                item
                sx={{
                  typography: "username2",
                  color: "rgb(255, 255, 255)",
                  display: "inline-flex",
                }}
              >
                {user?.username}
              </Grid>
              <Grid
                item
                sx={{
                  typography: "body1",
                  color: "rgb(165, 167, 170)",
                  display: "inline-flex",
                }}
              >
                {user?.discriminator}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          width: "32px",
          height: "32px",
          display: "flex",
          cursor: "pointer",
          ":hover": {
            bgcolor: "rgb(60, 64, 71)",
            borderRadius: 1,
          },
        }}
        alignItems="center"
      >
        <EditUser open={openEditUser} onClose={() => setOpenEditUser(false)} />
        <Settings
          onClick={() => setOpenEditUser(true)}
          sx={{ width: "20px", height: "20px", margin: "auto" }}
        />
      </Grid>
    </Grid>
  );
}
