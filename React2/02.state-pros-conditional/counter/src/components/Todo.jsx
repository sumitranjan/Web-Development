import React, { useState } from "react";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const onDelete = (id) => {
    let newTodos = todos.filter((todo) => todo.id != id);
    setTodos(newTodos);
  };
  return (
    <div>
      Todo
      <input
        // value={value}-->pass initial value to input and remove from input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setTodos([
            ...todos,
            { id: Date.now(), value: value, isCompleted: false },
          ]);
          setValue("");
        }}
      >
        Submit
      </button>
      {/*TODOS*/}
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default Todo;
