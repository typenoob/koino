import { SvgIcon } from "@mui/material";
import { Logo, Shield } from "../svgs";
const IdentityAvatar = ({ color, admin, group, root, people }) => {
  return (
    <SvgIcon
      viewBox="0 0 20 23"
      sx={{
        display: "flex",
        width: "24px",
        height: "24px",
        color: color,
      }}
    >
      {((admin || group) && <Shield />) ||
        ((root || people) && (
          <g>
            <circle cx="10" cy="11.5" r="10"></circle>
            <svg x="3.85" preserveAspectRatio="xMidYMid" width="12px">
              <Logo />
            </svg>
          </g>
        ))}
    </SvgIcon>
  );
};
export default IdentityAvatar;
