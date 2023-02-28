import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import PrivateSwitch from "../../components/PrivateSwitch";
import { useAddNewSortsMutation } from "../../services/serverSlice";
const AddSort = (props) => {
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [addNewSort, { isLoading }] = useAddNewSortsMutation();
  const { serverId } = useParams();
  return (
    <Dialog
      {...props}
      onClose={() => {
        props.onClose();
      }}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "rgb(54, 57, 63)",
          borderRadius: "10px",
          position: "relative",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
        },
      }}
    >
      <IconButton
        onClick={props.onClose}
        sx={{
          color: "rgb(119, 122, 127)",
          ":hover": {
            color: "rgb(220, 221, 222)",
          },
        }}
      >
        <Close
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            width: "24px",
            height: "24px",
          }}
        />
      </IconButton>
      <DialogTitle sx={{ padding: "16px", height: "48px" }}>
        <Typography variant="dialogTitle">创建类别</Typography>
      </DialogTitle>

      <DialogContent className="scrollable" sx={{ padding: "0px 16px" }}>
        <Typography sx={{ color: "rgb(220, 221, 222)", marginBottom: "8px" }}>
          频道名称
        </Typography>
        <TextField
          variant="standard"
          placeholder="新类别"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            borderRadius: 1,
            bgcolor: "rgb(32, 34, 37)",
            width: "408px",
            height: "20px",
            padding: "10px",
            marginBottom: "20px",
            "& .MuiInputBase-input": {
              padding: 0,
              typography: "body6",
            },
          }}
        />
        <PrivateSwitch
          checked={checked}
          setChecked={setChecked}
          label="私密类别"
        />
        <Typography
          varaint="body5"
          sx={{
            color: "rgb(185, 187, 190)",
            marginBottom: "20px",
            maxWidth: 428,
          }}
        >
          将类别设为私密，则只有所选成员以及身份组将能够查看此类别。此类别下的同步频道将会自动与该设置匹配。
        </Typography>
      </DialogContent>
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
          onClick={() => {
            addNewSort({
              serverId,
              body: { name: value, isPrivate: checked },
            });
            props.onClose();
          }}
          autoFocus
          disabled={!value}
          sx={{
            width: "96px",
            height: "38px",
            pointerEvents: "all!important",
            bgcolor: value ? "rgb(88, 101, 242)" : "rgb(67, 75, 148)",
            cursor: value ? "pointer" : "not-allowed!important",
            ":hover": {
              bgcolor: value ? "rgb(71, 82, 196)" : "rgb(67, 75, 148)",
            },
          }}
        >
          <Typography
            variant="body3"
            sx={{ color: value ? "rgb(255, 255, 255)" : "rgb(151, 152, 154)" }}
          >
            创建类别
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddSort;
