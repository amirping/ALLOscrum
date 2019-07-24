import React, { Component } from "react";
import "./ListComponent.css";
import { Droppable } from "react-beautiful-dnd";
export interface ListCompProps {
  key: any;
  list: any;
  tasks: any;
}

export interface ListCompState {}

class ListComp extends Component<ListCompProps, ListCompState> {
  constructor(props: ListCompProps) {
    super(props);
    console.log(this.props.tasks);
  }
  render() {
    return (
      <div className="list">
        <div className="title">{this.props.list.title}</div>
        <Droppable droppableId={this.props.list.id}>
          {provided => (
            <div
              className="cards"
              innerRef={provided.innerRef}
              {...provided.droppableProps}>
              {this.props.tasks.map((task: any) => (
                <div className="card">{task.description}</div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default ListComp;
