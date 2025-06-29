// src/pages/Home.jsx
import React, { useState } from "react";
import Table from "../components/Table";
import { Link, useNavigate } from "react-router-dom";

const Home = ({
  tableData,
  handleDelete,
  setFormData,
  setEditIndex,
  searchQuery,
  setSearchQuery,
}) => {
  const navigate = useNavigate();

  const handleEdit = (index) => {
    const task = tableData[index];
    setFormData(task);
    setEditIndex(index);
    navigate("/add");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

   const filteredTasks = tableData.filter((task) =>
    task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key].toLowerCase();
    const bVal = b[sortConfig.key].toLowerCase();

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-center md:text-left">
          Task Manager
        </h1>
        <Link
          to="/add"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto text-center"
        >
          Add Task
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by task or description..."
        className="w-full border px-4 py-2 rounded mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="overflow-x-auto">
        <Table
          tableData={currentTasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;






