import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useHover from "../utils/useHover";
//TODO:展示标注的消息
export default function PinnedMessages() {
  const [openedPopover, setOpenedPopover] = useState(false);
  const [hoverRef, isHovered] = useHover();
  const popoverEnter = ({ currentTarget }) => {
    setOpenedPopover(true);
  };

  const popoverLeave = ({ currentTarget }) => {
    setOpenedPopover(false);
  };
  return (
    <Card sx={{ bgcolor: "rgb(47, 49, 54)", width: 420 }}>
      <CardHeader
        avatar={"已标注消息"}
        sx={{
          bgcolor: "rgb(32, 34, 37)",
          width: 420,
          height: 20,
          padding: "16px",
          typography: "body7",
        }}
      />
      <Popover
        open={openedPopover}
        anchorEl={hoverRef.current}
        onClose={() => setOpenedPopover(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: -5,
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
        <>
          <Button
            sx={{
              minWidth: 40,
              height: 28,
              bgcolor: "rgb(47, 49, 54)",
              color: "rgb(185, 187, 190)",
              ":hover": {
                bgcolor: "rgb(47, 49, 54)",
                color: "rgb(220, 221, 222)",
              },
              typography: "body",
            }}
          >
            跳到
          </Button>
          <Button
            sx={{
              minWidth: 40,
              height: 28,
              bgcolor: "transparent",
              border: "none",
              color: "rgb(185, 187, 190)",
              ":hover": {
                bgcolor: "transparent",
                color: "rgb(220, 221, 222)",
              },
            }}
          >
            <Close sx={{ width: 18, height: 18 }} />
          </Button>
        </>
      </Popover>
      <CardContent sx={{ padding: "8px" }}>
        <ListItem
          ref={hoverRef}
          onMouseEnter={popoverEnter}
          onMouseLeave={popoverLeave}
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
            marginBottom: "6px",
            bgcolor: "rgb(54, 57, 63)",
            border: "1px solid rgb(32, 34, 37)",
            width: 406,
            height: 79,
            borderRadius: 0.5,
          }}
        >
          <ListItemAvatar>R</ListItemAvatar>
          <ListItemText
            primary={
              <>
                <Typography
                  component="span"
                  variant="username1"
                  sx={{ color: "text.primary" }}//text.primary=rgb(255,255,255)
                >
                  coyote
                  <Typography
                    component="span"
                    align="right"
                    variant="body4"
                    sx={{
                      color: "text.secondary",
                      paddingLeft: 5,
                    }}
                  >
                    2021/10/10
                  </Typography>
                </Typography>
              </>
            }
            secondary={
              <Typography
                variant="body2"
                color="rgb(220,221,222)"
                sx={{
                  whiteSpace: "pre-wrap",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {"123"}
              </Typography>
            }
          ></ListItemText>
        </ListItem>
      </CardContent>
    </Card>
  );
}
