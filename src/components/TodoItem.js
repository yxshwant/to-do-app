import React, { useState } from "react";

const TodoItem = ({ todo, index, updateTodo, deleteTodo, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.title);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleBlur = () => {
    if (newText && newText.trim() !== "") {
      updateTodo(index, newText);
    } else {
      alert("Todo cannot be empty");
    }
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          required
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "",
            color: todo.isCompleted ? "green" : "red",
          }}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo}
        </span>
      )}
      <button onClick={() => toggleComplete(index)}>
        {todo.isCompleted ? "Mark as Pending" : "Mark as Completed"}
      </button>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </div>
  );
};

export default TodoItem;
