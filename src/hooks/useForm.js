import { useState } from "react";

import { formatPhone, formatCep } from "../utils/formatters";

const useForm = (initialState, validators) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loadingCep, setLoadingCep] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let formattedValue = value;

    if (type === "radio") {
      formattedValue = value; // Mantém o valor do radio
    } else {
      const formatters = {
        phone: formatPhone,
        cep: formatCep,
      };
      formattedValue = formatters[name] ? formatters[name](value) : value;
    }

    setValues((prev) => ({ ...prev, [name]: formattedValue }));

    // Valida cada campo ao alterar
    if (validators[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validators[name](value),
      }));
    }
  };

  const handleCepSearch = async () => {
    const cep = values.cep.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length !== 8) {
      setErrors((prev) => ({ ...prev, cep: "CEP inválido" }));
      return;
    }

    setLoadingCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErrors((prev) => ({ ...prev, cep: "CEP não encontrado" }));
      } else {
        setValues((prev) => ({
          ...prev,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingCep(false);
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

  return { values, errors, handleChange, handleCepSearch, loadingCep, validateAll };
};

export default useForm;
