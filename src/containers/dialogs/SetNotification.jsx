import {
  Close,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItemButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { CustomSwitch } from "../../components/PrivateSwitch";
//TODO: 通知设定
const SetNotification = (props) => {
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [value, setValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedOption, setSelectedOption] = useState(5);
  return (
    <Dialog
      {...props}
      onClose={() => {
        props.onClose();
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
      <DialogTitle sx={{ padding: "16px", height: "48px" }}>
        <Typography variant="dialogTitle">通知设定</Typography>
        <Typography color="rgb(185,187,190)">coyote的服务器</Typography>
      </DialogTitle>

      <DialogContent className="scrollable" sx={{ padding: "0px 16px" }}>
        <Grid container justifyContent="space-between" marginTop="8px">
          <Grid item>
            <Typography variant="dialogTitle1">将coyote的服务器静音</Typography>
            <Typography
              variant="code"
              color="rgb(185,187,190)"
              component="div"
              marginTop="8px"
            >
              服务器静音将阻止您收取未读通知和内容，除非您被提及。
            </Typography>
          </Grid>

          <CustomSwitch
            checked={checked}
            setChecked={setChecked}
            class_name="mute_server"
          />
        </Grid>
        {checked && (
          <Grid
            container
            justifyContent="space-between"
            marginTop="8px"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="dialogTitle1">静音持续时间</Typography>
            </Grid>

            <Select
              {...{ disableUnderline: true }}
              value={selectedOption}
              variant="standard"
              onChange={(event) => setSelectedOption(event.target.value)}
              MenuProps={{
                PaperProps: {
                  className: "scrollable",
                  sx: {
                    overflowY: "auto",
                    bgcolor: "rgb(47, 49, 54)",
                    "& .MuiMenuItem-root": {
                      padding: 2,
                      width: 282,
                      height: 44,
                      color: "rgb(185, 187, 190)",
                      ":hover": {
                        bgcolor: "rgb(60, 63, 69)",
                        color: "rgb(220, 221, 222)",
                      },
                    },
                    "& .Mui-selected": {
                      bgcolor: "rgb(66, 70, 77)!important",
                      color: "rgb(255,255,255)!important",
                    },
                  },
                },
              }}
              sx={{
                width: 284,
                height: 42,
                padding: "8px",
                borderRadius: 0.5,
                bgcolor: "rgb(32, 34, 37)",
                color: "rgb(220,221,222)",
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center",
                  color: "rgb(220,221,222)",
                  padding: "8px 8px 8px 12px",
                },
                "& .MuiSvgIcon-root": {
                  color: "rgb(220, 221, 222)",
                },
              }}
            >
              {[
                "持续15分钟",
                "持续1小时",
                "持续3小时",
                "持续8小时",
                "持续24小时",
                "直到我再次开启",
              ].map((item, index) => (
                <MenuItem value={index}>
                  <Typography
                    variant="dialogTitle"
                    sx={{
                      marginX: "4px",
                    }}
                  >
                    {item}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </Grid>
        )}

        <Box
          sx={{
            width: "568px",
            border: "1px solid rgb(66, 70, 77)",
            marginY: "30px",
          }}
        />
        <Typography
          variant="display"
          color="rgb(185,187,190)"
          marginBottom="8px"
          component="div"
        >
          服务器通知设置
        </Typography>
        <Box
          sx={{ cursor: checked && "not-allowed", opacity: checked && "0.3" }}
        >
          {["所有消息", "仅@被提及", "无通知"].map((item, index) => (
            <ListItemButton
              onClick={() => setSelectedItem(index)}
              sx={{
                padding: "10px",
                bgcolor:
                  selectedItem === index
                    ? "rgb(69, 73, 80)"
                    : "rgb(47, 49, 54)",
                width: 568,
                height: 47,
                borderRadius: 0.5,
                cursor: checked && "not-allowed",
                pointerEvents: checked && "none",
                marginBottom: "8px",
                ":hover": {
                  bgcolor:
                    selectedItem === index
                      ? "rgb(69, 73, 80)"
                      : "rgb(64, 68, 75)",
                },
              }}
              key={index}
            >
              {selectedItem === index ? (
                <RadioButtonChecked
                  sx={{ marginRight: "10px", width: "24px", height: "24px" }}
                />
              ) : (
                <RadioButtonUnchecked
                  sx={{ marginRight: "10px", width: "24px", height: "24px" }}
                />
              )}

              <Typography variant="dialogTitle1">{item}</Typography>
            </ListItemButton>
          ))}
        </Box>

        <Box
          sx={{
            width: "568px",
            border: "1px solid rgb(66, 70, 77)",
            marginY: "30px",
          }}
        />
        <Grid container justifyContent="space-between">
          <Typography variant="dialogTitle1">关闭@everyone</Typography>
          <CustomSwitch
            checked={checked1}
            setChecked={setChecked1}
            class_name="close_everyone"
          />
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          bgcolor: "rgb(47, 49, 54)",
          height: "38px",
          padding: "16px",
        }}
      >
        <Button
          onClick={() => {
            console.log(
              `create group ${value} with ${
                checked ? "private" : "public"
              } permission`
            );
          }}
          autoFocus
          sx={{
            width: "96px",
            height: "38px",
            pointerEvents: "all!important",
            bgcolor: "rgb(88, 101, 242)",
            ":hover": {
              bgcolor: "rgb(71, 82, 196)",
            },
          }}
        >
          <Typography variant="body3" sx={{ color: "rgb(255, 255, 255)" }}>
            完成
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SetNotification;
