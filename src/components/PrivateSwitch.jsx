import { Lock } from "@mui/icons-material";
import { Grid, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import anime from "animejs/lib/anime.es.js";
import { Slider } from "../svgs";
const StyledSwitch = styled((props) => <Switch disableRipple {...props} />)(
  ({ theme, disabled }) => ({
    opacity: disabled && 0.3,
    width: 40,
    height: 24,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      marginTop: 3,
      marginLeft: 0,
      transition: "transform 300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        "& + .MuiSwitch-track": {
          backgroundColor: "rgb(59, 165, 92)",
          opacity: 1,
          border: 0,
        },
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "rgb(114, 118, 125)",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 300,
      }),
    },
  })
);
const getSvgPath = (selector) => ({
  value: document.querySelector(selector).getAttribute("d"),
});
const smoothAnimation = (className, fact, total = 200, portion = 0.5) => {
  anime({
    targets: `${className} .circle-1`,
    translateX: `-${fact}px`,
    easing: "linear",
    duration: total * portion,
  }).finished.then(() => {
    anime({
      targets: `${className} .circle-1`,
      translateX: "0px",
      easing: "linear",
      duration: total * (1 - portion),
    });
  });
  anime({
    targets: `${className} .circle-2`,
    translateX: `${fact}px`,
    easing: "linear",
    duration: total * portion,
  }).finished.then(() => {
    anime({
      targets: `${className} .circle-2`,
      translateX: "0px",
      easing: "linear",
      duration: total * (1 - portion),
    });
  });
  anime({
    targets: `${className} .rect-fill-display`,
    d: [
      {
        value: `M${14 - fact - 1} 0 H ${14 + fact + 1} V 20 H ${
          14 - fact - 1
        } Z`,
      },
    ],
    easing: "linear",
    duration: total * portion,
  }).finished.then(() => {
    anime({
      targets: `${className} .rect-fill-display`,
      d: [{ value: `M14 0 H 14 V 20 H 14 Z` }],
      easing: "linear",
      duration: total * (1 - portion),
    });
  });
};
const CustomSwitch = ({ disabled, checked, setChecked, class_name }) => (
  <StyledSwitch
    className={class_name}
    disabled={disabled}
    checked={checked}
    onClick={(e) => e.stopPropagation()}
    onChange={() => {
      let dur = 300;
      if (!checked) {
        anime({
          targets: `.${class_name} .display-rect-1`,
          d: [getSvgPath(".tick-rect-1", "red")],
          fill: "rgba(59, 165, 92, 1)",
          easing: "linear",
          duration: dur,
        });
        anime({
          targets: `.${class_name} .display-rect-2`,
          d: [getSvgPath(".tick-rect-2", "red")],
          fill: "rgba(59, 165, 92, 1)",
          easing: "linear",
          duration: dur,
        });
        smoothAnimation(class_name, 4, dur);
      } else {
        anime({
          targets: `.${class_name} .display-rect-1`,
          d: [getSvgPath(".cross-rect-1")],
          easing: "linear",
          fill: "rgba(114, 118, 125, 1)",
          duration: dur,
        });
        anime({
          targets: `.${class_name} .display-rect-2`,
          d: [getSvgPath(".cross-rect-2")],
          fill: "rgba(114, 118, 125, 1)",
          easing: "linear",
          duration: dur,
        });
        smoothAnimation(class_name, 4, dur);
      }
      setChecked(!checked);
    }}
    icon={<Slider />}
    checkedIcon={<Slider />}
  />
);
const PrivateSwitch = (props) => {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: "8px" }}
    >
      <Grid item>
        <Grid container columnGap="3px" alignItems="center">
          <Grid item>
            <Lock
              sx={{
                width: "16px",
                height: "16px",
                color: "rgb(175, 176, 178)",
              }}
            />
          </Grid>
          <Grid item>
            <Typography variant="body7" component="div">
              {props.label}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <CustomSwitch checked={props.checked} setChecked={props.setChecked} />
      </Grid>
    </Grid>
  );
};
export { CustomSwitch };
export default PrivateSwitch;
