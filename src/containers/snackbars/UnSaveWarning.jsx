import { Button, Slide, Snackbar, Typography } from "@mui/material";
const UnSaveWarning = (props) => {
  const { onReset, onSave, ...other } = props;
  return (
    <Snackbar
      {...other}
      TransitionComponent={Slide}
      message={
        <Typography
          variant="dialogTitle1"
          color="rgb(220, 221, 222)"
          marginRight="100px"
        >
          注意！ 您尚未保存更改
        </Typography>
      }
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      action={
        <>
          <Button
            color="secondary"
            size="small"
            onClick={props.onReset}
            sx={{
              typography: "body3",
              color: "rgb(220, 221, 222)",
              textDecoration: "underline",
              marginLeft: "10px",
              width: "60px",
              height: "32px",
            }}
          >
            重置
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={props.onSave}
            sx={{
              typography: "body3",
              color: "white",
              bgcolor: "rgb(45, 125, 70)",
              marginLeft: "10px",
              width: "88px",
              height: "32px",
            }}
          >
            保存更改
          </Button>
        </>
      }
      ContentProps={{
        className: "unsave-warning",
      }}
      sx={{
        "& .MuiSnackbarContent-root": {
          width: "668px",
          height: "40px",
          bgcolor: "rgb(24, 25, 28)",
          alignItems: "center",
        },
      }}
    />
  );
};
export default UnSaveWarning;
