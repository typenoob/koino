import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCreateInviteCodeMutation } from "../../services/serverSlice";
import { Square, SquareChecked, Tag } from "../../svgs";
const getRandomString = (length) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};
const InviteFriend = (props) => {
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState(false);
  const [createInvite] = useCreateInviteCodeMutation();
  const [value] = useState(getRandomString(8));
  const { serverId } = useParams();
  useEffect(() => {
    createInvite({ serverId, body: { userId: 1, code: value } });
  }, []);
  return (
    <Dialog
      {...props}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "rgb(54, 57, 63)",
          borderRadius: "10px",
          position: "relative",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
      }}
    >
      <IconButton
        onClick={props.onClose}
        sx={{
          color: "rgb(119, 122, 127)",
          ":hover": {
            color: "rgb(220, 221, 222)",
          },
        }}
      >
        <Close
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            width: "24px",
            height: "24px",
          }}
        />
      </IconButton>
      <DialogTitle sx={{ padding: "16px", height: "51px" }}>
        <Typography variant="dialogTitle1">
          邀请朋友加入
          <Typography variant="primary">coyote的服务器</Typography>
        </Typography>
        <Grid
          container
          direction="row"
          alignItems="center"
          columnGap="8px"
          sx={{
            color: "rgb(185, 187, 190)",
            marginTop: "-6px",
          }}
        >
          <Grid item sx={{ width: "20px", height: "20px" }}>
            <Tag />
          </Grid>
          <Grid item sx={{ typography: "body6" }}>
            {props.channel_name}
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent className="scrollable" sx={{ padding: "0px 16px" }}>
        <Typography
          variant="body5"
          component="div"
          sx={{
            color: "rgb(185, 187, 190)",
            marginTop: "6px",
            marginBottom: "12px",
          }}
        >
          分享此链接以邀请其他人来您的服务器！
        </Typography>
        <TextField
          variant="standard"
          value={value}
          InputProps={{
            disableUnderline: true,
            sx: {
              alignItems: "center",
            },
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(value);
                    setTimeout(() => {
                      setCopied(false);
                    }, 1000);
                  }}
                  sx={{
                    bgcolor: copied ? "rgb(33, 91, 50)" : "rgb(88, 101, 242)",
                    ":hover": {
                      bgcolor: copied ? "rgb(33, 91, 50)" : "rgb(88, 101, 242)",
                    },
                    width: "75px",
                    height: "32px",
                    borderRadius: 1,
                    typography: "body3",
                    color: "rgb(255,255,255)",
                  }}
                >
                  {copied ? "已复制" : "复制"}
                </Button>
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: 1,
            bgcolor: "rgb(32, 34, 37)",
            width: "408px",
            height: "20px",
            padding: "10px",
            marginBottom: "8px",
            "& .MuiInputBase-input": {
              padding: 0,
              typography: "body6",
              color: "rgb(220, 221, 222)",
            },
          }}
        ></TextField>
        <Typography
          varaint="body5"
          sx={{
            color: "rgb(185, 187, 190)",
            marginBottom: "20px",
            maxWidth: 428,
          }}
        >
          您的邀请链接将在7天后过期。
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: "rgb(47, 49, 54)",
          height: "38px",
          padding: "16px",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={() => setChecked(!checked)}
          sx={{ color: "rgb(114, 118, 125)" }}
        >
          {checked ? <SquareChecked color="rgb(88, 101, 242)" /> : <Square />}

          <Typography
            variant="body5"
            color="rgb(180, 182, 185)"
            marginLeft="8px"
          >
            设置链接为永不过期
          </Typography>
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
export default InviteFriend;
