import { Close, Delete, HighlightOff } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import anime from "animejs";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import BootstrapTooltip from "../../components/BootstrapTooltip";
import IdentityAvatar from "../../components/IdentityAvatar";
import PrivateSwitch from "../../components/PrivateSwitch";
import {
  useDeleteAccessGroupsMutation,
  useDeleteAccessUsersMutation,
  useDeleteChannelMutation,
  useEditChannelMutation,
  useGetAccessGroupsQuery,
  useGetAccessUsersQuery,
  useGetChannelQuery,
} from "../../services/channelSlice";
import { useGetServerInvitesQuery } from "../../services/serverSlice";
import { Tag } from "../../svgs";
import UnSaveWarning from "../snackbars/UnSaveWarning";
import AddIdentity from "./AddIdentity";
import InviteFriend from "./InviteFriend";
var vibrate = function () {
  anime({
    targets: ".unsave-warning",
    translateX: ["-2.5rem", "2.5rem", "0rem"],
    backgroundColor: "rgb(251, 69, 72)",
    duration: 100,
    direction: "alternate",
    loop: 5,
    easing: "easeOutBack",
  });
  anime({
    targets: ".unsave-warning",
    duration: 500,
    backgroundColor: ["rgb(251, 69, 72)"],
    easing: "easeOutBack",
  }).finished.then(() =>
    anime({
      targets: ".unsave-warning",
      duration: 500,
      backgroundColor: "rgb(24, 25, 28)",
      easing: "easeOutBack",
    })
  );
};
const CustomDivider = (props) => {
  switch (props.variant) {
    case "long":
      return (
        <Box
          sx={{
            width: "100%",
            height: 0,
            paddingBottom: "16px",
            margin: "auto",
            borderTop: "1px solid rgb(63, 66, 72)",
          }}
        />
      );
    case "short":
      return (
        <Box
          sx={{
            width: "172px",
            height: "1px",
            margin: "8px 10px",
            bgcolor: "rgb(63, 66, 72)",
          }}
        />
      );
    default:
      return (
        <Box
          sx={{
            width: "680px",
            height: "0px",
            marginY: "40px",
            borderTop: "1px solid rgb(63, 66, 72)",
          }}
        />
      );
  }
};
const CustomMenuItem = (props) => {
  return (
    <MenuItem
      {...props}
      sx={{
        zIndex: 1,
        boxSizing: "content-box",
        borderRadius: 1,
        marginBottom: "2px",
        width: "172px",
        height: "24px",
        minHeight: "24px",
        padding: "4px 10px",
        typography: "dialogTitle1",
        ":hover": {
          bgcolor: "rgb(60, 63, 69)",
          color: "white",
        },
        "&.Mui-selected": {
          bgcolor: "rgb(66, 70, 77)",
          color: "white",
        },
        "&.Mui-selected:hover": {
          bgcolor: "rgb(60, 63, 69)",
          color: "white",
        },
      }}
    >
      <Grid container alignItems="center" sx={{ height: "100%" }}>
        {props.name}
        {props.children}
      </Grid>
    </MenuItem>
  );
};
const EscapeButton = (props) => (
  <Grid
    container
    alignItems="center"
    direction="column"
    width="36px"
    sx={{ paddingTop: "60px", position: "fixed" }}
  >
    <Grid item>
      <IconButton
        onClick={props.onClick}
        sx={{
          width: "36px",
          height: "36px",
          color: "rgb(185, 187, 190)",
          ":hover": {
            color: "rgb(220, 221, 222)",
          },
          border: "2px solid",
          borderRadius: "50%",
        }}
      >
        <Close
          sx={{
            width: "20px",
            height: "20px",
          }}
        />
      </IconButton>
    </Grid>
    <Grid
      item
      sx={{
        marginTop: "6px",
        textAlign: "center",
        typography: "esc",
        color: "rgb(185, 187, 190)",
      }}
    >
      ESC
    </Grid>
  </Grid>
);
const IdentityItem = (props) => {
  const {
    admin,
    root,
    group,
    people,
    name,
    full_name,
    attach_name,
    color,
    tooltip,
    id,
  } = props;
  const [deleteAccessUser] = useDeleteAccessUsersMutation();
  const [deleteAccessGroup] = useDeleteAccessGroupsMutation();
  const { channelId } = useParams();
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: "0px 4px 16px 4px" }}
    >
      <Grid item>
        <Grid container alignItems="center">
          <IdentityAvatar
            color={color}
            admin={admin}
            group={group}
            root={root}
            people={people}
          />
          <Typography
            variant="body5"
            sx={{
              color: "rgb(220,221,222)",
              marginLeft: "8px",
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="body5"
            sx={{
              color: "rgb(163,166,170)",
              marginLeft: "8px",
            }}
          >
            {full_name}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Typography variant="body1" color="rgb(163, 166, 170)">
            {attach_name}
          </Typography>
          <BootstrapTooltip
            title={tooltip || "移除频道访问权限。"}
            placement="top"
            PopperProps={{
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -5],
                  },
                },
              ],
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                onClick={() => {
                  if (group) deleteAccessGroup({ channelId, groupId: id });
                  if (people) deleteAccessUser({ channelId, userId: id });
                }}
                disabled={admin || root}
                sx={{
                  color: "rgb(185, 187, 190)",
                  marginLeft: "8px",
                }}
              >
                <HighlightOff sx={{ width: "20px", height: "20px" }} />
              </IconButton>
            </Box>
          </BootstrapTooltip>
        </Grid>
      </Grid>
    </Grid>
  );
};
const CommonOptions = (props) => {
  const MAX_LENGTH = 1024;
  const timeLabels = [
    "关",
    "5秒",
    "10秒",
    "15秒",
    "30秒",
    "1分钟",
    "2分钟",
    "5分钟",
    "10分钟",
    "15分钟",
    "30分钟",
    "1小时",
    "2小时",
    "6小时",
  ];
  const {
    channelName,
    setChannelName,
    channelTheme,
    setChannelTheme,
    speedMode,
    setSpeedMode,
  } = props;
  return (
    <>
      <Typography
        variant="display"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        频道名称
      </Typography>
      <TextField
        variant="standard"
        onChange={(e) => setChannelName(e.target.value)}
        value={channelName}
        fullWidth
        sx={{
          borderRadius: 1,
          bgcolor: "rgb(32, 34, 37)",
          height: "20px",
          padding: "10px",
          "& .MuiInputBase-input": {
            padding: 0,
            typography: "body6",
          },
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <CustomDivider />
      <Typography
        variant="display"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        频道主题
      </Typography>
      <TextField
        multiline
        variant="standard"
        placeholder="告诉大家如何使用该频道吧！"
        onChange={(e) => setChannelTheme(e.target.value)}
        value={channelTheme}
        fullWidth
        sx={{
          borderRadius: 1,
          bgcolor: "rgb(32, 34, 37)",
          padding: "10px",
          height: "63px",
          position: "relative",
          "& .MuiInput-root": {
            position: "static",
            typography: "body6",
          },
        }}
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
                right: 15,
                bottom: 15,
                color: "rgb(163, 166, 170)",
              }}
            >
              <Typography variant="body1">
                {MAX_LENGTH - channelTheme?.length}
              </Typography>
            </InputAdornment>
          ),
        }}
      />
      <CustomDivider />
      <Typography variant="display" component="div">
        慢速模式
      </Typography>
      <Slider
        aria-label="Temperature"
        value={speedMode}
        onChange={(e, newValue) => setSpeedMode(newValue)}
        defaultValue={0}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => timeLabels[value]}
        step={1}
        marks
        min={0}
        max={timeLabels.length - 1}
        sx={{
          marginTop: "45px",
          marginX: "7px",
          "& .MuiSlider-valueLabel": {
            color: "rgb(163, 166, 170)",
            typography: "display",
          },
        }}
      />
      <Typography variant="body5">
        除非成员拥有管理频道或管理消息的权限，否则他们每次仅能发送一条消息或创建一个子区。
      </Typography>
    </>
  );
};
const PermissionOptions = (props) => {
  const { checked, setChecked } = props;
  const { channelId } = useParams();
  const { data: accessUsers } = useGetAccessUsersQuery(channelId);
  const { data: accessGroups } = useGetAccessGroupsQuery(channelId);
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddIdentity open={open} onClose={() => setOpen(false)} />
      <Typography variant="body5" component="div" sx={{ marginBottom: "8px" }}>
        使用权限来自定义谁可以在此频道内做些什么。
      </Typography>
      <Box
        sx={{
          width: "660px",
          marginTop: "16px",
          bgcolor: "rgb(41, 43, 47)",
          borderRadius: "12px",
          color: "rgb(220, 221, 222)",
        }}
      >
        <Box sx={{ padding: "16px", width: "628px", height: "48px" }}>
          <PrivateSwitch
            checked={checked}
            setChecked={setChecked}
            label="私密频道"
          />
          <Typography component="div" variant="body1">
            将频道设为私密，则只有所选成员以及身份组将能够查看此频道。
          </Typography>
        </Box>

        <Box
          sx={{
            display: checked || "none",
            paddingLeft: "16px",
            paddingRight: "8px",
            bgcolor: "rgb(47, 49, 54)",
            borderRadius: "0px 0px 12px 12px",
            width: "636px",
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: "100%",
              height: "64px",
              paddingY: "16px",
              paddingRight: "8px",
              typography: "display",
            }}
          >
            谁可以访问此频道？
            <Button
              sx={{
                width: "144px",
                height: "32px",
                padding: "2px,16px",
                bgcolor: "rgb(88, 101, 242)",
                color: "white",
                typography: "body3",
              }}
              onClick={() => setOpen(true)}
            >
              添加成员或身份组
            </Button>
          </Grid>
          <CustomDivider variant="long" />
          <Box
            sx={{
              paddingBottom: "16px",
              width: "628px",
              height: "16px",
              typography: "display",
            }}
          >
            身份组
          </Box>
          <IdentityItem
            color="rgb(46, 204, 113)"
            admin
            name="管理员"
            attach_name="管理员"
            tooltip="对方拥有管理员访问权限，无法移除。"
          />
          {accessGroups?.map((group) => (
            <IdentityItem
              key={group?.id}
              group
              color={group?.color}
              name={group?.name}
              id={group?.id}
              attach_name="身份组"
            />
          ))}
          <CustomDivider variant="long" />
          <Box
            sx={{
              paddingBottom: "16px",
              width: "628px",
              height: "16px",
              typography: "display",
            }}
          >
            成员
          </Box>
          <IdentityItem
            color="rgb(59, 165, 92)"
            root
            name="coyote"
            full_Name="coyote#0242"
            attach_name="服务器所有者"
            tooltip="无法移除服务器所有者"
          />
          {accessUsers?.map((user) => (
            <IdentityItem
              key={user?.id}
              color={user?.color}
              id={user?.id}
              people
              name={user?.username}
              full_name={user?.fullName}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};
const useExpireTime = (time) => {
  const [expireTime, setExpireTime] = useState(
    moment.duration(-moment().diff(moment(time))).format("DD:HH:mm:ss")
  );

  useEffect(() => {
    setInterval(() => {
      setExpireTime(
        moment.duration(-moment().diff(moment(time))).format("DD:HH:mm:ss")
      );
    });
  }, []);
  return [expireTime];
};
const InviteItem = ({ invite, index }) => {
  const [showClose, setShowClose] = useState(null);
  const [expireTime] = useExpireTime(invite.endTime);
  return (
    <TableRow
      onMouseEnter={() => setShowClose(index)}
      onMouseOut={() => setShowClose(null)}
      sx={{
        display: "flex",
        width: "660px",
        position: "relative",
      }}
    >
      <TableCell
        align="left"
        sx={{
          flex: "3 1 0px",
        }}
      >
        {
          <Grid container alignItems="center" display="inline-flex">
            <Grid item>
              <Avatar
                alt="Coyote"
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="body6" marginLeft="8px">
                {invite.users.username}
              </Typography>
              <Typography variant="body6" color="rgb(185,187,190)">
                {invite.users.discriminator}
              </Typography>
            </Grid>
          </Grid>
        }
      </TableCell>
      <TableCell
        align="left"
        sx={{
          flex: "3 1 0px",
        }}
      >
        {<Typography variant="code">{invite.code}</Typography>}
      </TableCell>
      <TableCell
        align="right"
        sx={{
          flex: "1 1 0px",
        }}
      >
        <Typography variant="code">0</Typography>
      </TableCell>
      <TableCell
        align="right"
        sx={{
          flex: "2 1 0px",
        }}
      >
        <Typography variant="code">{expireTime}</Typography>
      </TableCell>
      <IconButton
        onClick={() => console.log("delete")}
        sx={{
          visibility: index === showClose || "hidden",
          position: "absolute",
          top: -5,
          right: 0,
          color: "rgb(237, 66, 69)",
        }}
      >
        <HighlightOff sx={{ width: "20px" }} />
      </IconButton>
    </TableRow>
  );
};
const InviteOptions = (props) => {
  const { serverId } = useParams();
  const { data: invites } = useGetServerInvitesQuery(serverId);
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <InviteFriend open={open} onClose={() => setOpen(false)} />}
      <Typography variant="body5" component="div" sx={{ marginBottom: "8px" }}>
        这里是所有可用的邀请链接，您可以撤销任意一个或者
        <Button
          onClick={() => setOpen(true)}
          sx={{
            display: "inline",
            color: "rgb(0,175,244)",
            typography: "body5",
            padding: 0,
            marginBottom: "3px",
          }}
        >
          创建一个
        </Button>
        。
      </Typography>
      <CustomDivider variant="long" />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ display: "flex", width: "660px" }}>
              <TableCell
                align="left"
                sx={{
                  typography: "body5",
                  color: "rgb(185,187,190)",
                  flex: "3 1 0px",
                }}
              >
                邀请者
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  typography: "body5",
                  color: "rgb(185,187,190)",
                  flex: "3 1 0px",
                }}
              >
                邀请码
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  typography: "body5",
                  color: "rgb(185,187,190)",
                  flex: "1 1 0px",
                }}
              >
                使用次数
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  typography: "body5",
                  color: "rgb(185,187,190)",
                  flex: "2 1 0px",
                }}
              >
                到期时间
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invites?.map((invite, index) => (
              <InviteItem invite={invite} key={index} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
const EditChannel = (props) => {
  const [editChannel] = useEditChannelMutation();
  const { channel_id } = props;
  const { data: channel } = useGetChannelQuery(channel_id);
  const [selectedTab, setSelectedTab] = useState(channel?.intervalTime);
  const [channelName, setChannelName] = useState(channel?.name);
  const [channelTheme, setChannelTheme] = useState(channel?.theme);
  const [speedMode, setSpeedMode] = useState(0);
  const [openWaring, setOpenWarning] = useState(false);
  const [checked, setChecked] = useState(false);
  const [deleteChannel] = useDeleteChannelMutation();
  const Tabs = ["概况", "权限", "邀请"];
  const initialState = () => {
    setChannelName(channel?.name);
    setChannelTheme(channel?.theme);
    setSpeedMode(channel?.intervalTime);
    setChecked(channel?.isPrivate);
  };
  const isInitialState = useCallback(() => {
    return (
      channelName === channel?.name &&
      channelTheme === channel?.theme &&
      speedMode === channel?.intervalTime &&
      checked === channel?.isPrivate
    );
  }, [
    channelName,
    channel?.name,
    channel?.theme,
    channel?.intervalTime,
    channel?.isPrivate,
    channelTheme,
    speedMode,
    checked,
  ]);
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
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
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
        onSave={() => {
          editChannel({
            channelId: channel_id,
            body: {
              name: channelName,
              theme: channelTheme,
              intervalTime: speedMode,
              isPrivate: checked,
            },
          });
          setOpenWarning(false);
        }}
      />
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Grid
          item
          sx={{
            height: "100%",
            minWidth: 0,
            flex: "1 0 218px",
            bgcolor: "rgb(47, 49, 54)",
            color: "rgb(185, 187, 190)",
            padding: "60px 12px 60px 20px",
          }}
        >
          <Grid
            container
            justifyContent="flex-end"
            sx={{
              height: "100%",
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
                <Box sx={{ width: "12px", height: "12px" }}>
                  <Tag />
                </Box>
                <Typography>{channel?.name}</Typography>
                <Typography
                  sx={{ color: "rgb(185, 187, 190)", marginLeft: "4px" }}
                >
                  文字频道
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
              <CustomDivider variant="short" />
              <CustomMenuItem onClick={() => deleteChannel(channel?.id)}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  删除频道
                  <Delete sx={{ width: "16px", height: "16px" }} />
                </Grid>
              </CustomMenuItem>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          className="scroll-container"
          sx={{
            height: "100%",
            minWidth: 0,
            overflowY: "auto",
            flex: "1 1 800px",
          }}
        >
          <Grid container sx={{ width: "100%", height: "100%" }}>
            <Grid
              item
              sx={{
                height: "100%",

                minWidth: "484px",
                maxWidth: "740px",
                minHeight: "100%",
                flex: "1 1 auto",
              }}
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
                  <CommonOptions
                    channelName={channelName}
                    setChannelName={setChannelName}
                    channelTheme={channelTheme}
                    setChannelTheme={setChannelTheme}
                    speedMode={speedMode}
                    setSpeedMode={setSpeedMode}
                  />
                )}
                {selectedTab === 1 && (
                  <PermissionOptions
                    checked={checked}
                    setChecked={setChecked}
                  />
                )}
                {selectedTab === 2 && <InviteOptions />}

                <Box sx={{ height: "165px" }}></Box>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                marginRight: "21px",
                position: "relative",
                flex: "0 0 36px",
                width: "60px",
              }}
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
export { InviteOptions, CustomDivider, CustomMenuItem, EscapeButton, vibrate };
export default EditChannel;
