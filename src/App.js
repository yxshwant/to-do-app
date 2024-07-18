import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

const App = () => {
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
    <div className="App">
      <h1>
        📝<u>Todo List</u>
      </h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilter searchTerm={searchTerm} handleSearch={handleSearch} />
      <TodoList
        todos={searchTerm ? filteredTodos : todos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        updateCompletedCount={updateCompletedCount}
      />
      <p>
        Completed Items: {completedItems} / {todos.length}
      </p>
    </div>
  );
};

export default App;
