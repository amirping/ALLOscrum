import React, { Component } from "react";
import startData from "../start-data";
import ListComp from "../List-Component/ListComponent";
import "./BoardComponent.css";
import { DragDropContext } from "react-beautiful-dnd";
import uuidV1 from "uuid/v1";
import {
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
export interface BoardProps {}

export interface BoardState {}
let listID = 0;
let taskTC: any = {};
class Board extends Component<BoardProps, any> {
  constructor(props: BoardProps) {
    super(props);
    //startData['open'] = false;
    this.state = Object.assign(startData, { open: false });
  }

  handleClickOpen = () => {
    const newState = {
      ...this.state,
      open: true
    };
    this.setState(newState);
  };

  handleClose = () => {
    const newState = {
      ...this.state,
      open: false
    };
    this.setState(newState);
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  addList = (listobj: any) => {
    console.log(" we will consider that");
    const newState = {
      ...this.state,
      lists: {
        ...this.state.lists,
        [listobj.id]: listobj
      }
    };
    this.setState(newState);
  };
  addTask = (taskobj: any) => {
    console.log("we will conside that also dude");
    taskTC = taskobj;
    this.handleClickOpen();
  };
  onDragEnd = (result: any) => {
    // todo
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const list = this.state.lists[source.droppableId];
      const listd = this.state.lists[destination.droppableId];
      const tasks = Array.from(list.tasks);
      const listdTasks = Array.from(listd.tasks);
      tasks.splice(source.index, 1);
      listdTasks.splice(destination.index, 0, draggableId);

      const newLists = {
        ...list,
        tasks: tasks
      };
      const newListd = {
        ...listd,
        tasks: listdTasks
      };
      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [newLists.id]: newLists,
          [newListd.id]: newListd
        }
      };
      this.setState(newState);
    } else {
      const list = this.state.lists[source.droppableId];

      const tasks = Array.from(list.tasks);

      tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, draggableId);

      const newList = {
        ...list,
        tasks: tasks
      };

      const newState = {
        ...this.state,
        lists: {
          ...this.state.lists,
          [newList.id]: newList
        }
      };
      this.setState(newState);
    }
  };
  handleChangeList = (ev: any) => {
    console.log(ev);
    listID = ev.target.value;
  };
  createTask = () => {
    const newID = "tas-" + uuidV1();
    taskTC["id"] = newID;
    let list = this.state.lists[listID];
    list.tasks.push(newID);

    const newState = {
      ...this.state,
      open: false,
      tasks: {
        ...this.state.tasks,
        [newID]: taskTC
      },
      lists: {
        ...this.state.lists,
        [listID]: list
      }
    };

    this.setState(newState);
  };
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board">
          {Object.keys(this.state.lists).map((listID: string) => {
            const list = this.state.lists[listID];
            const tasks = list.tasks.map(
              (taskID: string) => this.state.tasks[taskID]
            );
            return <ListComp key={list.id} list={list} tasks={tasks} />;
          })}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <Select
                onChange={this.handleChangeList}
                value={listID}
                name="list">
                {this.state.lists &&
                  Object.keys(this.state.lists).map((id: string) => (
                    <MenuItem value={id} key={id} selected>
                      {this.state.lists[id].title}
                    </MenuItem>
                  ))}
              </Select>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.createTask} color="primary" autoFocus>
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
