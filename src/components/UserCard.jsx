import {
  Add,
  Brightness2Sharp,
  ChevronRight,
  Circle,
  DoDisturbOn,
  HighlightOff as Delete,
  RadioButtonChecked,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import EditUser from "../containers/dialogs/EditUser";
import {
  useDelelteGroupToUserMutation,
  useGetUserGroupsQuery,
} from "../services/userSlice";
import { Logo as Ghost, Pencil } from "../svgs";
import useHover from "../utils/useHover";
import AddGroup from "./AddGroup";
import BootstrapTooltip from "./BootstrapTooltip";
import UserAvatar from "./UserAvatar";
//TODO: 提取badge
//TODO: 用户选项 提及 添加好友  修改昵称 踢除
const CustomDivider = () => (
  <Divider sx={{ bgcolor: "rgb(51,53,59)", width: "100%", margin: "12px 0" }} />
);
const GroupChip = ({ group, user_id }) => {
  const [deleteGroup] = useDelelteGroupToUserMutation();
  return (
    <Chip
      icon={
        <Circle
          sx={{
            width: "16px",
            height: "16px",
          }}
        />
      }
      label={group?.name}
      deleteIcon={
        <Delete
          sx={{
            width: "16px",
            height: "16px",
          }}
        />
      }
      onDelete={() => {
        deleteGroup({ userId: user_id, body: { groupId: group?.id } });
      }}
      sx={{
        bgcolor: "rgb(41,43,47)",
        borderRadius: 2,
        marginRight: "4px",
        height: "22px",
        typography: "body",
        "& .MuiChip-label": {
          padding: "0 8px",
          paddingBottom: "1px",
        },
        "& .MuiChip-icon": {
          color: group?.color,
        },
        "& .MuiChip-deleteIcon": {
          color: "rgb(255, 255, 255)",
        },
      }}
    />
  );
};
export default function UserCard({
  user,
  nickname = false,
  self = false,
  large = false,
  preview = false,
  onEditProfile,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [changeStatus, setChangeStatus] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
  const [ref, isHovered] = useHover();
  const [hide, setHide] = useState(true);
  const { data: groups } = useGetUserGroupsQuery(user?.id);
  const displayEmail = () =>
    hide ? user?.email?.replace(/(?<=.{0}).(?=.*@)/g, "*") : user?.email;
  return (
    <Card
      sx={{
        borderRadius: large || preview ? 3 : "2px",
        width: large ? "100%" : 340,
        bgcolor: "rgb(41,43,47)",
        position: "relative",
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              bgcolor: "rgb(60,164,92)",
              borderRadius: "50%",
              width: 80,
              height: 80,
              border: "6px solid rgb(41,43,47)",
            }}
          >
            <UserAvatar variant="large" status={user?.status} />
          </Box>
        }
        sx={{
          zIndex: 1,
          background:
            "linear-gradient(rgb(60,164,92) 54.4%, rgb(41,43,47) 45.6%);",
          height: large ? 150 : 110,
          padding: "0 10px",
        }}
      />

      <CardContent
        sx={{
          height: 298,
          paddingTop: 0,
          boxSizing: "border-box",
          bgcolor: "transparent",
          borderRadius: "0 0 2px 2px",
        }}
      >
        <EditUser
          profile
          open={openEditUser}
          onClose={() => setOpenEditUser(false)}
        />
        {!large && !preview && (
          <BootstrapTooltip
            title="编辑个人资料"
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
            <Grid
              container
              onClick={() => setOpenEditUser(true)}
              sx={{
                position: "absolute",
                top: "10px",
                right: "12px",
                width: "18px",
                height: "18px",
                boxSizing: "content-box",
                bgcolor: "rgba(0,0,0,0.3)",
                cursor: "pointer",
                padding: "5px",
                borderRadius: "50%",
                transition: "background-color .2s ease",
                ":hover": {
                  bgcolor: "rgba(0,0,0,0.65)",
                },
              }}
            >
              <Pencil />
            </Grid>
          </BootstrapTooltip>
        )}
        <Card
          sx={{
            bgcolor: "rgb(24,25,28)",
            height: "95%",
            borderRadius: 3,
            padding: "12px",
          }}
        >
          <Grid container justifyContent="space-between">
            {nickname ? (
              <>
                <Typography variant="username" color="white">
                  {user?.nickname}
                </Typography>
                <Typography variant="body3">
                  {user?.username}
                  {user?.discriminator}
                </Typography>
              </>
            ) : (
              <Grid item>
                <Typography
                  component={"span"}
                  color="text.primary"
                  variant="username"
                  gutterBottom
                >
                  {user?.username}
                </Typography>
                <Typography
                  component={"span"}
                  color="rgb(185, 187, 190)"
                  variant="username"
                  gutterBottom
                >
                  {user?.discriminator}
                </Typography>
              </Grid>
            )}

            {large && (
              <Button
                onClick={onEditProfile}
                sx={{
                  bgcolor: "rgb(88, 101, 242)",
                  width: "144px",
                  height: "32px",
                  borderRadius: 1,
                  typography: "body3",
                  color: "white",
                  ":hover": {
                    bgcolor: "rgb(71, 82, 196)",
                  },
                }}
              >
                编辑用户个人资料
              </Button>
            )}
          </Grid>
          <CustomDivider />
          <Typography variant="display" component="div" marginBottom="6px">
            自我介绍
          </Typography>
          <Typography color="rgb(220,221,222)">{user?.intro}</Typography>
          <Typography
            variant="display"
            component="div"
            sx={{ margin: "12px 0 6px 0" }}
          >
            {self ? "KOINO 成员注册时间" : large ? "用户名" : "成员注册时间"}
          </Typography>

          {self ? (
            <>
              <Typography color="rgb(220,221,222)">
                {user?.registerTime}
              </Typography>
              <CustomDivider />
              <Grid
                ref={ref}
                onMouseEnter={() => setChangeStatus(true)}
                onMouseLeave={() => setChangeStatus(false)}
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  bgcolor: changeStatus && "rgb(71, 82, 196)",
                  borderRadius: 0.5,
                  padding: "6px 8px",
                  cursor: "pointer",
                }}
              >
                <Grid item>
                  <Grid container alignItems="center">
                    <Circle
                      sx={{
                        width: "16px",
                        height: "16px",
                        marginRight: "8px",
                        color: "rgb(59, 165, 93)",
                      }}
                    />
                    <Typography variant="body3" color="rgb(185,187,190)">
                      在线
                    </Typography>
                  </Grid>
                </Grid>
                <Popover
                  open={changeStatus}
                  anchorEl={ref.current}
                  onClose={() => setChangeStatus(false)}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: 300,
                  }}
                  transformOrigin={{
                    vertical: "center",
                    horizontal: "left",
                  }}
                  color="transparent"
                  PaperProps={{
                    onMouseEnter: () => setChangeStatus(true),
                    onMouseLeave: () => setChangeStatus(false),
                  }}
                  sx={{
                    pointerEvents: "none",
                    ".MuiPopover-paper": {
                      bgcolor: "transparent",
                      pointerEvents: "auto",
                    },
                  }}
                >
                  <Card sx={{ bgcolor: "rgb(24, 25, 28)", padding: "6px 8px" }}>
                    <Grid
                      container
                      alignItems="center"
                      sx={{
                        borderRadius: 0.5,
                        ":hover": {
                          bgcolor: "rgb(71, 82, 196)",
                        },
                        cursor: "pointer",
                        padding: "6px 8px",
                      }}
                    >
                      <Circle
                        sx={{
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                          color: "rgb(59, 165, 93)",
                        }}
                      />
                      <Typography variant="body3" color="rgb(185,187,190)">
                        在线
                      </Typography>
                    </Grid>
                    <CustomDivider />
                    <Grid
                      container
                      alignItems="center"
                      sx={{
                        borderRadius: 0.5,
                        ":hover": {
                          bgcolor: "rgb(71, 82, 196)",
                        },
                        cursor: "pointer",
                        padding: "6px 8px",
                      }}
                    >
                      <Brightness2Sharp
                        sx={{
                          paddingTop: "2px",
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                          color: "rgb(250, 168, 26)",
                          transform: "rotate(45deg)",
                        }}
                      />
                      <Typography variant="body3" color="rgb(185,187,190)">
                        闲置
                      </Typography>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        borderRadius: 0.5,
                        ":hover": {
                          bgcolor: "rgb(71, 82, 196)",
                        },
                        cursor: "pointer",
                        padding: "6px 8px",
                      }}
                    >
                      <DoDisturbOn
                        sx={{
                          paddingTop: "2px",
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                          color: "rgb(237, 66, 69)",
                        }}
                      />
                      <Grid item>
                        <Grid container direction="column">
                          <Typography variant="body3" color="rgb(185,187,190)">
                            请勿打扰
                          </Typography>
                          <Typography color="rgb(185,187,190)">
                            您将不会收到任何桌面通知
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        borderRadius: 0.5,
                        ":hover": {
                          bgcolor: "rgb(71, 82, 196)",
                        },
                        cursor: "pointer",
                        padding: "6px 8px",
                      }}
                    >
                      <RadioButtonChecked
                        sx={{
                          paddingTop: "2px",
                          width: "16px",
                          height: "16px",
                          marginRight: "8px",
                          color: "rgb(116, 127, 141)",
                        }}
                      />
                      <Grid item sx={{ width: "268px" }}>
                        <Grid container direction="column">
                          <Typography variant="body3" color="rgb(185,187,190)">
                            隐身
                          </Typography>
                          <Typography color="rgb(185,187,190)">
                            您将不会显示在线，但可以使用Koino的所有功能
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Popover>
                <ChevronRight sx={{ width: "18px", height: "18px" }} />
              </Grid>
            </>
          ) : large ? (
            <Box>
              <Typography variant="body6">{user?.username}</Typography>
              <Typography variant="body6" color="rgb(185, 187, 190)">
                {user?.discriminator}
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container alignItems="center" columnGap={1.3}>
                <Grid item>
                  <Box
                    sx={{
                      width: "16px",
                      height: "16px",
                      display: "inline-block",
                    }}
                  >
                    <Ghost />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    color="rgb(220,221,222)"
                    variant="display"
                    component={"div"}
                  >
                    {user?.joinServerTime}
                  </Typography>
                </Grid>
                <Grid
                  item
                  sx={{
                    height: "4px",
                    width: "4px",
                    borderRadius: "50%",
                    bgcolor: "rgb(79, 84, 92)",
                    display: "inline-block",
                  }}
                ></Grid>
                <Grid item>
                  <Box
                    sx={{
                      width: "16px",
                      height: "16px",
                      display: "inline-block",
                    }}
                  >
                    <Ghost />
                  </Box>
                </Grid>
                <Grid item>
                  <Typography
                    color="rgb(220,221,222)"
                    variant="display"
                    component={"div"}
                  >
                    {user?.registerTime}
                  </Typography>
                </Grid>
              </Grid>
              <Typography
                variant="display"
                component="div"
                sx={{ marginTop: "12px" }}
              >
                身份组
              </Typography>
              {groups?.map((group, index) => (
                <GroupChip key={index} group={group} user_id={user?.id} />
              ))}

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: -12,
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                color="transparent"
                sx={{
                  ".MuiPopover-paper": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <AddGroup
                  user_id={user?.id}
                  onClose={() => setAnchorEl(null)}
                />
              </Popover>
              <Chip
                deleteIcon={
                  <Add
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                }
                onDelete={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
                sx={{
                  bgcolor: "rgb(41,43,47)",
                  borderRadius: 1.5,
                  height: "22px",
                  width: "22px",
                  "& .MuiChip-deleteIcon": {
                    color: "rgb(255, 255, 255)",
                    marginRight: "17px",
                  },
                }}
              />
              {preview || (
                <>
                  <Typography
                    variant="display"
                    component="div"
                    sx={{ marginTop: "12px" }}
                  >
                    备注
                  </Typography>
                  <TextField
                    InputProps={{ disableUnderline: true }}
                    variant="filled"
                    placeholder="点击添加备注"
                    sx={{
                      width: "284px",
                      height: "36px",
                      margin: "0px 4px",
                      "& .MuiInputBase-root": {
                        width: "284px",
                        height: "36px",
                        margin: "6px 0px",
                        bgcolor: "transparent",
                      },
                      "& .MuiInputBase-input": {
                        typography: "body1",
                        padding: "3px 2px",
                        ":focus": {
                          "::placeholder": {
                            color: "transparent",
                          },
                        },
                      },
                    }}
                  ></TextField>
                </>
              )}
            </>
          )}
          {large && (
            <>
              <Typography variant="display" component="div" marginTop="12px">
                电子邮件
              </Typography>
              <Box>
                <Typography variant="body6">{displayEmail()}</Typography>
                <Typography
                  variant="body6"
                  color="rgb(0,175,244)"
                  padding="2px 4px"
                  onClick={() => setHide(!hide)}
                  sx={{
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {hide ? "显示" : "隐藏"}
                </Typography>
              </Box>
              <Typography variant="display" component="div" marginTop="12px">
                手机号码
              </Typography>
              <Typography variant="body6">您还没有添加手机号码。</Typography>
            </>
          )}
        </Card>
      </CardContent>
    </Card>
  );
}
