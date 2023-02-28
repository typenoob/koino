import { TagFaces } from "@mui/icons-material";
import { IconButton, InputAdornment, Popover, TextField } from "@mui/material";
import { Box } from "@mui/system";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { isEmojiSupported } from "is-emoji-supported";
import { useRef, useState } from "react";
import { useParams } from "react-router";
import { useGetCurrentUserQuery } from "../services/userSlice";
import useSocket from "../utils/useSocket";
const TypingArea = (props) => {
  const ref = useRef(null);
  const socket = useSocket();
  const [message, setMessageForm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const { channelId } = useParams();
  const { data: user } = useGetCurrentUserQuery();
  const onEmojiClick = (emojiObject, event) => {
    const cursor = ref.current.selectionStart;
    const insert = isEmojiSupported(emojiObject.emoji)
      ? emojiObject.emoji
      : `[${emojiObject.unified}]`;
    const text = message.slice(0, cursor) + insert + message.slice(cursor);
    setMessageForm(text);
    const newCursor = cursor + insert.length;
    setTimeout(() => ref.current.setSelectionRange(newCursor, newCursor), 10);
  };
  const showEmoji = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <EmojiPicker theme={Theme.DARK} onEmojiClick={onEmojiClick} />
      </Popover>
      <></>
      <TextField
        variant="outlined"
        placeholder={props.placeholder}
        value={message}
        onChange={(e) => setMessageForm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (message.length > 0) {
              socket.current.emit("send_message", {
                content: message,
                channel: { id: channelId },
                user: { id: user?.id },
              });
              setMessageForm("");
            }
          }
        }}
        inputRef={ref}
        size="small"
        multiline
        sx={{
          m: 1,
          margin: "auto",
          paddingRight: "10px",
          width: "100%",
          height: "100%",

          "& fieldset": {
            paddingLeft: (theme) => theme.spacing(2.5),
            bgcolor: "rgb(64,68,75)",
            borderRadius: "10px",
            border: "none",
          },
          "& textarea": {
            zIndex: 1,
            typography: "body2",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ zIndex: 1 }}>
              {
                <IconButton onClick={showEmoji}>
                  <TagFaces
                    sx={{
                      fill: "rgb(206,206,206)",
                    }}
                  />
                </IconButton>
              }
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};
export default TypingArea;
