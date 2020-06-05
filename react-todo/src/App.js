import React, { useRef, useCallback, useReducer } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i < 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    })
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return [action.todo, ...todos];
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id)
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo)
    case 'UPDATE':
      return todos.map(todo =>
          todo.id === action.id ? { ...todo, updated: !todo.updated } : todo)
    default :
    return todos;
  }
}
  

  const App = () => {

    const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos)

    const nextId = useRef(2501);
    const onToggle = useCallback(
      id => {
        dispatch({ type: 'TOGGLE', id });
      }, []
    )

    const onInsert = useCallback(
      text => {
        const todo = {
          id: nextId.current,
          text,
          checked: false,
          updated: false,
        }
        dispatch({ type: 'INSERT', todo });
        nextId.current += 1;
      }, []
    )

    const onRemove = useCallback(
      id => {
        dispatch({ type: 'REMOVE', id });
      }, []
    )

    const onUpdate = useCallback(
      id => {
        dispatch({ type: 'UPDATE', id });
      }, []
    );

    return (
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} onUpdate={onUpdate} />
      </TodoTemplate>
    )
  }
  
  export default App