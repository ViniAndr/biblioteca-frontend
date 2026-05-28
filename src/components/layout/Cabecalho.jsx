import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Context
import { useAutenticacao } from "../../contexts/AutenticacaoContext";

// Components
import Botao from "../common/Botao";

// Icons
import { PiBookOpenLight } from "react-icons/pi";
import { LuUser, LuMenu, LuX, LuLogOut, LuLayoutDashboard } from "react-icons/lu";

const Cabecalho = () => {
  const { usuario, logout } = useAutenticacao();
  const navigate = useNavigate();
  const location = useLocation(); // Usado para saber qual é a página atual

  // Estado para o menu de celular
  const [menuAberto, setMenuAberto] = useState(false);

  const navegarPara = (caminho) => {
    navigate(caminho);
    setMenuAberto(false); // Fecha o menu mobile ao navegar
  };

  const lidarComLogout = () => {
    logout();
    navegarPara("/");
  };

  // Lista centralizada de links para facilitar a manutenção
  const linksNavegacao = [
    { nome: "Home", caminho: "/" },
    { nome: "Catálogo", caminho: "/livros" },
    { nome: "Sobre Nós", caminho: "/sobre" },
    { nome: "Galeria dos Prefeitos", caminho: "/galeria-dos-prefeitos" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        {/* LOGO (Igual ao do Rodapé) */}
        <Link to="/" className="flex items-center gap-2 group z-50">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
            <PiBookOpenLight className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg md:text-xl text-zinc-900 tracking-tight hidden sm:block">
            Telecentro Municipal
          </span>
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-8">
          {linksNavegacao.map((link) => {
            const estaAtivo = location.pathname === link.caminho;
            return (
              <Link
                key={link.nome}
                to={link.caminho}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  estaAtivo ? "text-blue-600" : "text-zinc-600"
                }`}
              >
                {link.nome}
              </Link>
            );
          })}
        </nav>

        {/* AÇÕES DO USUÁRIO (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">
          {usuario ? (
            <div className="flex items-center gap-2">
              <Botao
                variante="ghost"
                onClick={() => navegarPara("/perfil")}
                className="flex gap-2 items-center text-zinc-600 hover:text-blue-600"
              >
                <LuUser className="text-lg" />
                <span className="text-sm">Meu Perfil</span>
              </Botao>

              {usuario.role === "funcionario" && (
                <Botao
                  variante="outline"
                  onClick={() => navegarPara("/dashboard/funcionario")}
                  className="flex gap-2 items-center"
                >
                  <LuLayoutDashboard /> Dashboard
                </Botao>
              )}
              {usuario.role === "admin" && (
                <Botao
                  variante="outline"
                  onClick={() => navegarPara("/dashboard/admin")}
                  className="flex gap-2 items-center"
                >
                  <LuLayoutDashboard /> Painel Admin
                </Botao>
              )}

              <Botao
                variante="ghost"
                onClick={lidarComLogout}
                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2"
              >
                <LuLogOut className="text-lg" title="Sair" />
              </Botao>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Entrar usa fantasma (outline), Cadastrar usa a cor principal */}
              <Botao variante="ghost" onClick={() => navegarPara("/login/cliente")}>
                Entrar
              </Botao>
              <Botao onClick={() => navegarPara("/cliente/cadastrar-conta")}>Cadastrar</Botao>
            </div>
          )}
        </div>

        {/* BOTÃO MENU MOBILE (HAMBÚRGUER) */}
        <button
          className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-md z-50"
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? <LuX className="h-6 w-6" /> : <LuMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* MENU MOBILE (DROPDOWN) */}
      {menuAberto && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-zinc-200 shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-3 pb-4 border-b border-zinc-100">
            {linksNavegacao.map((link) => (
              <Link
                key={link.nome}
                to={link.caminho}
                onClick={() => setMenuAberto(false)}
                className={`text-base font-medium p-2 rounded-md ${
                  location.pathname === link.caminho ? "bg-blue-50 text-blue-600" : "text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {link.nome}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-2">
            {usuario ? (
              <>
                <Botao variante="outline" onClick={() => navegarPara("/perfil")} className="justify-start gap-2">
                  <LuUser /> Meu Perfil
                </Botao>

                {usuario.role === "funcionario" && (
                  <Botao
                    variante="outline"
                    onClick={() => navegarPara("/dashboard/funcionario")}
                    className="justify-start gap-2"
                  >
                    <LuLayoutDashboard /> Dashboard
                  </Botao>
                )}
                {usuario.role === "admin" && (
                  <Botao
                    variante="outline"
                    onClick={() => navegarPara("/dashboard/admin")}
                    className="justify-start gap-2"
                  >
                    <LuLayoutDashboard /> Painel Admin
                  </Botao>
                )}

                <Botao
                  variante="ghost"
                  onClick={lidarComLogout}
                  className="justify-start gap-2 text-red-500 hover:bg-red-50"
                >
                  <LuLogOut /> Sair do sistema
                </Botao>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Botao variante="outline" onClick={() => navegarPara("/login/cliente")}>
                  Entrar
                </Botao>
                <Botao onClick={() => navegarPara("/cliente/cadastrar-conta")}>Cadastrar</Botao>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Cabecalho;
