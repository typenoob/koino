import {
  Box,
  Button,
  Dialog,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import ColorPicker from "../../components/ColorPicker";
import UserCard from "../../components/UserCard";
import { useGetCurrentUserQuery } from "../../services/userSlice";
import UnSaveWarning from "../snackbars/UnSaveWarning";
import {
  CustomDivider,
  CustomMenuItem,
  EscapeButton,
  vibrate,
} from "./EditChannel";
// TODO:   用户 默认通知设定
// TODO: 切换tab时增加warning
const CustomDivider1 = () => (
  <Box border="1px solid rgb(66, 70, 77)" marginY="24px"></Box>
);
const AccountOptions = ({ onEditProfile }) => {
  const { data: user } = useGetCurrentUserQuery();
  return (
    <>
      <UserCard user={user} large onEditProfile={onEditProfile} />
      <CustomDivider />
      <Typography
        variant="username"
        color="white"
        component="div"
        marginBottom="20px"
      >
        删除账号
      </Typography>
      <Typography variant="code" color="rgb(185,187,190)" component="div">
        禁用您的账号意味着在执行此操作后，您可以随时恢复它。
      </Typography>
      <Button
        variant="contained"
        sx={{
          borderRadius: 1,
          marginTop: "10px",
          width: "88px",
          height: "32px",
          bgcolor: "rgb(216, 60, 62)",
          ":hover": {
            bgcolor: "rgb(161, 45, 47)",
          },
          typography: "body3",
          marginRight: "16px",
          padding: 0,
        }}
      >
        关闭账号
      </Button>
      <Button
        variant="contained"
        sx={{
          borderRadius: 1,
          marginTop: "10px",
          width: "88px",
          height: "32px",
          border: "1px solid rgb(216, 60, 62)",
          ":hover": {
            bgcolor: "rgb(216, 60, 62)",
          },
          typography: "body3",
          padding: 0,
        }}
      >
        删除账户
      </Button>
    </>
  );
};
const ProfileOptions = ({ serverProfile = false }) => {
  const { data: user } = useGetCurrentUserQuery();
  const [selectedItem, setSelectedItem] = useState(serverProfile ? 1 : 0);
  const [serverValue, setServerValue] = useState("");
  const [selectedServer, setSelectedServer] = useState(0);
  const [value, setValue] = useState("");
  return (
    <>
      <Box
        sx={{
          marginY: "16px",
        }}
      >
        <Tabs
          value={selectedItem}
          onChange={(event, newValue) => setSelectedItem(newValue)}
          TabIndicatorProps={{
            sx: {
              bgcolor: "#D97D54",
            },
          }}
          sx={{
            marginBottom: "16px",
            "& .MuiButtonBase-root": {
              typography: "dialogTitle1",
              paddingLeft: 0,
              paddingTop: 0,
            },
            "& .MuiTabs-indicator": {
              bgcolor: "rgb(148, 156, 247)",
              height: "2px",
            },
            "& .Mui-selected": {
              color: "white !important",
            },
          }}
        >
          <Tab label="用户个人资料" sx={{ marginRight: "16px" }} />
          <Tab label="服务器资料" />
        </Tabs>
        {selectedItem === 0 && (
          <UserDetail user={user} value={value} setValue={setValue} />
        )}
        {selectedItem === 1 && (
          <>
            <Typography
              variant="body5"
              color="rgb(220,221,222)"
              marginBottom="16px"
              component="div"
            >
              为每个服务器配置不同的个人资料，充分展示自我。
            </Typography>
            <Typography marginBottom="8px" variant="display" component="div">
              选择一个服务器
            </Typography>
            <Select
              {...{ disableUnderline: true }}
              fullWidth
              value={selectedServer}
              variant="standard"
              onChange={(event) => setSelectedServer(event.target.value)}
              MenuProps={{
                PaperProps: {
                  className: "scrollable",
                  sx: {
                    overflowY: "auto",
                    bgcolor: "rgb(47, 49, 54)",
                    "& .MuiMenuItem-root": {
                      padding: 2,
                      height: "42px",
                      ":hover": {
                        bgcolor: "rgb(66, 70, 77)",
                      },
                    },
                  },
                },
              }}
              sx={{
                borderRadius: 0.5,
                bgcolor: "rgb(32, 34, 37)",
                "& .MuiInputBase-input": {
                  display: "flex",
                  alignItems: "center",
                  typography: "body6",
                  color: "rgb(220,221,222)",
                  padding: "8px 8px 8px 12px",
                },
                "& .MuiButtonBase-input": {
                  bgcolor: "red",
                  typography: "body6",
                  color: "rgb(220,221,222)",
                  padding: "8px 8px 8px 12px",
                },
                "& .MuiSvgIcon-root": {
                  color: "rgb(220, 221, 222)",
                },
              }}
            >
              <MenuItem value={0}>
                <Typography
                  variant="body6"
                  color="rgb(220,221,222)"
                  sx={{ marginX: "4px" }}
                >
                  coyote的服务器
                </Typography>
              </MenuItem>
              <MenuItem value={1}>
                <Typography
                  variant="body6"
                  color="rgb(220,221,222)"
                  sx={{ marginX: "4px" }}
                >
                  JitStreamer
                </Typography>
              </MenuItem>
            </Select>
            <CustomDivider />
            <UserDetail
              value={serverValue}
              setValue={setServerValue}
              nickname
              user={user}
            />
          </>
        )}
      </Box>
    </>
  );
};
const UserDetail = ({ user, value, setValue, nickname }) => {
  const MAX_LENGTH = 190;
  return (
    <Grid container height="200px" gap="35px" flexWrap="nowrap">
      <Grid item xs>
        {nickname && (
          <>
            <Typography variant="display" component="div" marginBottom="8px">
              昵称
            </Typography>
            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="standard"
              inputProps={{
                maxLength: 32,
              }}
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                borderRadius: 1,
                bgcolor: "rgb(32, 34, 37)",
                width: "315px",
                height: "40px",
                paddingX: "8px",
                marginBottom: "8px",
                "& .MuiInputBase-input": {
                  padding: "8px 4px",
                  typography: "body6",
                  color: "rgb(220,221,222)",
                },
              }}
            />
            <Box
              sx={{
                width: "315px",
                height: "24px",
                marginTop: "24px",
                borderTop: "1px solid rgb(66, 70, 77)",
              }}
            />
          </>
        )}

        <Typography variant="display" component="div" marginBottom="8px">
          头像
        </Typography>
        <Button
          sx={{
            width: "88px",
            height: "32px",
            bgcolor: "rgb(88, 101, 242)",
            typography: "body3",
            color: "white",
            ":hover": {
              bgcolor: "rgb(71, 82, 196)",
            },
          }}
        >
          更改头像
        </Button>
        <Button
          sx={{
            typography: "body3",
            width: "88px",
            height: "32px",
            color: "white",
            marginLeft: "4px",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          移除头像
        </Button>
        <Box
          sx={{
            width: "315px",
            height: "24px",
            marginTop: "24px",
            borderTop: "1px solid rgb(66, 70, 77)",
          }}
        />
        <Typography variant="display" component="div" marginBottom="8px">
          横幅颜色
        </Typography>
        <ColorPicker init_color="rgb(115, 90, 49)" />
        <Box
          sx={{
            width: "315px",
            height: "24px",
            marginTop: "24px",
            borderTop: "1px solid rgb(66, 70, 77)",
          }}
        />
        {!nickname && (
          <>
            <Typography variant="display" component="div">
              自我介绍
            </Typography>
            <TextField
              value={value}
              multiline
              rows={4}
              onChange={(e) => setValue(e.target.value)}
              variant="standard"
              inputProps={{
                maxLength: MAX_LENGTH,
              }}
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "absolute",
                      right: 5,
                      bottom: 30,
                      color: "rgb(163, 166, 170)",
                    }}
                  >
                    <Typography variant="body2">
                      {MAX_LENGTH - value.length}
                    </Typography>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginTop: "16px",
                borderRadius: 1,
                bgcolor: "rgb(32, 34, 37)",
                width: "271px",
                height: "136px",
                paddingX: "8px",
                marginBottom: "8px",
                position: "relative",
                "& .MuiInputBase-input": {
                  padding: "8px 6px",
                  paddingRight: "50px",
                  typography: "body2",
                  "::-webkit-scrollbar": {
                    width: "4px",
                  },
                },
              }}
            />
          </>
        )}
      </Grid>
      <Grid item xs>
        <Typography variant="display" component="div" marginBottom="8px">
          预览
        </Typography>
        <UserCard preview user={user} nickname={nickname && value} />
      </Grid>
    </Grid>
  );
};
const EditUser = ({ serverProfile = false, profile = false, ...props }) => {
  const [selectedTab, setSelectedTab] = useState(
    serverProfile || profile ? 1 : 0
  );
  const [_serverProfile, setServerProfile] = useState(serverProfile);
  const [channelTheme, setChannelTheme] = useState("");
  const [speedMode, setSpeedMode] = useState(0);
  const [openWaring, setOpenWarning] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("coyote的服务器");
  const Tabs = ["我的账号", "个人资料"];
  const { serverId } = useParams();
  const initialState = () => {
    setChannelTheme("");
    setSpeedMode(0);
    setChecked(false);
    setValue("coyote的服务器");
  };
  const isInitialState = useCallback(() => {
    return (
      channelTheme === "" &&
      speedMode === 0 &&
      checked === false &&
      value === "coyote的服务器"
    );
  }, [channelTheme, speedMode, checked, value]);
  useEffect(() => {
    if (isInitialState()) setOpenWarning(false);
    else setOpenWarning(true);
  }, [isInitialState]);
  return (
    <Dialog
      {...props}
      onClick={(event) => event.stopPropagation()}
      fullScreen
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "rgb(54, 57, 63)",
          color: "rgb(185, 187, 190)",
          borderRadius: "10px",
          flexDirection: "row",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <UnSaveWarning
        open={openWaring}
        onClose={() => setOpenWarning(false)}
        onReset={() => initialState()}
        onSave={() => setOpenWarning(false)}
      />
      <Grid container sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={4.14} sx={{ height: "100%" }}>
          <Grid
            container
            justifyContent="flex-end"
            sx={{
              height: "100%",
              bgcolor: "rgb(47, 49, 54)",
              color: "rgb(185, 187, 190)",
              padding: "60px 12px 60px 20px",
            }}
          >
            <Grid item>
              <MenuItem
                sx={{
                  padding: "0 10px 6px 10px",
                  typography: "display1",
                  minHeight: "24px",
                }}
              >
                <Typography
                  sx={{ color: "rgb(185, 187, 190)", marginLeft: "4px" }}
                >
                  {props.server_name}
                </Typography>
              </MenuItem>
              {Tabs.map((tab, index) => (
                <CustomMenuItem
                  key={index}
                  name={tab}
                  selected={index === selectedTab}
                  onClick={() => setSelectedTab(index)}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs sx={{ height: "100%", minWidth: 0 }}>
          <Grid
            container
            className="scroll-container"
            sx={{ height: "100%", overflowX: "hidden" }}
          >
            <Grid
              item
              sx={{ height: "100%", minWidth: "484px", flexBasis: "740px" }}
            >
              <Box
                sx={{
                  maxHeight: "100%",
                  padding: "60px 40px 80px 40px",
                }}
              >
                <Typography
                  variant="username"
                  component="div"
                  color="white"
                  sx={{ marginBottom: "20px" }}
                >
                  {Tabs[selectedTab]}
                </Typography>
                {selectedTab === 0 && (
                  <AccountOptions
                    onEditProfile={() => {
                      setServerProfile(false);
                      setSelectedTab(1);
                    }}
                  />
                )}
                {selectedTab === 1 && (
                  <ProfileOptions serverProfile={_serverProfile} />
                )}
                <Box sx={{ height: "165px" }}></Box>
              </Box>
            </Grid>
            <Grid
              item
              sx={{ marginRight: "21px", width: "60px", flexShrink: 0 }}
            >
              <EscapeButton
                onClick={() => {
                  if (openWaring) vibrate();
                  else props.onClose();
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};
export default EditUser;
