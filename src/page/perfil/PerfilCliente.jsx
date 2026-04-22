import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contexts/AutenticacaoContext";
import { listarHistoricoCliente } from "../../services/emprestimoService";
import { obterPerfilCliente } from "../../services/clienteService";
import { useModal } from "../../contexts/ModalContext";

import { LuUser, LuBookOpen, LuSettings, LuLogOut, LuLayoutDashboard, LuCalendarDays } from "react-icons/lu";

import Botao from "../../components/common/Botao";
import MeusDados from "./components/MeusDados";
import MeusEmprestimos from "./components/MeusEmprestimos";
import Carregamento from "../../components/common/Carregamento";

const PerfilCliente = () => {
  const { usuario, logout } = useAutenticacao();
  const navigate = useNavigate();

  const { abrirModal } = useModal();

  // Estados para centralizar os dados
  const [abaAtiva, setAbaAtiva] = useState("emprestimos");
  const [dadosCompletos, setDadosCompletos] = useState(null);
  const [emprestimos, setEmprestimos] = useState([]);
  const [stats, setStats] = useState({ ativos: 0, atrasados: 0, total: 0 });
  const [carregando, setCarregando] = useState(true);

  const carregarDadosDoPerfil = async () => {
    if (!usuario?.id) return;
    setCarregando(true);
    try {
      const [resCliente, resEmprestimos] = await Promise.all([
        obterPerfilCliente(),
        listarHistoricoCliente(usuario.id, {}, 1, 100),
      ]);

      if (!resCliente.error) setDadosCompletos(resCliente.data);

      if (!resEmprestimos.error) {
        const lista = resEmprestimos.data.emprestimos;
        setEmprestimos(lista);
        setStats({
          total: lista.length,
          ativos: lista.filter((e) => ["SOLICITADO", "EMPRESTADO"].includes(e.status.toUpperCase())).length,
          atrasados: lista.filter((e) => e.status.toUpperCase() === "ATRASADO").length,
        });
      }
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDadosDoPerfil();
  }, [usuario?.id]);

  const lidarComEdicao = () => {
    abrirModal("editarPerfilCliente", {
      titulo: "Editar Meus Dados",
      tamanho: "lg",
      props: {
        dados: dadosCompletos,
        aoSucesso: () => carregarDadosDoPerfil(), // Recarrega a tela sem F5!
      },
    });
  };

  if (carregando) return <Carregamento />;
  if (!usuario) return null;

  const NavItem = ({ id, titulo, icone: Icone }) => (
    <button
      onClick={() => setAbaAtiva(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all border ${
        abaAtiva === id
          ? "bg-blue-50 text-blue-700 border-blue-100 shadow-sm"
          : "text-zinc-500 border-transparent hover:bg-zinc-50 hover:text-zinc-800"
      }`}
    >
      <Icone className={`w-5 h-5 ${abaAtiva === id ? "text-blue-600" : "text-zinc-400"}`} />
      {titulo}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* CABEÇALHO */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="flex gap-6 items-center flex-1 w-full">
          <div className="relative">
            <div className="flex items-center justify-center rounded-full w-20 h-20 bg-blue-600 text-white text-3xl font-bold shadow-lg ring-4 ring-blue-50">
              {dadosCompletos?.nome?.charAt(0).toUpperCase()}
            </div>
            <div
              className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-4 border-white"
              title="Conta Ativa"
            ></div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">{dadosCompletos?.nome}</h2>
            <p className="text-zinc-500 text-sm">{dadosCompletos?.email}</p>
            <div className="flex items-center gap-2 mt-2 text-xs font-medium text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md border border-zinc-100 w-fit">
              <LuCalendarDays className="w-3.5 h-3.5" />
              <span>Membro desde Março de 2026</span>
            </div>
          </div>
        </div>

        {/* ESTATÍSTICAS */}
        <div className="flex gap-4 sm:gap-10 text-center w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-zinc-100 pt-6 lg:pt-0 lg:pl-10">
          <div className="flex-1">
            <p className="font-bold text-3xl text-zinc-800">{stats.total}</p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Lidos</p>
          </div>
          <div className="flex-1">
            <p className="font-bold text-3xl text-blue-600">{stats.ativos}</p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Ativos</p>
          </div>
          <div className="flex-1">
            <p className={`font-bold text-3xl ${stats.atrasados > 0 ? "text-red-500" : "text-zinc-800"}`}>
              {stats.atrasados}
            </p>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-1">Atrasos</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 space-y-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm">
            <nav className="flex flex-col gap-1">
              <NavItem id="emprestimos" titulo="Meus Livros" icone={LuBookOpen} />
              <NavItem id="dados" titulo="Meus Dados" icone={LuUser} />
              <NavItem id="configuracoes" titulo="Segurança" icone={LuSettings} />
            </nav>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-3 shadow-sm">
            <Botao
              variante="ghost"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="text-red-500 hover:bg-red-50 justify-start gap-3 px-4 py-3 rounded-xl w-full flex items-center font-semibold"
            >
              <LuLogOut className="w-5 h-5" /> Sair da Conta
            </Botao>
          </div>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden min-h-[450px]">
          <div className="p-6">
            {abaAtiva === "emprestimos" && <MeusEmprestimos dados={emprestimos} />}

            {abaAtiva === "dados" && <MeusDados dados={dadosCompletos} aoEditar={lidarComEdicao} />}

            {abaAtiva === "configuracoes" && (
              <div className="max-w-md mx-auto py-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center mb-8">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LuSettings className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-800">Alterar Senha</h3>
                  <p className="text-sm text-zinc-500">Mantenha sua conta segura atualizando sua senha regularmente.</p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    // Lógica de envio para alterarSenhaCliente
                  }}
                >
                  <Input label="Senha Atual" type="password" required />
                  <hr className="border-zinc-100 my-4" />
                  <Input label="Nova Senha" type="password" required />
                  <Input label="Confirmar Nova Senha" type="password" required />

                  <Botao variante="primary" className="w-full mt-6">
                    Atualizar Senha
                  </Botao>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilCliente;
