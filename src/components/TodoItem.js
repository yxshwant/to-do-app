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
    <div className="max-w-md mx-auto flex items-center gap-2 mb-2">
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          required
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded"
        />
      ) : (
        <span
          className={`flex-1 p-2 border rounded ${
            todo.isCompleted ? "line-through text-green-500" : "text-red-500"
          }`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo}
        </span>
      )}
      <button
        onClick={() => toggleComplete(index)}
        className="p-2 bg-yellow-500 text-white rounded"
      >
        {todo.isCompleted ? "Mark as Pending" : "Mark as Completed"}
      </button>
      <button
        onClick={() => deleteTodo(index)}
        className="p-2 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
