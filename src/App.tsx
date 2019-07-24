import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import SwipeableViews from "react-swipeable-views";
import AppBarComponent from "./App-Bar-Component/AppBarComponent";
import {
  CssBaseline,
  Fab,
  makeStyles,
  Theme,
  createStyles,
  Box,
  Modal,
  Paper,
  Tabs,
  Tab,
  useTheme,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Board from "./Board-Component/BoradComponent";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      position: "absolute",
      bottom: "20px",
      right: "20px"
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    paper: {
      position: "absolute",
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 4),
      outline: "none"
    }
  })
);
function rand() {
  return Math.round(Math.random() * 20) - 10;
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
interface TabContainerProps {
  children?: React.ReactNode;
  dir?: string;
}

function TabContainer({ children, dir }: TabContainerProps) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};
const App: React.FC = () => {
  const theme = useTheme();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  function handleChangeIndex(index: number) {
    setValue(index);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  return (
    <div className="mainApp">
      <CssBaseline />
      <AppBarComponent />
      <Fab
        onClick={handleOpen}
        color="secondary"
        aria-label="Add"
        className={classes.fab}>
        <AddIcon />
      </Fab>
      <Board />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2 id="modal-title">Data manager</h2>
          <p id="simple-modal-description">
            This interface will allow the creation of lists & cards (tasks)
          </p>
          <Paper>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered>
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabContainer dir={theme.direction}>Item One</TabContainer>
            <TabContainer dir={theme.direction}>Item Two</TabContainer>
            <TabContainer dir={theme.direction}>Item Three</TabContainer>
          </SwipeableViews>
        </div>
      </Modal>
    </div>
  );
};

export default App;
