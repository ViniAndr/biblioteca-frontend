import { useState } from "react";
import { formatarTelefone, formatarCep } from "../utils/formatadores";

const useFormulario = (estadoInicial, validadores) => {
  const [valores, setValores] = useState(estadoInicial);
  const [erros, setErros] = useState({});
  const [carregandoCep, setCarregandoCep] = useState(false);

  const lidarComMudanca = (e) => {
    const { name, value, type } = e.target;
    let valorFormatado = value;

    if (type === "radio") {
      valorFormatado = value; // Mantém o valor do radio
    } else {
      const formatadores = {
        telefone: formatarTelefone, // Nomes dos campos precisam bater com o 'name' do input
        cep: formatarCep,
      };
      valorFormatado = formatadores[name] ? formatadores[name](value) : value;
    }

    setValores((prev) => ({ ...prev, [name]: valorFormatado }));

    // Valida cada campo ao alterar
    if (validadores[name]) {
      setErros((prev) => ({
        ...prev,
        [name]: validadores[name](value),
      }));
    }
  };

  const buscarCep = async () => {
    const cep = valores.cep.replace(/\D/g, ""); // Remove caracteres não numéricos

    if (cep.length !== 8) {
      setErros((prev) => ({ ...prev, cep: "CEP inválido" }));
      return;
    }

    setCarregandoCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErros((prev) => ({ ...prev, cep: "CEP não encontrado" }));
      } else {
        setValores((prev) => ({
          ...prev,
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setCarregandoCep(false);
    }
  };

  const validarTudo = () => {
    let novosErros = {};
    Object.keys(validadores).forEach((chave) => {
      const erro = validadores[chave](valores[chave]);
      if (erro) {
        novosErros[chave] = erro;
      }
    });

    setErros(novosErros);
    return Object.keys(novosErros).length === 0; // Retorna `true` se não houver erro
  };

  return {
    valores,
    erros,
    lidarComMudanca,
    buscarCep,
    carregandoCep,
    validarTudo,
  };
};

export default useFormulario;
