import React from "react";
import "./App.css";
import AppBarComponent from "./App-Bar-Component/AppBarComponent";
import {
  CssBaseline,
  Container,
  Fab,
  makeStyles,
  Theme,
  createStyles,
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
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
    <React.Fragment>
      <CssBaseline />
      <AppBarComponent />
      <Container maxWidth={false}>
        <Fab color="secondary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
        <Box
          color="text.primary"
          clone
          flexDirection="row"
          justifyContent="around">
          <div className="list" />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default App;
