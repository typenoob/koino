import {
  Add,
  AddPhotoAlternateRounded,
  ArrowBack,
  Circle,
  Close,
  Delete,
  HighlightOff,
  MoreHoriz,
  NavigateNext,
  North,
  PeopleAlt,
  Person,
  Search,
  SearchSharp,
  South,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  ListItemButton,
  MenuItem,
  Popover,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import AddGroup from "../../components/AddGroup";
import BootstrapTooltip from "../../components/BootstrapTooltip";
import ColorPicker from "../../components/ColorPicker";
import { CustomSwitch } from "../../components/PrivateSwitch";
import { Colors } from "../../constants";
import {
  useEditServerMutation,
  useGetServerChannelsQuery,
  useGetServerQuery,
} from "../../services/serverSlice";
import { Logo, Pencil, Selected, Shield, Tag } from "../../svgs";
import UnSaveWarning from "../snackbars/UnSaveWarning";
import AddUser from "./AddUser";
import {
  CustomDivider,
  CustomMenuItem,
  EscapeButton,
  InviteOptions,
  vibrate,
} from "./EditChannel";
const CustomDivider1 = () => (
  <Box border="1px solid rgb(66, 70, 77)" marginY="24px"></Box>
);
const CommonOptions = (props) => {
  const { serverId } = useParams();
  const { data: channels } = useGetServerChannelsQuery(serverId);
  const [hover, setHover] = useState(false);
  const {
    value,
    setValue,
    checked,
    setChecked,
    selectedChannel,
    setSelectedChannel,
  } = props;
  const uploadImage = () => {
    console.log("upload");
  };
  return (
    <>
      <Grid container>
        <Grid item xs>
          <Grid container>
            <Grid item marginRight="10px" paddingX="5px">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    sx={{
                      bgcolor: "rgb(220, 221, 222)",
                      color: "rgb(114, 118, 125)",
                      width: "28px",
                      height: "28px",
                    }}
                  >
                    <AddPhotoAlternateRounded sx={{ width: "70%" }} />
                  </Avatar>
                }
              >
                <Avatar
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={uploadImage}
                  sx={{
                    width: "100px",
                    height: "100px",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.24)",
                    bgcolor: "rgb(54, 57, 63)",
                    fontSize: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    ":hover": {
                      bgcolor: "rgb(31, 32, 36)",
                      typography: "display",
                    },
                  }}
                >
                  {hover ? "更改图标" : "coyote的服务器"}
                </Avatar>
              </Badge>

              <Typography marginTop="10px" color="rgb(163,166,170)">
                最小尺寸： <strong>128x128</strong>
              </Typography>
            </Grid>

            <Grid item xs marginLeft="10px">
              <Typography variant="body5" component="div" marginBottom="8px">
                我们建议服务器使用至少 <br /> 512x512 大小的图片。
              </Typography>
              <Button
                onClick={uploadImage}
                sx={{
                  border: "1px solid rgb(79, 84, 92)",
                  borderRadius: 1,
                  width: "94px",
                  height: "36px",
                  typography: "body3",
                  color: "white",
                }}
              >
                上传图片
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs sx={{ margin: "0 0 20px 10px" }}>
          <Typography marginBottom="8px">服务器名称</Typography>
          <TextField
            variant="standard"
            fullWidth
            onChange={(e) => setValue(e.target.value)}
            value={value}
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              borderRadius: 1,
              bgcolor: "rgb(32, 34, 37)",
              height: "20px",
              padding: "10px",
              "& .MuiInputBase-input": {
                padding: 0,
                color: "rgb(220,221,222)",
                typography: "body6",
              },
            }}
          />
        </Grid>
      </Grid>

      <CustomDivider />
      <Typography
        variant="display"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        系统消息频道
      </Typography>
      <Select
        disableUnderline
        fullWidth
        value={selectedChannel}
        variant="standard"
        onChange={(event) => setSelectedChannel(event.target.value)}
        MenuProps={{
          PaperProps: {
            className: "scrollable",
            sx: {
              overflowY: "auto",
              bgcolor: "rgb(47, 49, 54)",
              "& .MuiMenuItem-root": {
                padding: 2,
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
          "& .MuiSvgIcon-root": {
            color: "rgb(220, 221, 222)",
          },
        }}
      >
        <MenuItem value={-1}>
          <Typography
            variant="body6"
            color="rgb(220,221,222)"
            sx={{ marginX: "4px" }}
          >
            无系统消息
          </Typography>
        </MenuItem>
        {channels.map((channel, index) => (
          <MenuItem
            key={index}
            value={index}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item>
              <Grid container alignItems="center">
                <Tag width="16px" height="16px" />
                <Typography
                  variant="body6"
                  color="rgb(220,221,222)"
                  sx={{ marginX: "4px" }}
                >
                  {channel.name}
                </Typography>
                <Typography
                  variant="display1"
                  color="rgb(135,137,140)"
                  sx={{ marginLeft: "8px" }}
                >
                  {channel.type}
                </Typography>
              </Grid>
            </Grid>
            {index === selectedChannel && (
              <Selected color="rgb(88, 101, 242)" />
            )}
          </MenuItem>
        ))}
      </Select>
      <Typography variant="body5" component="div" marginTop="8px">
        我们会向该频道发送系统事件消息。您可以随时禁用这些消息。
      </Typography>
      <Grid
        container
        justifyContent="space-between"
        sx={{
          cursor: selectedChannel === -1 ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          selectedChannel !== -1 && setChecked(!checked);
        }}
        marginY="20px"
      >
        <Typography
          variant="body7"
          color={
            selectedChannel === -1 ? "rgb(185,187,190)" : "rgb(255,255,255)"
          }
        >
          当有人加入此服务器时发送一条随机欢迎消息。
        </Typography>
        <CustomSwitch
          checked={checked}
          setChecked={setChecked}
          disabled={selectedChannel === -1}
        />
      </Grid>

      <CustomDivider />
      <Typography
        variant="display"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        默认通知设定。
      </Typography>
      <Typography variant="body5">
        这将决定那些没有明确设置通知设定的用户是否会收到此服务器上的每一条信息的通知。
      </Typography>
    </>
  );
};
const GroupOptions = (props) => {
  const [value, setValue] = useState("");
  //TODO: replace with real data
  const data = [
    {
      name: "管理员",
      color: "rgb(46, 204, 113)",
      memberCounts: 1,
    },
    {
      name: "123",
      color: "rgb(52, 152, 219)",
      memberCounts: 0,
    },
  ];
  return (
    <>
      <Typography
        variant="display"
        component="div"
        sx={{ marginBottom: "8px" }}
      >
        使用身份组，将您的服务器成员分组并分别分配权限。
      </Typography>
      <ListItemButton
        onClick={props.onOpenDetail}
        sx={{
          width: "100%",
          height: "72px",
          padding: "16px 24px 16px 16px",
          bgcolor: "rgb(47, 49, 54)",
          ":hover": {
            bgcolor: "rgb(64, 68, 75)",
          },
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            bgcolor: "rgb(54, 57, 63)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
          }}
        >
          <PeopleAlt sx={{ width: "20px" }} />
        </Box>
        <Grid container direction="column" marginLeft="16px">
          <Typography variant="secondary" marginBottom="4px">
            默认权限
          </Typography>

          <Typography varaint="body1">
            @everyone • 适用于所有服务器成员
          </Typography>
        </Grid>
        <NavigateNext sx={{ width: "24px" }} />
      </ListItemButton>
      <Grid
        container
        alignItems="center"
        sx={{ width: "100%", marginTop: "32px" }}
      >
        <TextField
          placeholder="搜索身份组"
          variant="standard"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ color: "rgb(185, 187, 190)", width: "24px" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flexGrow: 1,
            borderRadius: 1,
            bgcolor: "rgb(32, 34, 37)",
            height: "20px",
            padding: "10px",
            "& .MuiInputBase-input": {
              padding: 0,
              color: "rgb(220,221,222)",
              typography: "body6",
            },
          }}
        />
        <Button
          sx={{
            width: "102px",
            height: "34px",
            marginLeft: "16px",
            padding: 0,
            bgcolor: "rgb(88, 101, 242)",
            color: "white",
            typography: "body3",
          }}
        >
          创建身份组
        </Button>
      </Grid>

      <Typography variant="body5" marginTop="8px">
        成员将使用列表中最靠前的身份组的颜色。
      </Typography>
      <TableContainer sx={{ marginTop: "32px" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                display: "flex",
                width: "660px",
                "& .MuiTableCell-root": {
                  typography: "display",
                  color: "rgb(185,187,190)",
                },
              }}
            >
              <TableCell
                align="left"
                sx={{
                  flex: "0 1 183px",
                }}
              >
                身份组 - {2}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  flex: "0 0 112px",
                }}
              >
                成员
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  flex: "1 0 88px",
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                onMouseLeave={() => {}}
                sx={{
                  display: "flex",
                  width: "660px",
                  position: "relative",
                  cursor: "pointer",
                  ":hover": {
                    bgcolor: "rgb(64, 68, 75)",
                  },
                }}
              >
                <TableCell
                  align="left"
                  sx={{
                    flex: "0 1 183px",
                    color: "white",
                  }}
                >
                  <Grid container alignItems="center" sx={{ height: "100%" }}>
                    <Shield color={row.color} />
                    <Typography variant="dialogTitle1" marginLeft="8px">
                      {row.name}
                    </Typography>
                  </Grid>
                </TableCell>
                <TableCell
                  sx={{
                    flex: "0 0 112px",
                    color: "rgb(185,187,190)",
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="right"
                    sx={{ height: "100%" }}
                  >
                    <Typography variant="body6" color="rgb(185,187,190)">
                      {row.memberCounts}
                    </Typography>

                    <Person
                      sx={{ width: "20px", height: "20px", marginLeft: "4px" }}
                    />
                  </Grid>
                </TableCell>
                <TableCell align="right" sx={{ flex: "1 0 88px" }}>
                  <ButtonGroup
                    sx={{
                      "& .MuiButtonBase-root": {
                        marginLeft: "16px",
                        width: "36px",
                        minWidth: "auto",
                        height: "36px",
                        padding: 0,
                        borderRadius: "50%",
                        bgcolor: "rgb(47, 49, 54)",
                        color: "rgb(185, 187, 190)",
                        ":hover": {
                          bgcolor: "rgb(32, 34, 37)",
                        },
                      },
                    }}
                  >
                    <Button>
                      <Pencil sx={{ width: "70%" }} />
                    </Button>
                    <Button onClick={() => {}}>
                      <North sx={{ width: "50%" }} />
                    </Button>
                    <Button>
                      <South sx={{ width: "50%" }} />
                    </Button>
                    <Button>
                      <Delete
                        sx={{ width: "60%", color: "rgb(216, 60, 62)" }}
                      />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
const GroupDetailItem = ({ title, tooltip, index, checked, onChange }) => (
  <>
    <Grid container justifyContent="space-between" marginTop="10px">
      <Typography color="white" variant="dialogTitle1">
        {title}
      </Typography>
      <CustomSwitch
        class_name={`switch-${index}`}
        checked={checked}
        setChecked={onChange}
      />
    </Grid>
    <Typography variant="body5" component="div" marginTop="8px">
      {tooltip}
    </Typography>
    <Box sx={{ border: "1px solid rgb(66, 70, 77)", marginY: "20px" }}></Box>
  </>
);

const GroupDetail = (props) => {
  const data = [
    {
      name: "管理员",
      color: "rgb(46, 204, 113)",
    },
    {
      name: "123",
      color: "rgb(52, 152, 219)",
    },
  ];
  const options = [
    { title: "查看频道", tooltip: "默认允许成员查看频道（私密频道除外）。" },
    { title: "管理身份组", tooltip: "允许成员创建编辑或删除身份组。" },
    {
      title: "管理服务器",
      tooltip: "允许成员变更此服务器名称、查看所有邀请。",
    },
    { title: "创建邀请", tooltip: "允许成员邀请新人加入此服务器。" },
    {
      title: "修改昵称",
      tooltip: "允许成员变更自己的昵称：专为此服务器设置一个自定义名称。",
    },
    { title: "管理昵称", tooltip: "允许成员变更其他成员的昵称" },
    {
      title: "剔除成员",
      tooltip:
        "允许成员将其他成员从此服务器中移除。被踢除的成员如果获得其它邀请，可再次加入此服务器",
    },
    { title: "封锁成员", tooltip: "允许成员永久封禁其他成员访问此服务器。" },
    {
      title: "暂时禁言成员",
      tooltip: "当您对用户进行暂时禁言后，该用户将无法在聊天中发送消息。",
    },
    { title: "发送消息", tooltip: "允许成员发送消息。" },
    { title: "添加反应", tooltip: "允许成员添加新表情符号反应至消息。" },
    {
      title: "提及@everyone和所有身份组",
      tooltip:
        '允许成员使用@everyone。他们还可以提及所有身份组，即便目标身份组禁用了"允许任何人提及该身份组"设置也没关系',
    },
    { title: "管理消息", tooltip: "允许成员删除其他成员发出的消息或标注消息" },
  ];
  const users = [
    { name: "coyote", fullname: "coyote#4679" },
    { name: "coyote", fullname: "coyote#2233" },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [checks, setChecks] = useState({});
  const [userChecks, setUserChecks] = useState({});
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Grid container flexWrap="nowrap" direction="row" position="relative">
      <Grid
        item
        flexShrink={0}
        flexBasis={232}
        borderRight="1px solid rgb(66, 70, 77)"
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Box
          sx={{
            height: "24px",
            margin: "0 8px 8px 16px",
            padding: "60px 8px 16px 8px",
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Button
              component="div"
              onClick={() => props.onOpenDetail(false)}
              sx={{
                padding: 0,
                color: "rgb(185, 187, 190)",
                ":hover": {
                  color: "white",
                },
              }}
            >
              <>
                <ArrowBack
                  sx={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                    color: "inherit",
                  }}
                />
                后退
              </>
            </Button>
            <BootstrapTooltip
              title="创建身份组"
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
              <IconButton>
                <Add
                  sx={{
                    padding: 0,
                    width: "20px",
                    height: "20px",
                    color: "white",
                  }}
                />
              </IconButton>
            </BootstrapTooltip>
          </Grid>
        </Box>
        <Box
          sx={{
            height: "108px",
            padding: "0 8px 96px 40px",
            "& .MuiListItemButton-root": {
              borderRadius: 1,
            },
          }}
        >
          {data.map((item, index) => (
            <ListItemButton
              onClick={() => setSelectedTab(index)}
              sx={{
                width: "181px",
                height: "34px",
                padding: "6px 10px",
                marginBottom: "2px",
                ":hover": {
                  bgcolor: "rgb(64, 68, 75)",
                },
                bgcolor: selectedTab === index && "rgb(64, 68, 75)",
              }}
            >
              <Grid container alignItems="center">
                <Circle sx={{ color: item.color, width: "12px" }} />
                <Typography variant="body3" marginLeft="8px">
                  {item.name}
                </Typography>
              </Grid>
            </ListItemButton>
          ))}
          <ListItemButton
            onClick={() => setSelectedTab(data.length)}
            sx={{
              width: "181px",
              height: "34px",
              padding: "6px 10px",
              marginBottom: "2px",
              bgcolor: selectedTab === data.length && "rgb(64, 68, 75)",
              ":hover": {
                bgcolor: "rgb(64, 68, 75)",
              },
            }}
          >
            <Grid container alignItems="center">
              <Circle sx={{ color: "rgb(153, 170, 181)", width: "12px" }} />
              <Typography variant="body3" marginLeft="8px">
                @everyone
              </Typography>
            </Grid>
          </ListItemButton>
        </Box>
      </Grid>
      <Grid
        item
        flexGrow={1}
        height="100%"
        flexBasis={220}
        sx={{
          paddingLeft: "24px",
          paddingRight: "42px",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            padding: "60px 0px 16px 0px",
            bgcolor: "rgb(54, 57, 63)",
            zIndex: 2,
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            color="white"
            marginBottom="24px"
          >
            <Typography variant="primary">
              编辑身份组 - {data[selectedTab]?.name || "@everyone"}
            </Typography>
            <MoreHoriz sx={{ color: "white" }} />
          </Grid>
          <Box
            sx={{
              borderBottom: "2px solid rgb(66, 70, 77)",
              marginY: "16px",
            }}
          >
            <Tabs
              value={selectedItem}
              onChange={(event, newValue) => setSelectedItem(newValue)}
              sx={{
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
              <Tab label="显示" />
              <Tab label="权限" />
              <Tab label="管理成员（1）" />
            </Tabs>
          </Box>
          {selectedItem === 1 && (
            <TextField
              placeholder="搜索权限"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              fullWidth
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment>
                    {value ? (
                      <Close
                        onClick={() => setValue("")}
                        sx={{ color: "rgb(185, 187, 190)", width: "24px" }}
                      />
                    ) : (
                      <Search
                        sx={{ color: "rgb(185, 187, 190)", width: "24px" }}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{
                flexGrow: 1,
                borderRadius: 1,
                bgcolor: "rgb(32, 34, 37)",
                "& .MuiInputBase-input": {
                  height: "32px",
                  paddingLeft: "12px",
                  paddingY: "2px",
                  color: "rgb(220,221,222)",
                  typography: "body6",
                },
              }}
            />
          )}
          {selectedItem === 2 && (
            <Grid container alignItems="center">
              <Grid item xs>
                <TextField
                  placeholder="搜索成员"
                  fullWidth
                  onChange={(e) => setValue1(e.target.value)}
                  value={value1}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment>
                        {value ? (
                          <Close
                            onClick={() => setValue("")}
                            sx={{
                              color: "rgb(185, 187, 190)",
                              width: "24px",
                            }}
                          />
                        ) : (
                          <Search
                            sx={{
                              color: "rgb(185, 187, 190)",
                              width: "24px",
                            }}
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    flexGrow: 1,
                    borderRadius: 1,
                    bgcolor: "rgb(32, 34, 37)",
                    "& .MuiInputBase-input": {
                      height: "32px",
                      paddingLeft: "12px",
                      paddingY: "2px",
                      color: "rgb(220,221,222)",
                      typography: "body6",
                    },
                  }}
                />
              </Grid>
              <AddUser
                open={open}
                onClose={() => setOpen(false)}
                userChecks={userChecks}
                setUserChecks={setUserChecks}
              />
              <Button
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  bgcolor: "rgb(88, 101, 242)",
                  width: "88px",
                  height: "32px",
                  marginLeft: "16px",
                  typography: "body3",
                  color: "white",
                  ":hover": {
                    bgcolor: "rgb(71, 82, 196)",
                  },
                }}
              >
                添加成员
              </Button>
            </Grid>
          )}
        </Box>
        <Box sx={{ paddingBottom: "60px" }}>
          {selectedItem === 0 && (
            <Box>
              <Typography variant="display" component="div" marginBottom="8px">
                身份组名称
              </Typography>
              <TextField
                variant="standard"
                fullWidth
                onChange={(e) => setValue(e.target.value)}
                value={value}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    padding: "10px",
                    height: "20px",
                    color: "rgb(220,221,222)",
                    bgcolor: "rgb(32, 34, 37)",
                    borderRadius: 1,
                    typography: "body6",
                  },
                }}
              />
              <CustomDivider1 />
              <Typography variant="display" marginBottom="8px">
                身份组颜色
              </Typography>
              <Typography variant="code" component="div" marginBottom="8px">
                成员将使用身份组列表中最靠前的身份组的颜色。
              </Typography>
              <BootstrapTooltip title="默认">
                <Button
                  sx={{
                    width: "70px",
                    height: "50px",
                    marginRight: "10px",
                    borderRadius: "4px",
                    border: "1px solid transparent",
                    bgcolor: "rgb(153, 170, 181)",
                    ":hover": {
                      bgcolor: "rgb(153,170,181)",
                    },
                  }}
                ></Button>
              </BootstrapTooltip>
              <BootstrapTooltip
                title="自定义颜色"
                PopperProps={{
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, 14],
                      },
                    },
                  ],
                }}
              >
                <Box component="span">
                  <ColorPicker init_color="rgb(115, 90, 49)" />
                </Box>
              </BootstrapTooltip>
              <Grid container marginTop="10px">
                {Colors[0].map((color) => (
                  <Button
                    sx={{
                      width: "20px",
                      minWidth: "auto",
                      height: "20px",
                      marginRight: "10px",
                      borderRadius: "4px",
                      border: "1px solid transparent",
                      bgcolor: color,
                      ":hover": {
                        bgcolor: color,
                      },
                    }}
                  />
                ))}
              </Grid>
              <Grid container marginTop="10px">
                {Colors[1].map((color) => (
                  <Button
                    sx={{
                      width: "20px",
                      minWidth: "auto",
                      height: "20px",
                      marginRight: "10px",
                      borderRadius: "4px",
                      border: "1px solid transparent",
                      bgcolor: color,
                      ":hover": {
                        bgcolor: color,
                      },
                    }}
                  />
                ))}
              </Grid>
              <CustomDivider1 />
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="dialogTitle1">
                  将身份组成员和在线成员分开显示
                </Typography>
                <CustomSwitch
                  class_name="one"
                  checked={checked}
                  setChecked={setChecked}
                />
              </Grid>
              <CustomDivider1 />
              <Box>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="dialogTitle1">
                    允许任何人@被提及此身份组
                  </Typography>
                  <CustomSwitch
                    class_name="two"
                    checked={checked1}
                    setChecked={setChecked1}
                  />
                </Grid>
                <Typography
                  variant="code"
                  component="div"
                  width="100%"
                  marginTop="8px"
                >
                  请注意：拥有“提及@everyone，@here和所有身份组”权限的成员总是能够提及该身份组。
                </Typography>
              </Box>
            </Box>
          )}
          {selectedItem === 1 && (
            <Box>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                marginY="10px"
              >
                <Typography variant="display">通用服务器权限</Typography>
                <Typography variant="username2" color="rgb(0,175,244)">
                  清除权限
                </Typography>
              </Grid>
              {options
                .filter((option) => option.title.includes(value))
                .map((option, index) => (
                  <GroupDetailItem
                    key={index}
                    title={option.title}
                    tooltip={option.tooltip}
                    checked={checks[option.title]}
                    onChange={() =>
                      setChecks({
                        ...checks,
                        [option.title]: !checks[option.title],
                      })
                    }
                    index={index}
                  />
                ))}

              <Typography variant="display" component="div" marginBottom="20px">
                高级权限
              </Typography>
              <GroupDetailItem
                title="管理员"
                tooltip="拥有此权限的成员将具备充分的权限，也能绕开频道的所有特定权限或限制。"
              />
            </Box>
          )}
          {selectedItem === 2 && (
            <Box>
              {users
                .filter((user) => user.fullname.includes(value1))
                .map((user, index) => (
                  <Grid
                    key={index}
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      borderRadius: 1,
                      height: "40px",
                      paddingX: "8px",
                      cursor: "pointer",
                      ":hover": {
                        bgcolor: "rgb(64, 68, 75)",
                      },
                    }}
                  >
                    <Grid item>
                      <Grid container alignItems="center">
                        <Box
                          sx={{
                            width: "20px",
                            height: "20px",
                            bgcolor: "rgb(59, 165, 92)",
                            borderRadius: "50%",
                            padding: "auto",
                          }}
                        >
                          <Logo width="12px" style={{ margin: "auto" }} />
                        </Box>

                        <Typography
                          variant="username2"
                          color="white"
                          marginLeft="4px"
                        >
                          {user.name}
                        </Typography>
                        <Typography variant="username2" marginLeft="4px">
                          {user.fullname}
                        </Typography>
                      </Grid>
                    </Grid>
                    <IconButton>
                      <HighlightOff sx={{ width: "20px" }} />
                    </IconButton>
                  </Grid>
                ))}
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
const PeopleOptions = (props) => {
  const [value, setValue] = useState("");
  const [hovers, setHovers] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const users = [
    { name: "coyote", fullname: "coyote#0242", groups: ["管理员", "123"] },
    { name: "coyote", fullname: "coyote#9883", groups: ["123"] },
  ];
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography
          variant="body5"
          component="div"
          sx={{ marginBottom: "8px" }}
        >
          2 成员
        </Typography>
        <Grid item>
          <Grid container alignItems="center">
            <Typography variant="tip">显示身份组:</Typography>
            <Select
              defaultValue="3"
              MenuProps={{
                sx: {
                  "& .MuiMenu-paper": {
                    backgroundColor: "rgb(54, 57, 63)",
                  },
                },
              }}
              sx={{
                width: "120px",
                height: "13px",
                typography: "tip",
                "& > fieldset": { border: "none" },
                "& > MuiPaper-root": { backgroundColor: "blue" },
              }}
            >
              <MenuItem value="1">管理员</MenuItem>
              <MenuItem value="2">123</MenuItem>
              <MenuItem value="3">@everyone</MenuItem>
            </Select>
            <TextField
              value={value}
              onChange={(e) => setValue(e.target.value)}
              variant="standard"
              placeholder="搜索成员"
              InputProps={{
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
                    <SearchSharp sx={{ width: "20px" }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                borderRadius: 1,
                bgcolor: "rgb(32, 34, 37)",
                height: "26px",
                "& .MuiInputBase-input": {
                  paddingX: 0,
                  paddingLeft: "3px",
                  width: "160px",
                  typography: "body3",
                },
              }}
            />
          </Grid>
        </Grid>
      </Grid>

      <Box
        sx={{
          borderTop: "1px solid rgb(63, 66, 72)",
          marginY: "16px",
        }}
      />
      {users
        .filter((user) => user.fullname.includes(value))
        .map((user, index) => (
          <>
            <Grid
              key={index}
              container
              justifyContent="space-between"
              alignItems="center"
              onMouseEnter={() =>
                setHovers({ ...hovers, [user.fullname]: true })
              }
              onMouseLeave={() =>
                setHovers({ ...hovers, [user.fullname]: false })
              }
              sx={{
                borderRadius: 1,
                height: "40px",
                paddingX: "8px",
                cursor: "pointer",
              }}
            >
              <Grid item>
                <Grid container>
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      bgcolor: "rgb(59, 165, 92)",
                      borderRadius: "50%",
                      marginX: "8px",
                    }}
                  >
                    <Logo width="28px" style={{ margin: "auto" }} />
                  </Box>
                  <Grid item marginRight="188px">
                    <Grid container direction="column">
                      <Typography
                        variant="username2"
                        color="white"
                        marginLeft="4px"
                      >
                        {user.name}
                      </Typography>
                      <Typography variant="username2" marginLeft="4px">
                        {user.fullname}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {user.groups.map((group, index) => (
                      <Chip
                        deleteIcon={
                          <HighlightOff
                            sx={{
                              width: "16px",
                              height: "16px",
                            }}
                          />
                        }
                        onDelete={() => {}}
                        label={
                          <Grid container alignItems="center">
                            <Circle
                              sx={{
                                width: "16px",
                                color: "rgb(46, 204, 113)",
                                marginRight: "2px",
                              }}
                            />

                            <Typography color="rgb(220,221,222)">
                              {group}
                            </Typography>
                          </Grid>
                        }
                        sx={{
                          borderRadius: 1,
                          bgcolor: "rgb(41, 43, 47)",
                          height: "22px",
                          marginRight: "5px",
                        }}
                      />
                    ))}
                  </Grid>
                  <Popover
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    color="transparent"
                    sx={{
                      ".MuiPopover-paper": {
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    <AddGroup />
                  </Popover>
                  <Grid item>
                    <Chip
                      deleteIcon={
                        <Add
                          sx={{
                            width: "16px",
                            height: "16px",
                          }}
                        />
                      }
                      onDelete={(event) => setAnchorEl(event.currentTarget)}
                      sx={{
                        bgcolor: "rgb(41,43,47)",
                        borderRadius: 1.5,
                        height: "22px",
                        width: "22px",
                        "& .MuiChip-deleteIcon": {
                          color: "rgb(201, 202, 203)",
                          marginRight: "17px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sx={{ visibility: hovers[user.fullname] || "hidden" }}>
                <BootstrapTooltip title="编辑服务器个人资料" placement="top">
                  <Pencil />
                </BootstrapTooltip>
              </Grid>
            </Grid>
            <Box
              sx={{
                borderTop: "1px solid rgb(63, 66, 72)",
                marginY: "16px",
              }}
            />
          </>
        ))}
    </>
  );
};
const EditServer = (props) => {
  const [editServer] = useEditServerMutation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChannel, setSelectedChannel] = useState(-1);
  const [openWaring, setOpenWarning] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [checked, setChecked] = useState(false);
  const { serverId } = useParams();
  const { data: server } = useGetServerQuery(serverId);
  const [value, setValue] = useState(server?.name);
  const Tabs = ["概况", "身份组", "成员", "邀请"];
  const initialState = () => {
    setValue(server?.name);
    setChecked(server?.hasWelcome);
    setSelectedChannel(-1);
  };
  const isInitialState = useCallback(() => {
    return (
      value === server?.name &&
      checked === server?.hasWelcome &&
      selectedChannel === -1
    );
  }, [checked, selectedChannel, server?.hasWelcome, server?.name, value]);
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
        onSave={() => {
          editServer({
            serverId,
            body: {
              name: value,
            },
          });
          setOpenWarning(false);
        }}
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
              <CustomDivider variant="short" />
              <CustomMenuItem
                onClick={() => console.log(`delete server ${serverId}`)}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  删除服务器
                  <Delete sx={{ width: "16px", height: "16px" }} />
                </Grid>
              </CustomMenuItem>
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
              {openDetail ? (
                <GroupDetail onOpenDetail={setOpenDetail} />
              ) : (
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
                      value={value}
                      setValue={setValue}
                      checked={checked}
                      setChecked={setChecked}
                      selectedChannel={selectedChannel}
                      setSelectedChannel={setSelectedChannel}
                    />
                  )}
                  {selectedTab === 1 && (
                    <GroupOptions onOpenDetail={setOpenDetail} />
                  )}

                  {selectedTab === 2 && <PeopleOptions />}
                  {selectedTab === 3 && <InviteOptions />}
                  <Box sx={{ height: "165px" }}></Box>
                </Box>
              )}
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
export default EditServer;
