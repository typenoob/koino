import { AddReaction, Delete, PushPin } from "@mui/icons-material";
import { Button, Grid, Popover } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDeleteMessagesMutation } from "../services/messageSlice";
import useHover from "../utils/useHover";
import BootstrapTooltip from "./BootstrapTooltip";
const MessageItem = ({ message, attachment, timestamp }) => {
  const ref = useRef(null);
  const [hoverRef, isHovered] = useHover();
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };
  const [deleteMessage] = useDeleteMessagesMutation();
  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };
  const renderEmojiToPic = () => {
    if (ref.current) {
      const text = ref.current.innerHTML;
      const reg = /\[([0-9a-fA-F]{4,5})\]/g;
      const result = text?.replace(reg, (match, p1) => {
        const url = `https://twemoji.maxcdn.com/v/latest/svg/${p1}.svg`;
        return `\n<img class="emoji" src=${url} />`;
      });
      ref.current.innerHTML = result;
    }
  };
  useEffect(() => {
    renderEmojiToPic();
  }, []);
  return (
    <Box
      ref={hoverRef}
      sx={{
        bgcolor: isHovered ? "rgb(50, 53, 59)" : "transparent",
      }}
      onMouseEnter={popoverEnter}
      onMouseLeave={popoverLeave}
    >
      <Popover
        open={openedPopover}
        anchorEl={hoverRef.current}
        onClose={() => setOpenedPopover(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: 15,
          horizontal: 100,
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
        sx={{
          pointerEvents: "none",
          ".MuiPopover-paper": {
            bgcolor: "transparent",
            pointerEvents: "auto",
          },
        }}
      >
        <Grid
          container
          flexWrap="nowrap"
          alignItems="center"
          sx={{ bgcolor: "rgb(54, 57, 63)" }}
        >
          <BootstrapTooltip title="添加反应" placement="top">
            <Button
              sx={{
                minWidth: "auto",
                ":hover": { bgcolor: "rgb(64, 68, 75)" },
              }}
            >
              <AddReaction
                sx={{
                  color: "rgb(185, 187, 190)",
                  width: "22px",
                  height: "22px",
                }}
              />
            </Button>
          </BootstrapTooltip>
          <BootstrapTooltip title="标注信息" placement="top">
            <Button
              sx={{
                minWidth: "auto",
                ":hover": { bgcolor: "rgb(64, 68, 75)" },
              }}
            >
              <PushPin
                sx={{
                  color: "rgb(185, 187, 190)",
                  width: "22px",
                  height: "22px",
                }}
              />
            </Button>
          </BootstrapTooltip>

          <BootstrapTooltip title="删除信息" placement="top">
            <Button
              onClick={() => deleteMessage({ messageId: message?.id })}
              sx={{
                minWidth: "auto",
                ":hover": { bgcolor: "rgb(64, 68, 75)" },
              }}
            >
              <Delete
                sx={{
                  color: "rgb(130, 46, 48)",
                  width: "22px",
                  height: "22px",
                }}
              />
            </Button>
          </BootstrapTooltip>
        </Grid>
      </Popover>
      {!attachment ? (
        <ListItem
          alignItems="flex-start"
          sx={{
            paddingBottom: 0,
          }}
        >
          <ListItemAvatar>
            <Avatar alt="Coyote" src="" />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="username1"
                  sx={{ color: "text.primary" }}
                >
                  {message.user?.username}
                  <Typography
                    component="span"
                    align="right"
                    variant="body4"
                    sx={{
                      color: "text.secondary",
                      paddingLeft: 5,
                    }}
                  >
                    {moment(message.timestamp, "YYYY-MM-DD HH:mm:ss")
                      .locale("zh-cn")
                      .calendar()}
                  </Typography>
                </Typography>
              </>
            }
            secondary={
              <Typography
                ref={ref}
                variant="body2" // 会自动为映射body2的字体、大小、厚度
                color="rgb(220,221,222)"
                sx={{
                  whiteSpace: "pre-wrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {message.content}
              </Typography>
            }
          />
        </ListItem>
      ) : (
        <ListItem
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <ListItemAvatar>
            {isHovered && (
              <BootstrapTooltip
                title={moment(timestamp, "YYYY-MM-DD HH:mm:ss")
                  .locale("zh-cn")
                  .format("LLLL")}
                placement="top"
              >
                <Typography variant="small" color="rgb(163,166,170)">
                  {moment(timestamp, "YYYY-MM-DD HH:mm:ss")
                    .locale("zh-cn")
                    .format("HH:mm")}
                </Typography>
              </BootstrapTooltip>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography
                ref={ref}
                variant="body2"
                color="rgb(220,221,222)"
                sx={{
                  whiteSpace: "pre-wrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {message.content}
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      )}
    </Box>
  );
};
MessageItem.defaultProps = { attachment: false };
export default MessageItem;
