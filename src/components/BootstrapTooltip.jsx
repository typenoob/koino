import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { tooltipClasses } from "@mui/material/Tooltip";
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
export default BootstrapTooltip;
