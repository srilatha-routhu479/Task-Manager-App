// src/hooks/useForm.js
import { useState } from "react";

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  const [editIndex, setEditIndex] = useState(null);

  const handleFormDataChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setFormData({ ...initialValues }); 
    setEditIndex(null);
  };

  return {
    formData,
    setFormData,
    handleFormDataChange,
    resetForm,
    editIndex,
    setEditIndex,
  };
}

