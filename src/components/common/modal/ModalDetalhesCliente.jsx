import { useState, useEffect } from "react";
import { LuPhone, LuMail, LuMapPin, LuBookOpen, LuHistory, LuCalendarDays } from "react-icons/lu";

import { useModal } from "../../../contexts/ModalContext";

import BadgeStatus from "../../tabela/BadgeStatus";

import { listarTodosEmprestimos } from "../../../services/emprestimoService";

// --- CONSTANTES ---
// Forçamos a comparação em caixa alta para garantir compatibilidade com o Prisma
const STATUS_ATIVOS = ["SOLICITADO", "EMPRESTADO", "ATRASADO"];
const STATUS_HISTORICO = ["DEVOLVIDO", "CANCELADO"];

const ModalDetalhesCliente = ({ cliente }) => {
  const [abaAtiva, setAbaAtiva] = useState("sobre");
  const [emprestimos, setEmprestimos] = useState([]);
  const [carregandoEmprestimos, setCarregandoEmprestimos] = useState(true);

  const { abrirModal } = useModal();

  // --- EFEITOS (BUSCA DE DADOS) ---
  useEffect(() => {
    const buscarDados = async () => {
      if (!cliente?.id) {
        setCarregandoEmprestimos(false);
        return;
      }

      setCarregandoEmprestimos(true);
      try {
        const response = await listarTodosEmprestimos({ clienteId: cliente.id }, 1, 50);

        if (!response.error && response.data?.emprestimos) {
          setEmprestimos(response.data.emprestimos);
        }
      } catch (error) {
        console.error("Erro ao buscar empréstimos do cliente:", error);
      } finally {
        setCarregandoEmprestimos(false);
      }
    };

    buscarDados();
  }, [cliente?.id]);

  const lidarComCliqueNoEmprestimo = (emprestimoClicado) => {
    abrirModal("detalhesEmprestimo", {
      // Use o nome exato que você registrou no seu ModalRoot
      titulo: "Detalhes do Empréstimo",
      tamanho: "xl",
      props: {
        id: emprestimoClicado.id,
      },
    });
  };

  // --- LÓGICA DE FILTRAGEM ---
  const ativos = emprestimos.filter((e) => {
    if (!e.status) return false;
    return STATUS_ATIVOS.includes(e.status.toUpperCase());
  });

  const historico = emprestimos.filter((e) => {
    if (!e.status) return false;
    return STATUS_HISTORICO.includes(e.status.toUpperCase());
  });

  // --- FUNÇÕES AUXILIARES DE FORMATAÇÃO ---
  const obterIniciais = (nome) => {
    if (!nome) return "CL";
    const partes = nome.split(" ").filter((p) => p.trim() !== ""); // Previne espaços extras
    if (partes.length >= 2) return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    return nome.substring(0, 2).toUpperCase();
  };

  const formatarStatus = (status) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  const isInadimplente = ativos.some((e) => e.status?.toUpperCase() === "ATRASADO");

  // --- SUB-COMPONENTE: Botão de Aba ---
  // Isso evita repetir as classes gigantes do Tailwind para cada aba
  const BotaoAba = ({ id, titulo, icone: Icone, quantidade }) => {
    const isAtivo = abaAtiva === id;
    return (
      <button
        onClick={() => setAbaAtiva(id)}
        className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
          isAtivo
            ? "border-blue-600 text-blue-600"
            : "border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300"
        }`}
      >
        {Icone && <Icone className="w-4 h-4" />}
        {titulo}
        {quantidade !== undefined && ` (${quantidade})`}
      </button>
    );
  };

  // --- RENDERIZAÇÃO ---
  return (
    <div className="flex flex-col gap-6">
      {/* 1. CABEÇALHO (O Raio-X) */}
      <div className="flex items-center gap-5 p-4 bg-zinc-50 rounded-lg border border-zinc-100">
        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold flex-shrink-0">
          {obterIniciais(cliente?.nome)}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-zinc-800">{cliente?.nome}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                <a
                  href={`https://wa.me/55${cliente?.telefone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-green-600 transition-colors"
                >
                  <LuPhone className="w-4 h-4" /> {cliente?.telefone || "Não informado"}
                </a>
                <span className="flex items-center gap-1">
                  <LuMail className="w-4 h-4" /> {cliente?.email || "Não informado"}
                </span>
              </div>
            </div>
            <BadgeStatus status={isInadimplente ? "Inadimplente" : "Ativo"} />
          </div>
        </div>
      </div>

      {/* 2. NAVEGAÇÃO POR ABAS */}
      <div className="flex border-b border-zinc-200 overflow-x-auto">
        <BotaoAba id="sobre" titulo="Dados e Endereço" />
        <BotaoAba id="ativos" titulo="Empréstimos Ativos" icone={LuBookOpen} quantidade={ativos.length} />
        <BotaoAba id="historico" titulo="Histórico" icone={LuHistory} quantidade={historico.length} />
      </div>

      {/* 3. CONTEÚDO DAS ABAS */}
      <div className="min-h-[250px] max-h-[400px] overflow-y-auto pr-2">
        {/* Aba 1: Endereço */}
        {abaAtiva === "sobre" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-700 flex items-center gap-2">
              <LuMapPin className="text-zinc-400" /> Endereço de Residência
            </h3>
            <div className="bg-zinc-50 p-4 rounded border border-zinc-100 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <div>
                <p className="text-zinc-500 mb-1">Logradouro</p>
                <p className="font-medium text-zinc-800">
                  {cliente?.logradouro}, {cliente?.numero}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Bairro</p>
                <p className="font-medium text-zinc-800">{cliente?.bairro}</p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Cidade / UF</p>
                <p className="font-medium text-zinc-800">
                  {cliente?.cidade} - {cliente?.estado}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">CEP</p>
                <p className="font-medium text-zinc-800">{cliente?.cep}</p>
              </div>
            </div>
          </div>
        )}

        {/* Aba 2: Empréstimos Ativos */}
        {abaAtiva === "ativos" &&
          (carregandoEmprestimos ? (
            <div className="flex justify-center items-center py-12 text-zinc-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              Buscando livros...
            </div>
          ) : ativos.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <LuBookOpen className="w-12 h-12 mx-auto mb-3 text-zinc-300" />
              <p>Nenhum empréstimo ativo no momento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ativos.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => lidarComCliqueNoEmprestimo(emp)}
                  className="flex justify-between items-center p-4 border border-zinc-200 rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                >
                  <div>
                    <p className="font-semibold text-zinc-800">{emp.livro?.titulo}</p>
                    <p className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
                      <LuCalendarDays /> Solicitado em: {emp.dataSolicitacao}
                    </p>
                  </div>
                  <BadgeStatus status={formatarStatus(emp.status)} />
                </div>
              ))}
            </div>
          ))}

        {/* Aba 3: Histórico */}
        {abaAtiva === "historico" &&
          (carregandoEmprestimos ? (
            <div className="flex justify-center items-center py-12 text-zinc-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              Buscando histórico...
            </div>
          ) : historico.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              <LuHistory className="w-12 h-12 mx-auto mb-3 text-zinc-300" />
              <p>Histórico de leitura vazio.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historico.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => lidarComCliqueNoEmprestimo(emp)}
                  className="flex justify-between items-center p-3 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-zinc-700">{emp.livro?.titulo}</p>
                    <p className="text-xs text-zinc-400">Emprestado em: {emp.dataSolicitacao}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <BadgeStatus status={formatarStatus(emp.status)} />
                    {emp.dataDevolucao && emp.dataDevolucao !== "Aguardando" && (
                      <span className="text-xs text-zinc-500">Devolvido: {emp.dataDevolucao}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModalDetalhesCliente;
