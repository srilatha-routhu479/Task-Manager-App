// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskFormPage from "./pages/TaskFormPage";
import useForm from "./hooks/useForm";

const App = () => {
  const {
    formData,
    setFormData,
    handleFormDataChange,
    resetForm,
    editIndex,
    setEditIndex,
  } = useForm({ task: "", description: "" });

  const [tableData, setTableData] = React.useState(() => {
    const saved = localStorage.getItem("taskData");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.task.trim() === "" || formData.description.trim() === "") return;

    let updatedData = [...tableData];

    if (editIndex !== null) {
      updatedData[editIndex] = formData;
    } else {
      updatedData.push(formData);
    }

    setTableData(updatedData);
    localStorage.setItem("taskData", JSON.stringify(updatedData));

    resetForm();
  };

  const handleDelete = (index) => {
    const updated = tableData.filter((_, i) => i !== index);
    setTableData(updated);
    localStorage.setItem("taskData", JSON.stringify(updated));
  };

  const [searchQuery, setSearchQuery] = React.useState("");

 
  const filteredData = tableData.filter((task) => {
    const taskText = typeof task.task === "string" ? task.task.toLowerCase() : "";
    const descText = typeof task.description === "string" ? task.description.toLowerCase() : "";
    const searchText = searchQuery.toLowerCase();

    return taskText.includes(searchText) || descText.includes(searchText);
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              tableData={filteredData}
              handleDelete={handleDelete}
              setFormData={setFormData}
              setEditIndex={setEditIndex}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        />
        <Route
          path="/add"
          element={
            <TaskFormPage
              formData={formData}
              handleSubmit={handleSubmit}
              handleForDataChange={handleFormDataChange}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;



