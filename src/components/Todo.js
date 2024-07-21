import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilter from "./TodoFilter";
import useLocalStorage from "../hooks/useLocalStorage";

const Todo = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [completedItems, setCompletedItems] = useState(0);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].title = newText;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  const updateCompletedCount = () => {
    const completedCount = todos.filter((todo) => todo.isCompleted).length;
    setCompletedItems(completedCount);
  };

  useEffect(() => {
    updateCompletedCount();
  }, [todos]);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto h-20 bg-orange-400 flex items-center justify-center mb-4 rounded-md">
        <h1 className="text-3xl font-bold text-black bg-transparent">
          📝TODOit.
        </h1>
      </div>
      <TodoForm addTodo={addTodo} />
      <TodoFilter searchTerm={searchTerm} handleSearch={handleSearch} />
      <TodoList
        todos={searchTerm ? filteredTodos : todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        updateCompletedCount={updateCompletedCount}
      />
      <p className="bg-black text-white text-lg mt-4">
        Completed Items: {completedItems} / {todos.length}
      </p>
      <Link to="/signout">
        <button type="button" className="text-blue-400 underline">
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default Todo;
