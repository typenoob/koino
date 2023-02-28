import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useParams } from "react-router";
import IdentityAvatar from "../../components/IdentityAvatar";
import {
  useAddAccessGroupsMutation,
  useAddAccessUsersMutation,
} from "../../services/channelSlice";
import {
  useGetAllServerGroupsQuery,
  useGetAllServerUsersQuery,
} from "../../services/serverSlice";
import { Tag } from "../../svgs";
const ListItem = (props) => {
  const { color, group, people, name, after, tip, selected, onSelected } =
    props;
  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      container
      sx={{
        borderRadius: 2,
        padding: "8px 6px",
        ":hover": {
          bgcolor: "rgb(69, 73, 80)",
        },
      }}
    >
      <Grid item>
        <Grid container alignItems="center">
          <Checkbox
            checked={selected}
            onChange={onSelected}
            sx={{
              padding: 0,
              "&.Mui-checked": {
                color: "rgb(88, 101, 242)",
              },
            }}
          />
          <Grid item sx={{ paddingX: "6px" }}>
            <IdentityItem
              color={color}
              people={people}
              group={group}
              name={name}
            />
          </Grid>

          <Typography variant="body1" color="rgb(163,166,170)">
            {after}
          </Typography>
        </Grid>
      </Grid>

      <Grid item>
        <Typography variant="body1" color="rgb(163,166,170)">
          {tip}
        </Typography>
      </Grid>
    </Grid>
  );
};
const IdentityItem = (props) => {
  const { color, group, people, name } = props;
  return (
    <Grid container alignItems="center">
      <IdentityAvatar color={color} group={group} people={people} />
      <Typography
        variant="body5"
        sx={{
          color: "rgb(220,221,222)",
          marginLeft: "8px",
        }}
      >
        {name}
      </Typography>
    </Grid>
  );
};
const AddIdentity = (props) => {
  const [value, setValue] = useState("");
  const { serverId, channelId } = useParams();
  const { data: groupList, isSuccess: groupSuccess } =
    useGetAllServerGroupsQuery(serverId);
  const { data: peopleList, isSuccess: peopleSuccess } =
    useGetAllServerUsersQuery(serverId);
  const [addAccessGroup] = useAddAccessGroupsMutation();
  const [addAccessUser] = useAddAccessUsersMutation();
  const [selected, setSelected] = useState({});
  const filter = (type) => {
    if (type === "group") {
      return groupList?.filter((item) => {
        return item.name?.toLowerCase().includes(value.toLowerCase());
      });
    } else if (type === "people") {
      return peopleList?.filter((item) => {
        return item.username
          ?.toLowerCase()
          .includes(
            value[0] === "@"
              ? value.substring(1).toLowerCase()
              : value.toLowerCase()
          );
      });
    }
  };
  return (
    <Dialog
      {...props}
      sx={{
        "& .MuiDialog-paper": {
          overflowY: "hidden",
          backgroundColor: "rgb(54, 57, 63)",
          color: "rgb(220,221,222)",
          borderRadius: "10px",
          position: "relative",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
      }}
    >
      <DialogTitle
        typography="h1"
        sx={{
          color: "white",
          textAlign: "center",
          paddingBottom: "1px",
          marginTop: "20px",
        }}
      >
        添加成员或身份组
      </DialogTitle>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        marginBottom="16px"
      >
        <SvgIcon sx={{ width: "20px", height: "20px" }}>
          <Tag />
        </SvgIcon>
        <Typography variant="body6" color="rgb(185,187,190)">
          123
        </Typography>
      </Grid>
      <Box sx={{ width: "405px", marginBottom: "6px", paddingX: "12px" }}>
        {groupSuccess &&
          peopleSuccess &&
          Array.from(
            new Array(groupList.length + peopleList.length),
            (item, index) => selected[index]
          )?.map((item, index) => {
            if (index < groupList.length) {
              return (
                item && (
                  <Chip
                    key={index}
                    onDelete={() =>
                      setSelected({
                        ...selected,
                        [index]: false,
                      })
                    }
                    label={
                      <IdentityItem
                        group
                        name={groupList[index].name}
                        color={groupList[index].color}
                      />
                    }
                    sx={{ marginBottom: "2px" }}
                  />
                )
              );
            } else {
              return (
                item && (
                  <Chip
                    key={index}
                    onDelete={() =>
                      setSelected({
                        ...selected,
                        [index]: false,
                      })
                    }
                    label={
                      <IdentityItem
                        people
                        name={peopleList[index - groupList.length].username}
                        color={peopleList[index - groupList.length].color}
                      />
                    }
                    sx={{ marginBottom: "2px" }}
                  />
                )
              );
            }
          })}
      </Box>
      <Box sx={{ width: "405px", padding: "0 16px 12px 16px" }}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="standard"
          placeholder="例: 管理员, @wumpus"
          InputProps={{ disableUnderline: true }}
          sx={{
            borderRadius: 1,
            border: "1px solid rgb(32, 34, 37)",
            bgcolor: "rgb(47, 49, 54)",
            width: "379px",
            paddingX: "8px",
            marginBottom: "8px",
            "& .MuiInputBase-input": {
              padding: 0,
              height: "30px",
              typography: "body6",
            },
          }}
        />
        <Typography>
          通过以@作为开头键入内容或者输入身份组名称来添加个体成员
        </Typography>
      </Box>
      <Box
        className="scroll-container"
        sx={{ marginX: "16px", minHeight: "32px", overflowY: "auto" }}
      >
        <Typography component="div" variant="display" marginBottom="8px">
          身份组
        </Typography>
        {filter("group")?.map((item, index) => (
          <ListItem
            selected={selected[index]}
            onSelected={() =>
              setSelected({
                ...selected,
                [index]: !selected[index],
              })
            }
            key={index}
            group
            color={item.color}
            name={item.name}
            tip="身份组"
          />
        ))}

        <Typography component="div" variant="display" marginY="8px">
          成员
        </Typography>
        {filter("people")?.map((item, index) => (
          <ListItem
            selected={selected[index + groupList.length]}
            onSelected={() =>
              setSelected({
                ...selected,
                [index + groupList.length]: !selected[index + groupList.length],
              })
            }
            key={index}
            people
            color={item.color}
            name={item.username}
            after={`${item.fullName}`}
          />
        ))}
      </Box>
      <DialogActions
        sx={{
          bgcolor: "rgb(47, 49, 54)",
          height: "38px",
          padding: "16px",
        }}
      >
        <Button
          variant="text"
          onClick={(e) => {
            props.onClose();
          }}
          sx={{
            color: "rgb(255, 255, 255)",
            typography: "body3",
            ":hover": {
              textDecoration: "underline",
            },
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            let groupIds = [];
            let userIds = [];
            Object.keys(selected).forEach((item) => {
              if (selected[item] && item < groupList.length) {
                groupIds.push(groupList[item].id);
              } else if (selected[item]) {
                userIds.push(peopleList[item - groupList.length].id);
              }
              addAccessGroup({ channelId, body: { groupIds } });
              addAccessUser({ channelId, body: { userIds } });
            });
            props.onClose();
          }}
          autoFocus
          disabled={!Object.values(selected).some((item) => item)}
          sx={{
            width: "60px",
            height: "32px",
            pointerEvents: "all!important",
            bgcolor: Object.values(selected).some((item) => item)
              ? "rgb(88, 101, 242)"
              : "rgb(67, 75, 148)",
            cursor: Object.values(selected).some((item) => item)
              ? "pointer"
              : "not-allowed!important",
            ":hover": {
              bgcolor: Object.values(selected).some((item) => item)
                ? "rgb(71, 82, 196)"
                : "rgb(67, 75, 148)",
            },
          }}
        >
          <Typography
            variant="body3"
            sx={{
              color: Object.values(selected).some((item) => item)
                ? "rgb(255, 255, 255)"
                : "rgb(151, 152, 154)",
            }}
          >
            完成
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddIdentity;
