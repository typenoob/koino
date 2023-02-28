import { Close } from "@mui/icons-material";
import {
  Box,
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
import { useState } from "react";
import PrivateSwitch from "../../components/PrivateSwitch";
import { useAddNewChannelMutation } from "../../services/sortSlice";
import { RadioButtonOn, Tag } from "../../svgs";
const TextChannel = () => (
  <Grid
    container
    sx={{
      width: "404px",
      height: "42px",
      padding: "10px 12px",
      bgcolor: "rgb(69, 73, 80)",
      boxSizing: "content-box",
      borderRadius: 1,
      cursor: "pointer",
      marginBottom: "20px",
    }}
    justifyContent="space-between"
    alignItems="center"
  >
    <Grid item sx={{ height: "100%" }}>
      <Grid
        container
        sx={{ height: "100%" }}
        columnGap="12px"
        alignItems="center"
      >
        <Grid
          item
          sx={{
            width: "24px",
            height: "24px",
            color: "rgb(181, 182, 185)",
          }}
        >
          <Tag />
        </Grid>
        <Grid item sx={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            sx={{ height: "100%" }}
            justifyContent="space-between"
          >
            <Grid item>
              <Typography
                component="div"
                variant="body7"
                sx={{ color: "rgb(220,221,222)" }}
              >
                Text
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component="div"
                variant="body5"
                sx={{ color: "rgb(185, 187, 190)" }}
              >
                发送消息、图片、表情符号
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <Grid item>
      <Box sx={{ width: "24px", height: "24px" }}>
        <RadioButtonOn />
      </Box>
    </Grid>
  </Grid>
);
const AddChannel = ({ sort_id, sort_name, ...props }) => {
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [addNewChannel,{isLoading}] = useAddNewChannelMutation();
  return (
    <Dialog
      {...props}
      onClose={(event) => {
        props.onClose(event);
      }}
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
        onClick={(e) => props.onClose()}
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
      <DialogTitle sx={{ padding: "16px", height: "48px" }}>
        <Typography variant="dialogTitle">创建频道</Typography>
        <Typography varaint="body1" sx={{ color: "rgb(185,187,190)" }}>
          于 {sort_name}
        </Typography>
      </DialogTitle>

      <DialogContent className="scrollable" sx={{ padding: "0px 16px" }}>
        <Typography sx={{ color: "rgb(185, 187, 190)", marginBottom: "8px" }}>
          频道类别
        </Typography>
        <TextChannel />
        <Typography sx={{ color: "rgb(220, 221, 222)", marginBottom: "8px" }}>
          频道名称
        </Typography>

        <TextField
          variant="standard"
          placeholder="新-频道"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: "16px",
                    height: "16px",
                    color: "rgb(220, 221, 222)",
                  }}
                >
                  <Tag />
                </Box>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            borderRadius: 1,
            bgcolor: "rgb(32, 34, 37)",
            width: "408px",
            height: "20px",
            padding: "10px",
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              padding: 0,
              typography: "body6",
            },
          }}
        />
        <PrivateSwitch
          checked={checked}
          setChecked={setChecked}
          label="私密频道"
        />
        <Typography
          varaint="body5"
          sx={{
            color: "rgb(185, 187, 190)",
            marginBottom: "20px",
            maxWidth: 428,
          }}
        >
          只有选中的用户会被允许访问此频道
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: "rgb(47, 49, 54)",
          height: "38px",
          padding: "16px",
        }}
      >
        <Button
          variant="text"
          onClick={(e) => {
            props.onClose();
          }}
          sx={{
            color: "rgb(255, 255, 255)",
            typography: "body3",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            addNewChannel({
              sortId: sort_id,
              body: { name: value, isPrivate: checked },
            });
            props.onClose();
          }}
          autoFocus
          disabled={!value}
          sx={{
            width: "96px",
            height: "38px",
            pointerEvents: "all!important",
            bgcolor: value ? "rgb(88, 101, 242)" : "rgb(67, 75, 148)",
            cursor: value ? "pointer" : "not-allowed!important",
            ":hover": {
              bgcolor: value ? "rgb(71, 82, 196)" : "rgb(67, 75, 148)",
            },
          }}
        >
          <Typography
            variant="body3"
            sx={{ color: value ? "rgb(255, 255, 255)" : "rgb(151, 152, 154)" }}
          >
            创建频道
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddChannel;
