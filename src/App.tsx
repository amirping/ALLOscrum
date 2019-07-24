import React from "react";
import "./App.css";
import AppBarComponent from "./App-Bar-Component/AppBarComponent";
import {
  CssBaseline,
  Fab,
  makeStyles,
  Theme,
  createStyles,
  Box
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
    }
  })
);
const App: React.FC = () => {
  const classes = useStyles();
  return (
    <div className="mainApp">
      <CssBaseline />
      <AppBarComponent />
      <Fab color="secondary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
      <Board />
    </div>
  );
};

export default App;
