import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Logo, Shield, Square, SquareChecked } from "../../svgs";

//TODO: 添加成员
export default function AddUser({ userChecks, setUserChecks, ...props }) {
  const [value, setValue] = useState("");
  const users = [
    { name: "coyote", fullname: "coyote#4679" },
    { name: "coyote", fullname: "coyote#2233" },
  ];
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
        添加成员
      </DialogTitle>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        marginBottom="16px"
      >
        <Shield style={{ width: "16px", color: "rgb(52, 152, 219)" }} />
        <Typography variant="body6" color="rgb(185,187,190)" marginLeft="4px">
          123
        </Typography>
      </Grid>
      <Box sx={{ width: "405px", marginBottom: "6px", paddingX: "12px" }}></Box>
      <Box sx={{ width: "405px", padding: "0 16px 12px 16px" }}>
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="standard"
          placeholder="搜索成员"
          InputProps={{ disableUnderline: true }}
          sx={{
            borderRadius: 1,
            border: "1px solid rgb(32, 34, 37)",
            bgcolor: "rgb(47, 49, 54)",
            width: "379px",
            paddingX: "8px",
            marginBottom: "8px",
            "& .MuiInputBase-input": {
              paddingX: 0,
              height: "30px",
              typography: "body6",
            },
          }}
        />
      </Box>
      <Box
        className="scroll-container"
        sx={{ marginX: "16px", minHeight: "260px", overflowY: "auto" }}
      >
        <Typography component="div" variant="display" marginY="8px">
          成员
        </Typography>
        {users
          .filter((user) => user.fullname.includes(value))
          .map((user, index) => (
            <Grid
              key={index}
              container
              alignItems="center"
              onClick={() =>
                setUserChecks({
                  ...userChecks,
                  [user.fullname]: !userChecks[user.fullname],
                })
              }
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
              <IconButton>
                {userChecks[user.fullname] ? <SquareChecked /> : <Square />}
              </IconButton>
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  bgcolor: "rgb(59, 165, 92)",
                  borderRadius: "50%",
                  marginLeft: "8px",
                }}
              >
                <Logo width="12px" style={{ margin: "auto" }} />
              </Box>

              <Typography variant="username2" color="white" marginLeft="4px">
                {user.name}
              </Typography>
              <Typography variant="username2" marginLeft="4px">
                {user.fullname}
              </Typography>
            </Grid>
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
          onClick={() => {
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
          onClick={() => {}}
          autoFocus
          sx={{
            width: "96px",
            height: "38px",
            bgcolor: "rgb(88, 101, 242)",
            ":hover": {
              bgcolor: "rgb(71, 82, 196)",
            },
          }}
        >
          <Typography variant="body3" sx={{ color: "rgb(255, 255, 255)" }}>
            添加
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
