// src/components/Form.jsx
import React from "react";

const Form = ({ handleForDataChange, handleSubmit, formData }) => {
  return (
    <div className="bg-white shadow-md rounded px-4 py-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 text-center">
        {formData.id ? "Update Task" : "Add Task"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Task</label>
          <input
            type="text"
            className="w-full border rounded p-2 text-sm md:text-base"
            placeholder="Enter task"
            value={formData.task}
            onChange={(e) => handleForDataChange("task", e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            className="w-full border rounded p-2 text-sm md:text-base"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) => handleForDataChange("description", e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {formData.id ? "Update" : "Add"} Task
        </button>
      </form>
    </div>
  );
};

export default Form;



