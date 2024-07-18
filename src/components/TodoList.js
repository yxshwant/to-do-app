import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, updateTodo, deleteTodo, toggleComplete }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo.title}
          index={index}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
