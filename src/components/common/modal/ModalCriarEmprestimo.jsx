import { useState } from "react";
import AsyncSelect from "react-select/async";
import Botao from "../Botao";
import { useAlerta } from "../../../contexts/AlertaContext";

// Importando as funções puras dos serviços
import { pesquisarClientesParaSelect } from "../../../services/clienteService";
import { pesquisarLivrosParaSelect } from "../../../services/livroService";

const ModalCriarEmprestimo = ({ aoFechar, aoConfirmar }) => {
  const { mostrarAlerta } = useAlerta();

  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  // Funções enxutas que só chamam o serviço se tiver mais de 3 letras
  const carregarClientes = (valorDigitado) => {
    if (!valorDigitado || valorDigitado.length < 3) return [];
    return pesquisarClientesParaSelect(valorDigitado);
  };

  const carregarLivros = (valorDigitado) => {
    if (!valorDigitado || valorDigitado.length < 3) return [];
    return pesquisarLivrosParaSelect(valorDigitado);
  };

  const lidarComEnvio = async () => {
    if (!clienteSelecionado || !livroSelecionado) {
      mostrarAlerta("Por favor, selecione um cliente e um livro.", "error");
      return;
    }

    if (aoConfirmar) {
      await aoConfirmar({
        clienteId: Number(clienteSelecionado.value),
        livroId: Number(livroSelecionado.value),
      });
      aoFechar();
    }
  };

  const estilosPersonalizados = {
    control: (base) => ({
      ...base,
      borderColor: "#d4d4d8",
      padding: "2px",
      borderRadius: "0.375rem",
      boxShadow: "none",
      "&:hover": { borderColor: "#a1a1aa" },
    }),
  };

  return (
    <div className="flex flex-col gap-5 mt-3">
      <div className="bg-blue-50 text-blue-800 p-4 rounded-md text-sm border border-blue-100">
        <p className="font-semibold">Instruções para o empréstimo:</p>
        <ul className="list-disc ml-5 mt-1 text-blue-700">
          <li>Digite o nome do cliente e do livro para pesquisar.</li>
          <li>Verifique se o livro possui cópias disponíveis.</li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700">Buscar Cliente</label>
        <AsyncSelect
          cacheOptions
          defaultOptions={false}
          loadOptions={carregarClientes}
          onChange={setClienteSelecionado}
          value={clienteSelecionado}
          placeholder="Digite o nome do cliente (min. 3 letras)..."
          noOptionsMessage={() => "Nenhum cliente encontrado"}
          loadingMessage={() => "Buscando..."}
          styles={estilosPersonalizados}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-700">Buscar Livro</label>
        <AsyncSelect
          cacheOptions
          defaultOptions={false}
          loadOptions={carregarLivros}
          onChange={setLivroSelecionado}
          value={livroSelecionado}
          placeholder="Digite o título do livro (min. 3 letras)..."
          noOptionsMessage={() => "Nenhum livro encontrado"}
          loadingMessage={() => "Buscando..."}
          styles={estilosPersonalizados}
        />
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Botao variante="back" onClick={aoFechar}>
          Cancelar
        </Botao>
        <Botao onClick={lidarComEnvio}>Confirmar Empréstimo</Botao>
      </div>
    </div>
  );
};

export default ModalCriarEmprestimo;
