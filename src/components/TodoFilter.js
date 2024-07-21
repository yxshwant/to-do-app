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
      className="max-w-md mx-auto p-3 text-lg border border-r-8 bg-black text-cyan-200 rounded w-full mb-3"
    />
  );
};

export default TodoFilter;
