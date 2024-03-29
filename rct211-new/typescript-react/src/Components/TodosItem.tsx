import React from 'react';
import { ITodoItems } from './Todos';

const TodosItem = ({id, title, status}:ITodoItems) => {
    console.log(status)
  return (
    <div>
        <span>{`${id} `}</span>
        <span>{title}</span>
        <span>{status ? 'True': 'False'}</span>
    </div>
  )
}

export default TodosItem