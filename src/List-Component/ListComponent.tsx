import React, { Component } from "react";
import "./ListComponent.css";
import { Droppable, Draggable } from "react-beautiful-dnd";
export interface ListCompProps {
  key: any;
  list: any;
  tasks: any;
}

export interface ListCompState {}

class ListComp extends Component<ListCompProps, ListCompState> {
  constructor(props: ListCompProps) {
    super(props);
  }
  render() {
    return (
      <div className="list">
        <div className="title">{this.props.list.title}</div>
        <Droppable droppableId={this.props.list.id}>
          {provided => (
            <div
              className="cards"
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {this.props.tasks.map((task: any, index: number) => (
                <Draggable draggableId={task.id} index={index}>
                  {provided => (
                    <div
                      className="card"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}>
                      {task.description}
                    </div>
                  )}
                </Draggable>
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
