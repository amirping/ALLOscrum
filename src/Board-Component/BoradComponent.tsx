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
