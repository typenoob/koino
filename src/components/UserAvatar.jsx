import {
  Brightness2 as Idle,
  Circle as Online,
  DoDisturbOn as DND,
  RadioButtonChecked as Offline,
} from "@mui/icons-material";
import { Avatar, Badge } from "@mui/material";
import { logo } from "../svgs";
function badgeContent(status, variant) {
  const size = variant === "large" ? "16px" : "10px";
  switch (status) {
    case "online":
      return (
        <Online
          sx={{
            width: size,
            height: size,
            color: "rgb(59, 165, 92)",
          }}
        />
      );
    case "idle":
      return (
        <Idle
          sx={{
            width: size,
            height: size,
            transform: "rotate(45deg)",
            color: "rgb(250, 166, 26)",
          }}
        />
      );
    case "dnd":
      return (
        <DND
          sx={{
            width: size,
            height: size,
            color: "rgb(237, 66, 69)",
          }}
        />
      );
    case "offline":
      return (
        <Offline
          sx={{
            width: size,
            height: size,
            color: "rgb(116, 127, 141)",
          }}
        />
      );
    default:
      return (
        <Online
          sx={{
            width: size,
            height: size,
            color: "rgb(59, 165, 92)",
          }}
        />
      );
  }
}
export default function UserAvatar({ status, src, color, variant }) {
  return (
    <>
      <Badge
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        overlap="circular"
        color="primary"
        badgeContent={status === "在线" ? badgeContent(status, variant) : null}
        sx={{
          height: variant === "large" ? "80px" : "32px",
          width: variant === "large" ? "80px" : "32px",
          "& .MuiBadge-badge": {
            minWidth: "15px",
            height: "15px",
            padding: 0,
          },
        }}
      >
        <Avatar
          sx={{
            height: "100%",
            width: "100%",
            bgcolor: color,
            "& .MuiAvatar-img": { transform: "scale(0.6)" },
          }}
          alt="logo"
          src={src ? src : logo}
        />
      </Badge>
    </>
  );
}
