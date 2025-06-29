// src/pages/TaskFormPage.jsx
import React from "react";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const TaskFormPage = ({ formData, handleSubmit, handleForDataChange }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-2xl mx-auto">
      
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        ⬅ Back to Home
      </button>

      <Form
        formData={formData}
        handleSubmit={handleSubmit}
        handleForDataChange={handleForDataChange}
      />
    </div>
  );
};

export default TaskFormPage;






