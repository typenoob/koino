import { Box, Divider, List, Typography } from "@mui/material";
import moment from "moment/moment";
import { Fragment, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import MessageItem from "../../components/MessageItem";
import TypingArea from "../../components/TypingArea";
import { useGetChannelQuery } from "../../services/channelSlice";
import { useGetMessagesQuery } from "../../services/messageSlice";
import useSocket from "../../utils/useSocket";
const mapStateToProps = (state) => ({
  ...state.messageList,
  ...state.channel,
});
const mapDispatchToProps = (dispatch) => ({});
const MessageScreen = function () {
  const { channelId } = useParams();
  const { data: oldMessages } = useGetMessagesQuery(channelId);
  const { data: channel } = useGetChannelQuery(channelId);
  const [messages, setMessages] = useState([]);
  const areaRef = useRef();
  useEffect(() => {
    setMessages(oldMessages);
  }, [oldMessages]);
  const similarTimestamp = (timeA, timeB) => {
    if (timeA === null || timeB === null) return false;
    return (
      moment(timeA, "YYYY-MM-DD HH:mm:ss").diff(
        moment(timeB, "YYYY-MM-DD HH:mm:ss"),
        "minutes"
      ) < 10
    );
  };
  const sameDate = (timeA, timeB) => {
    if (timeA === null || timeB === null) return false;
    return (
      moment(timeA, "YYYY-MM-DD HH:mm:ss").diff(
        moment(timeB, "YYYY-MM-DD HH:mm:ss"),
        "days"
      ) === 0
    );
  };
  useEffect(() => {
    if (areaRef.current) {
      areaRef.current.scrollTop = areaRef?.current.scrollHeight;
    }
  }, [messages]);
  const socket = useSocket();
  socket.current?.on("get_message", (message) => {
    message.channel = { id: channelId };
    setMessages(messages?.concat(message));
  });

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        bgcolor: "rgb(54,57,63)",
        flexDirection: "column",
      }}
    >
      <Box
        className="scroll-container"
        ref={areaRef}
        sx={{
          padding: "0px 16px",
          flexGrow: 1,
          overflowY: "scroll",
        }}
      >
        <List sx={{ width: "100%" }}>
          {messages?.map((message, index) => {
            let isSameUser = message?.user.id === messages[index - 1]?.user.id;
            let attachment =
              isSameUser &&
              similarTimestamp(
                message.timestamp,
                messages[index - 1]?.timestamp
              );
            if (
              similarTimestamp(
                message.timestamp,
                messages[index - 1]?.timestamp
              )
            ) {
              return (
                <Fragment key={message.id}>
                  <MessageItem
                    message={message}
                    attachment={attachment}
                    timestamp={message.timestamp}
                  />
                </Fragment>
              );
            } else {
              return (
                <Fragment key={message.id}>
                  {!sameDate(
                    message.timestamp,
                    messages[index - 1]?.timestamp
                  ) && (
                    <Divider
                      spacing={2}
                      sx={{
                        "&::before, &::after": {
                          borderColor: "modifier.accent",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "primary.fontFamily",
                          fontSize: "display.fontSize",
                          fontWeight: "primary.fontWeight",
                        }}
                      >
                        {moment(message.timestamp, "YYYY-MM-DD HH:mm:ss")
                          .locale("zh-cn")
                          .format("ll")}
                      </Typography>
                    </Divider>
                  )}

                  <MessageItem message={message} />
                </Fragment>
              );
            }
          })}
        </List>
      </Box>
      <Box
        sx={{
          height: "68px",
          flexShrink: 0,
          width: "100%",
          position: "relative",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            padding: "0px 16px",
            top: "0px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <TypingArea placeholder={`给 #${channel?.name} 发消息`} />
        </Box>
      </Box>
    </Box>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
