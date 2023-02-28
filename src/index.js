import { createTheme, ThemeProvider } from "@mui/material";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import "moment/locale/zh-cn";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { extendedApiSlice } from "./services/channelSlice";
import { store } from "./store";
store.dispatch(extendedApiSlice.endpoints.getChannel.initiate(1));
const fontFamilys = [
  [
    "Cabin",
    "Microsoft YaHei New",
    "微软雅黑",
    "Microsoft Yahei",
    "Microsoft JhengHei",
    "宋体",
    "SimSun",
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "sans-serif",
  ].join(","),
  [
    "Alata",
    "Microsoft YaHei New",
    "微软雅黑",
    "Microsoft Yahei",
    "Microsoft JhengHei",
    "宋体",
    "SimSun",
    "Helvetica Neue",
    "Helvetica",
    "Arial",
    "sans-serif",
  ].join(","),
];
const theme = createTheme({
  root: {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
    },
  },
  palette: {
    mode: "light",
    text: {
      primary: "rgb(255,255,255)",
      secondary: "rgb(163,166,170)",
      neglect: "rgb(150,152,157)",
      red: "rgb(255,0,0)",
      yellow: "rgb(241,196,15)",
    },
    primary: { main: "rgb(47,49,54)" },
    secondary: { main: "rgb(32,34,37)" },
    tertiary: { main: "rgb(66,70,77)" },
    quaternary: { main: "rgb(54,57,63)" },
    white_500: "rgb(207,208,209)",
    green: { light: "rgb(46,204,113)" },
    modifier: {
      accent: "rgba(79,84,92,0.48)",
    },
  },
  typography: {
    primary: {
      fontFamily: fontFamilys[0],
      fontSize: 16,
      fontWeight: 600,
    },
    secondary: {
      fontFamily: fontFamilys[0],
      fontSize: 16,
      fontWeight: 700,
    },
    display: {
      fontFamily: fontFamilys[1],
      fontSize: 12,
      fontWeight: 700,
    },
    display1: {
      fontFamily: fontFamilys[1],
      fontSize: 12,
      fontWeight: 600,
    },
    headline: {
      fontFamily: fontFamilys[1],
    },
    dialogTitle: {
      fontFamily: fontFamilys[1],
      fontSize: 20,
      fontWeight: 500,
    },
    dialogTitle1: {
      fontFamily: fontFamilys[1],
      fontSize: 16,
      fontWeight: 500,
    },
    username: {
      fontFamily: fontFamilys[1],
      fontSize: 20,
      fontWeight: 600,
    },
    username1: {
      fontFamily: fontFamilys[0],
      fontSize: 20,
      fontWeight: 500,
    },
    username2: {
      fontFamily: fontFamilys[0],
      fontSize: 14,
      fontWeight: 600,
    },
    tip: {
      fontFamily: fontFamilys[0],
      fontSize: 13,
      fontWeight: 400,
    },
    esc: {
      fontFamily: fontFamilys[0],
      fontSize: 13,
      fontWeight: 600,
    },
    code: {
      fontFamily: fontFamilys[0],
      fontSize: 14,
      fontWeight: 400,
    },
    small: {
      fontFamily: fontFamilys[0],
      fontSize: 13.75,
      fontWeight: 500,
    },
    body: {
      fontFamily: fontFamilys[0],
      fontSize: 12,
      fontWeight: 500,
    },
    body1: {
      fontFamily: fontFamilys[0],
      fontSize: 12,
      fontWeight: 400,
    },
    body2: {
      fontFamily: fontFamilys[0],
      fontSize: 20,
      fontWeight: 400,
    },
    body3: {
      fontFamily: fontFamilys[0],
      fontSize: 14,
      fontWeight: 500,
    },
    body4: {
      fontFamily: fontFamilys[0],
      fontSize: 15,
      fontWeight: 500,
    },
    body5: {
      fontFamily: fontFamilys[0],
      fontSize: 14,
      fontWeight: 400,
    },
    body6: {
      fontFamily: fontFamilys[0],
      fontSize: 16,
      fontWeight: 400,
    },
    body7: {
      fontFamily: fontFamilys[0],
      fontSize: 16,
      fontWeight: 500,
    },
    h1: {
      fontFamily: fontFamilys[0],
      fontSize: 24,
      fontWeight: 600,
    },
    h2: {
      fontFamily: fontFamilys[1],
      fontSize: 20,
      fontWeight: 500,
    },
    h3: {
      fontFamily: fontFamilys[0],
      fontSize: 16,
      fontWeight: 500,
    },
    h4: {
      fontFamily: fontFamilys[1],
      fontSize: 12,
      fontWeight: 500,
    },
    h5: { fontFamily: fontFamilys[0], fontSize: 16, fontWeight: 500 },
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          userSelect: "none",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        divider: {
          borderBottom: "1px solid rgb(51, 53, 59)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            pointerEvents: "auto",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "rgb(220,221,222)",
          borderBottom: "1px solid rgb(63, 66, 72)",
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "rgb(185, 187, 190)", //重写了图标的默认颜色
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          bgcolor: "rgb(54, 57, 63)",
          "::-webkit-scrollbar": {
            width: "0px",
          },
        },
      },
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/channels/:serverId/:channelId",
    element: <App />,
  },
]);
momentDurationFormatSetup(moment);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
