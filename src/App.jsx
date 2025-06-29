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
  } = useForm({ name: "", email: "" });

  const [tableData, setTableData] = React.useState(() => {
    const saved = localStorage.getItem("taskData");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name.trim() === "" || formData.email.trim() === "") return;

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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              tableData={tableData.filter(
                (task) =>
                  task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  task.email.toLowerCase().includes(searchQuery.toLowerCase())
              )}
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

