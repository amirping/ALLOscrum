import React, { Component } from "react";
import startData from "../start-data";
import ListComp from "../List-Component/ListComponent";
import "./BoardComponent.css";
import { DragDropContext } from "react-beautiful-dnd";
export interface BoardProps {}

export interface BoardState {}

class Board extends Component<BoardProps, any> {
  constructor(props: BoardProps) {
    super(props);
    this.state = startData;
  }
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
  render() {
    console.log(this.state);
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
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
