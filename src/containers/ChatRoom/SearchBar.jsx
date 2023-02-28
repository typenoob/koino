import { Grid, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import PinnedMessages from "../../components/PinnedMessage";
import SearchWidget from "../../components/SearchWidget";
import SvgWrapper from "../../components/SvgWrapper";
import { DoubleUser, Notifications, PushPin, Tag } from "../../svgs";
import NoticeSetting from "../menu/NoticeSetting";
const mapStateToProps = (state) => ({
  ...state.channel,
});
const mapDispatchToProps = (dispatch) => ({});
const SearchBar = (props) => {
  const { channel, userPannelCollapse, onUserPannelCollapse } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  return (
    <Grid
      container
      wrap="nowrap"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        bgcolor: "quaternary.main",
        height: "100%",
        padding: "0px 8px",
        boxSizing: "border-box",
        boxShadow:
          "0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05)",
        position: "relative",
      }}
    >
      <Grid item>
        <Grid
          container
          wrap="nowrap"
          alignItems="center"
          sx={{ overflow: "hidden" }}
        >
          <Grid
            item
            sx={{
              width: "24px",
              height: "24px",
              margin: "0px 8px",
              flex: "0 0 auto",
            }}
          >
            <Tag />
          </Grid>
          <Grid item sx={{ marginRight: "8px", flex: "0 0 auto" }}>
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "17px",
              }}
            >
              {channel?.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          wrap="nowrap"
          columnGap="16px"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            minWidth: 0,
            height: "24px",
            overflow: "hidden",
          }}
        >
          <Grid item sx={{ transform: "scale(1)" }}>
            <NoticeSetting
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            ></NoticeSetting>
            <SvgWrapper
              tooltip="通知设定"
              svg={<Notifications />}
              enable={Boolean(anchorEl)}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            ></SvgWrapper>
          </Grid>
          <Grid item sx={{ transform: "scale(1)" }}>
            <Popover
              open={Boolean(anchorEl1)}
              anchorEl={anchorEl1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: -8,
                horizontal: "right",
              }}
              sx={{
                ".MuiPopover-paper": {
                  bgcolor: "transparent",
                },
              }}
              onClose={() => setAnchorEl1(false)}
            >
              <PinnedMessages />
            </Popover>
            <SvgWrapper
              tooltip="已标注消息"
              svg={<PushPin />}
              enable={Boolean(anchorEl1)}
              onClick={(e) => setAnchorEl1(e.currentTarget)}
            ></SvgWrapper>
          </Grid>
          <Grid item sx={{ transform: "scale(1)" }}>
            <SvgWrapper
              tooltip={!userPannelCollapse ? "隐藏成员名单" : "显示成员名单"}
              onClick={onUserPannelCollapse}
              enable={!userPannelCollapse}
              svg={<DoubleUser />}
            ></SvgWrapper>
          </Grid>
          <Grid item sx={{ marginRight: "84px" }}>
            <SearchWidget
              placeholder="搜索"
              width="140px"
              height="24px"
              marginX="8px"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
