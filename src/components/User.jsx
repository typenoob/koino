import { Grid, Typography } from "@mui/material";
import { useGetUserGroupsQuery } from "../services/userSlice";
import { Crown } from "../svgs";
import BootstrapTooltip from "./BootstrapTooltip";
import UserAvatar from "./UserAvatar";
export default function User({ id, username, status, owner = false }) {
  const { data: groups } = useGetUserGroupsQuery(id);
  return (
    <>
      <Grid
        container
        justifyContent="stretch"
        alignItems="center"
        sx={{
          lineHeight: "20px",
        }}
      >
        <Grid item sx={{ marginRight: "12px" }}>
          <UserAvatar
            variant="small"
            status={status}
            color="rgb(59, 165, 92)"
          />
        </Grid>
        <Grid item>
          <Typography
            component="span"
            sx={{
              fontFamily: "primary.fontFamily",
              fontSize: "primary.fontSize",
              fontWeight: "display.fontWeight",
              color: groups ? groups[0]?.color : "rgb(150,152,157)",
            }}
          >
            {username}
          </Typography>
        </Grid>
        {owner && (
          <BootstrapTooltip
            title={"服务器所有者"}
            placement="top"
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -10],
                  },
                },
              ],
            }}
          >
            <Crown
              width="16px"
              style={{ color: "rgb(250, 168, 26)", marginLeft: "3px" }}
            />
          </BootstrapTooltip>
        )}
      </Grid>
    </>
  );
}
