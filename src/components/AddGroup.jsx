import { Circle } from "@mui/icons-material";
import { Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router";
import { useGetAllServerGroupsQuery } from "../services/serverSlice";
import { useAddGroupToUserMutation } from "../services/userSlice";
import SearchWidget from "./SearchWidget";
const GroupItem = ({ group, user_id, onClose }) => {
  const [addGroupToUser] = useAddGroupToUserMutation();
  return (
    <Grid
      container
      alignItems="center"
      onClick={() => {
        addGroupToUser({ userId: user_id, body: { groupId: group?.id } });
        onClose();
      }}
      sx={{
        ":hover": {
          bgcolor: "rgb(64, 68, 75)",
        },
        borderRadius: 1,
        cursor: "pointer",
        height: "40px",
        marginBottom: "4px",
      }}
    >
      <Circle sx={{ width: "14px", color: group?.color, marginX: "8px" }} />
      <Typography variant="dialogTitle" color="rgb(185,187,190)">
        {group?.name}
      </Typography>
    </Grid>
  );
};
const AddGroup = ({ user_id, onClose }) => {
  const [value, setValue] = useState("");
  const { serverId } = useParams();
  const { data: groups } = useGetAllServerGroupsQuery(serverId);
  return (
    <Card sx={{ bgcolor: "rgb(54, 57, 63)", padding: "8px" }}>
      <Box marginBottom="8px">
        <SearchWidget
          placeholder="身份组"
          width="232px"
          height="34px"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "232px", sm: "300px" },
          paddingY: "8px",
          minHeight: "230px",
        }}
      >
        {groups
          ?.filter((group) => group.name.includes(value))
          .map((group, index) => (
            <GroupItem
              key={index}
              group={group}
              user_id={user_id}
              onClose={onClose}
            />
          ))}
      </Box>
    </Card>
  );
};
export default AddGroup;
