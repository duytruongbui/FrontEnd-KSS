import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styles from '../../styles/6p.module.css';
import Image from 'next/image';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 3;

const getItemStyle = (draggableStyle, isDragging, isMobile) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 0 16px 0`,

  // change background colour if dragging
  background: isDragging ? '#A56C50' : 'none',
  borderColor: isDragging ? '#A56C50' : isMobile ? '#F8EEE4' : '#A56C50',

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? 'lightblue' : 'lightgrey',
  //   padding: grid,
  //   width: 250
});

export default class DragItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.allItems,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div>
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        className={styles.card}
                        style={getItemStyle(
                          provided.draggableProps.style,
                          snapshot.isDragging,
                          this.props.isMobile
                        )}
                      >
                        <div className={styles.flexRowSpaceBtw}>
                          <div className={styles.inlineContent}>
                            <div
                              className={`${styles.circleIndex} ${
                                snapshot.isDragging ? styles.textMoving : ''
                              }`}
                            >
                              {index + 1}
                            </div>
                            <div
                              className={`${styles.textContent} ${
                                snapshot.isDragging ? styles.textMoving : ''
                              }`}
                            >
                              {item.content}
                            </div>
                          </div>
                          <Image
                            src={
                              snapshot.isDragging || this.props.isMobile
                                ? '/images/is_moving.svg'
                                : '/images/move.svg'
                            }
                            height={18}
                            width={18}
                            alt="Instagram"
                          />
                        </div>
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="block md:hidden">
          <button
            className={`greenbtn-2 mt-4 ${styles.customGreenBtn}`}
            onClick={() => this.props.onSub(this.state.items)}
          >
            Continue
          </button>
        </div>
        <div className="hidden md:block">
          <button
            className={`greenbtn mt-4 ${styles.customGreenBtn}`}
            onClick={() => this.props.onSub(this.state.items)}
          >
            Continue
          </button>
        </div>
      </DragDropContext>
    );
  }
}
