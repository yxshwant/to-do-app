import React, { useState } from "react";

const TodoFilter = ({ searchTerm, handleSearch }) => {
  const [term, setTerm] = useState("");

  const handleChange = (e) => {
    setTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={term}
      onChange={handleChange}
      placeholder="Search todos"
    />
  );
};

export default TodoFilter;
