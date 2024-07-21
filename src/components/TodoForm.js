import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [todo, setTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo) {
      addTodo({
        title: todo,
        isCompleted: false,
      });
      setTodo("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto flex items-center flex-col sm:flex-row gap-2 mb-4"
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a new todo"
        className="p-3 min-w-96 text-lg border-r-8 bg-black text-cyan-200 rounded"
      />
      <button
        type="submit"
        className="p-2 bg-green-500 text-black text-3xl font-extrabold rounded"
      >
        +
      </button>
    </form>
  );
};

export default TodoForm;
