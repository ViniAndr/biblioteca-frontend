import { useState, useEffect } from "react";
import Botao from "../../components/common/Botao";
import Carregamento from "../../components/common/Carregamento";

import { useAcoesFuncionario } from "../../hooks/useAcoesFuncionario";

import { PiUserLight, PiEnvelopeLight, PiLockKeyLight, PiShieldCheckLight } from "react-icons/pi";

const PerfilFuncionario = () => {
  const { buscarPerfil, atualizarPerfil, carregando, carregandoDados } = useAcoesFuncionario();

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    senhaAtual: "",
    senhaNova: "",
  });

  const [dadosOriginais, setDadosOriginais] = useState(null);

  // Buscar dados
  useEffect(() => {
    const carregarDadosIniciais = async () => {
      const dadosBanco = await buscarPerfil();
      if (dadosBanco) {
        setFormulario((prev) => ({
          ...prev,
          nome: dadosBanco.nome || "",
          email: dadosBanco.email || "",
        }));
        setDadosOriginais(dadosBanco);
      }
    };
    carregarDadosIniciais();
  }, []);

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const salvarAlteracoes = async (e) => {
    e.preventDefault();

    const dadosParaEnviar = {};
    if (formulario.nome.trim() !== dadosOriginais?.nome) dadosParaEnviar.nome = formulario.nome;
    if (formulario.email.trim() !== dadosOriginais?.email) dadosParaEnviar.email = formulario.email;
    if (formulario.senhaAtual && formulario.senhaNova) {
      dadosParaEnviar.senhaAtual = formulario.senhaAtual;
      dadosParaEnviar.senhaNova = formulario.senhaNova;
    }

    const sucesso = await atualizarPerfil(dadosParaEnviar);

    if (sucesso) {
      // Limpa as senhas da tela e atualiza os dados originais para a nova base
      setFormulario((prev) => ({ ...prev, senhaAtual: "", senhaNova: "" }));
      setDadosOriginais({ nome: formulario.nome, email: formulario.email });
    }
  };

  // Classe padrão para os inputs para não repetirmos código (DRY)
  const estiloInput =
    "w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm text-zinc-800 placeholder:text-zinc-400";

  // Se estiver buscando do banco, mostra um loading
  if (carregandoDados) {
    return <Carregamento texto="Buscando seus dados..." />;
  }

  // Se já carregou, mostra o formulário (o resto do código fica igual ao anterior)
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto animate-fade-in">
      {/* ... o return inteiro da resposta anterior (cabeçalhos, sections, form) continua exatamente igual aqui ... */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-800 tracking-tight">Configurações da Conta</h2>
        <p className="text-sm text-zinc-500 mt-1">Gerencie seus dados pessoais e preferências de segurança.</p>
      </div>

      <form onSubmit={salvarAlteracoes} className="flex flex-col gap-8">
        {/* BLOCO DE DADOS PESSOAIS */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <PiUserLight className="text-xl text-blue-600" />
            <h3 className="text-lg font-semibold text-zinc-700">Dados Pessoais</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-white border border-zinc-100 shadow-sm rounded-xl">
            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-semibold text-zinc-600 ml-1">Nome Completo</label>
              <div className="relative">
                <PiUserLight className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                <input
                  type="text"
                  name="nome"
                  value={formulario.nome}
                  onChange={lidarComMudanca}
                  className={estiloInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 relative">
              <label className="text-sm font-semibold text-zinc-600 ml-1">E-mail Institucional</label>
              <div className="relative">
                <PiEnvelopeLight className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={lidarComMudanca}
                  className={estiloInput}
                />
              </div>
            </div>
          </div>
        </section>

        {/* BLOCO DE SEGURANÇA */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <PiShieldCheckLight className="text-xl text-emerald-600" />
            <h3 className="text-lg font-semibold text-zinc-700">Segurança</h3>
          </div>

          <div className="p-6 bg-zinc-50/50 border border-zinc-200 rounded-xl">
            <p className="text-sm text-zinc-500 mb-5">
              Preencha os campos abaixo <strong>apenas</strong> se desejar alterar a sua senha atual.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-sm font-semibold text-zinc-600 ml-1">Senha Atual</label>
                <div className="relative">
                  <PiLockKeyLight className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                  <input
                    type="password"
                    name="senhaAtual"
                    value={formulario.senhaAtual}
                    onChange={lidarComMudanca}
                    placeholder="••••••••"
                    className={estiloInput}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 relative">
                <label className="text-sm font-semibold text-zinc-600 ml-1">Nova Senha</label>
                <div className="relative">
                  <PiLockKeyLight className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-lg" />
                  <input
                    type="password"
                    name="senhaNova"
                    value={formulario.senhaNova}
                    onChange={lidarComMudanca}
                    placeholder="Mínimo de 6 caracteres"
                    className={estiloInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4 border-t border-zinc-100">
          <Botao type="submit" disabled={carregando} className="px-8">
            {carregando ? "Salvando alterações..." : "Salvar Alterações"}
          </Botao>
        </div>
      </form>
    </div>
  );
};

export default PerfilFuncionario;
