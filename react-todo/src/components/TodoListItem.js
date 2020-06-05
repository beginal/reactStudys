import React, { useState, useCallback } from 'react'
import {
  MdCheckBoxOutlineBlank, 
  MdCheckBox,
  MdRemoveCircleOutline,
  MdCached,
} from 'react-icons/md';
import cn from 'classnames'
import "./TodoListItem.scss";
const TodoListItem = ({todo, onRemove, onToggle, onUpdate, style}) => {
  const { id, text, checked, updated } = todo;
  const [texts, setTexts] = useState(text)
  const onChange = useCallback(e => {
    setTexts(e.target.value);
  }, [])
  return (
    <div className="TodoListItem-virtualized" style={style}>
    <div className="TodoListItme">
      <div className={cn('checkbox', { checked,updated})} onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        {updated ? <input className="updates" value={texts} onChange={onChange}></input> : <div className="text">{text}</div> }
        
      </div>
      <div className="update" onClick={() => onUpdate(id)}>
        <MdCached />
      </div>
      <div className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </div>      
    </div>
    </div>
  )
}

export default React.memo(TodoListItem,
  (prevProps, nextProps) => prevProps.todo === nextProps.todo)
  // TODO: react.memo의 두번째 매개변수가 뭔지 알아보자