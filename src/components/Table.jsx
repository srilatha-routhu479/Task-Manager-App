// src/components/Table.jsx
import React from "react";

const Table = ({ tableData, handleEdit, handleDelete, handleSort, sortConfig }) => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-semibold mb-2">Task List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-sm md:text-base">
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortConfig.key === "name" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="border p-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortConfig.key === "email" &&
                  (sortConfig.direction === "asc" ? "↑" : "↓")}
              </th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No tasks available
                </td>
              </tr>
            ) : (
              tableData.map((data, idx) => (
                <tr key={idx} className="hover:bg-gray-50 text-sm md:text-base">
                  <td className="border px-4 py-2">{data.name}</td>
                  <td className="border px-4 py-2">{data.email}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;

