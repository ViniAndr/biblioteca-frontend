import { useState } from "react";

const useForm = (initialState, validators) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Valida cada campo ao alterar
    if (validators[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }
  };

  const validateAll = () => {
    let newErrors = {};
    Object.keys(validators).forEach((key) => {
      const error = validators[key](values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna `true` se não houver erro
  };

  return { values, errors, handleChange, validateAll };
};

export default useForm;
