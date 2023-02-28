import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import BootstrapTooltip from "./BootstrapTooltip";
export default function SvgWrapper({ tooltip, svg, enable, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <BootstrapTooltip
      title={tooltip}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -3],
            },
          },
        ],
      }}
    >
      <IconButton
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        sx={{
          display: "block",
          color: enable
            ? "rgb(255,255,255)"
            : hover
            ? "rgb(200,201,202)"
            : "rgb(185,187,190)",
        }}
        onClick={onClick}
      >
        <Box
          sx={{
            width: "24px",
            height: "24px",
          }}
        >
          {svg}
        </Box>
      </IconButton>
    </BootstrapTooltip>
  );
}
SvgWrapper.defaultProps = { enable: false };
