import { Colorize } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React from "react";

const ColorPicker = ({ init_color }) => {
  const [color, setColor] = React.useState(init_color);

  const handleChange = (color) => {
    setColor(color);
  };

  return (
    <MuiColorInput
      value={color}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Colorize
              sx={{
                position: "absolute",
                width: "20px",
                top: 0,
                right: 0,
              }}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        width: "70px",
        height: "50px",
        borderRadius: "4px",
        border: "1px solid rgb(74, 77, 83)",
        cursor: "pointer",
        bgcolor: color,
        ":hover": {
          bgcolor: color,
        },
        "& .MuiInputBase-input": {
          visibility: "hidden",
        },
      }}
    />
  );
};
export default ColorPicker;
