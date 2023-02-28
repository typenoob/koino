import { Tab, Avatar } from "@mui/material";
const ServerTabItem = (props) => {
  const { decoration, icon, bgcolor, ...newProps } = props;
  return (
    <Tab
      {...newProps}
      sx={{
        minWidth: "100%",
        height: "48px",
        marginBottom: "8px",
        minHeight: "100%",
        "& .MuiAvatar-root": {
          transition: "all .15s ease-out,color .15s ease-out",
          borderRadius: decoration ? 4 : "50%",
          bgcolor: decoration ? bgcolor : "quaternary",
        },

        "& .MuiAvatar-root:hover": {
          borderRadius: 4,
          bgcolor: bgcolor,
        },
      }}
      icon={
        <Avatar
          sx={{
            bgcolor: "#36393f",
            color: "#3a9759",
            height: "48px",
            width: "48px",
            ":hover": {
              color: "rgb(255,255,255)",
            },
          }}
        >
          {icon}
        </Avatar>
      }
    ></Tab>
  );
};
ServerTabItem.defaultProps = {
  decoration: false,
  bgcolor: "rgb(88, 101, 242)",
};
ServerTabItem.muiName = Tab.muiName;
export default ServerTabItem;
