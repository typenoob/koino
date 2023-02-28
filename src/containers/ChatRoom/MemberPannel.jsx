import { List, ListItemButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import User from "../../components/User";
import UserCard from "../../components/UserCard";
import { useGetGroupUsersQuery } from "../../services/groupSlice";
import {
  useGetServerGroupsQuery,
  useGetServerUsersQuery,
} from "../../services/serverSlice";
import { useGetCurrentUserQuery } from "../../services/userSlice";
import UserAction from "../menu/UserAction";
const mapStateToProps = (state) => ({
  ...state.memberList,
});
const mapDispatchToProps = (dispatch) => ({});
const MemberItem = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const { data: currentUser } = useGetCurrentUserQuery();
  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: -16,
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        color="transparent"
        sx={{
          ".MuiPopover-paper": {
            bgcolor: "transparent",
          },
        }}
      >
        <UserCard user={user} />
      </Popover>
      <UserAction
        anchorEl={anchorEl1}
        onClose={() => setAnchorEl1(null)}
        me={currentUser?.id === user?.id}
      />
      <ListItemButton
        onClick={(event) => setAnchorEl(event.currentTarget)}
        onContextMenu={(event) => {
          setAnchorEl1(event.currentTarget);
          event.preventDefault();
        }}
        sx={{
          width: "208px",
          height: "42px",
          padding: "0px 8px",
          margin: "0.5px auto",
          boxSizing: "border-box",
          borderRadius: "4px",
          opacity: user?.isOnline || 0.3,
          ":hover": {
            bgcolor: "tertiary.main",
            color: "text.primary",
          },
          bgcolor: Boolean(anchorEl) ? "tertiary.main" : "inherit",
          color: Boolean(anchorEl) ? "text.primary" : "inherit",
        }}
      >
        <User username={user?.username} status={user?.status} id={user?.id} />
      </ListItemButton>
    </>
  );
};
const MemberGroup = ({ name, id }) => {
  const { data: members } = useGetGroupUsersQuery(id);
  return <MemberGroupDisplay name={name} id={id} members={members} />;
};
const MemberGroupDisplay = ({ name, id, members }) => {
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "24px 8px 0px 16px",
          color: "#96989D",
          height: "16px",
        }}
      >{`${name} — ${members?.length}`}</Typography>
      {members?.map((member) => {
        return <MemberItem user={member} key={member?.id} />;
      })}
    </>
  );
};
const MemberPanel = () => {
  const { serverId } = useParams();
  const { data: groups } = useGetServerGroupsQuery({ serverId, split: true });
  const { data: onlineMembers } = useGetServerUsersQuery({
    serverId,
    online: true,
  });
  const { data: offlineMembers } = useGetServerUsersQuery({
    serverId,
    online: false,
  });
  return (
    <List
      className="member-pannel"
      sx={{
        padding: 0,
        height: "100%",
        width: "100%",
        position: "relative",
        overflowX: "hidden",
        overflowY: "scroll",
        userSelect: "none",
      }}
    >
      {groups?.map((group, index) => (
        <MemberGroup key={index} name={group.name} id={group.id} />
      ))}
      {}
      <MemberGroupDisplay name={"在线"} members={onlineMembers} />
      <MemberGroupDisplay name={"离线"} members={offlineMembers} />
    </List>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MemberPanel);
