import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
export default function SearchWidget({ marginX, width, height, ...props }) {
  return (
    <TextField
      {...props}
      inputProps={{ style: { bgcolor: "secondary.main" } }}
      sx={{
        m: 1,
        marginX: marginX || 0,
        width: width,
        height: height,
        padding: "0px 2px",
        "& .MuiInputBase-root": {
          bgcolor: "secondary.main",
          height: height,
          paddingRight: 1,
        },
        "& .MuiInputBase-input": {
          typography: "body3",
        },
        "& fieldset": {
          borderRadius: "10px",
          border: "none",
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {
              <Search
                sx={{ color: "rgb(159,161,166)", width: 20, height: 20 }}
              />
            }
          </InputAdornment>
        ),
      }}
    />
  );
}
