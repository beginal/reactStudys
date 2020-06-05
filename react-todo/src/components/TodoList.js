import React, { useCallback } from 'react'
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';


const TodoList = ({todos, onRemove, onToggle, onUpdate}) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem 
          todo={todo} 
          onRemove={onRemove} 
          onToggle={onToggle} 
          onUpdate={onUpdate} 
          style={style}
          key={key} 
        />
      )
    }, [onRemove, onToggle, onUpdate, todos]
  )
  return (
    <List 
      className="TodoList"
      width={512}
      height={513}
      rowCount={todos.length}
      rowHeight={57}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none'}}
     />
  )
}


export default React.memo(TodoList);
