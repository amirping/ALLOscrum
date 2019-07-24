import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
export interface AppBarComponentProps {}

export interface AppBarComponentState {
  appname: string;
}

class AppBarComponent extends Component<
  AppBarComponentProps,
  AppBarComponentState
> {
  constructor(props: AppBarComponentProps) {
    super(props);
    this.state = { appname: "ALLOscrum" };
  }
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {this.state.appname}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default AppBarComponent;
