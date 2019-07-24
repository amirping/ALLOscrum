import React from "react";
import PropTypes from "prop-types";
import "./App.css";
import uuidV1 from "uuid/v1";
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
  Typography,
  TextField,
  Button
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
      outline: "none",
      marginLeft: "auto",
      marginTop: "auto"
    }
  })
);
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
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const App: React.FC = () => {
  const [modalStyle] = React.useState(getModalStyle);
  const listInput = React.createRef<HTMLInputElement>();
  const taskInput = React.createRef<HTMLInputElement>();
  const boardElement = React.createRef<Board>();
  const theme = useTheme();
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
  const classes = useStyles({});
  function createList() {
    try {
      if (
        listInput &&
        listInput.current &&
        listInput.current.value != null &&
        listInput.current.value.length !== 0
      ) {
        console.log(listInput.current.value);
        const newID = "list-" + uuidV1();
        const list_data = {
          id: newID,
          title: listInput.current.value + "".trim(),
          tasks: []
        };
        if (boardElement && boardElement.current) {
          boardElement.current.addList(list_data);
          listInput.current.value = "";
        }
      }
    } catch (error) {
      alert("we have some trouble");
    }
  }
  function createTask() {
    if (boardElement && boardElement.current && taskInput && taskInput.current)
      boardElement.current.addTask({ description: taskInput.current.value });
  }
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
      <Board ref={boardElement} />
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
              <Tab label="Create lists" />
              <Tab label="Create tasks" />
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}>
            <TabContainer dir={theme.direction}>
              <Box flexDirection="column" display="flex">
                <TextField
                  id="outlined-l-name"
                  label="List name"
                  margin="normal"
                  variant="outlined"
                  inputRef={listInput}
                />
                <Button variant="contained" onClick={createList}>
                  Create list
                </Button>
              </Box>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <Box flexDirection="column" display="flex">
                <TextField
                  id="outlined-t-name"
                  label="Task"
                  margin="normal"
                  variant="outlined"
                  inputRef={taskInput}
                />
                <Button variant="contained" onClick={createTask}>
                  Create list
                </Button>
              </Box>
            </TabContainer>
          </SwipeableViews>
        </div>
      </Modal>
    </div>
  );
};

export default App;
