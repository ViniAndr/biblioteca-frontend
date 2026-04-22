import { LuMapPin, LuMail, LuPhone, LuCreditCard, LuUser } from "react-icons/lu";

import Botao from "../../../components/common/Botao";

const MeusDados = ({ dados, aoEditar }) => {
  // Recebe 'dados' (perfil completo) do PerfilCliente
  if (!dados) return null;

  const ItemDado = ({ icone: Icone, label, valor }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50/30">
      <div className="bg-white p-2.5 rounded-lg shadow-sm border border-zinc-200 text-blue-600">
        <Icone className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-zinc-800 font-semibold mt-0.5">{valor || "—"}</p>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-8">
      <div className="flex justify-between items-end mb-4">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <LuUser className="w-4 h-4" /> Informações de Contato
        </h4>
        <Botao variante="outline" tamanho="sm" onClick={aoEditar} className="text-zinc-700">
          Editar Perfil
        </Botao>
      </div>

      {/* Dados Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ItemDado icone={LuCreditCard} label="Nome Completo" valor={dados.nome} />
        <ItemDado icone={LuMail} label="E-mail" valor={dados.email} />
        <ItemDado icone={LuPhone} label="Telefone" valor={dados.telefone} />
      </div>

      {/* Endereço */}
      <div>
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <LuMapPin className="w-4 h-4" /> Localização
        </h4>

        <div className="bg-zinc-50/50 border border-zinc-200 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-12">
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Logradouro e Número</p>
              <p className="font-semibold text-zinc-800 mt-1">
                {dados.logradouro ? `${dados.logradouro}, ${dados.numero || "S/N"}` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Bairro</p>
              <p className="font-semibold text-zinc-800 mt-1">{dados.bairro || "—"}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Cidade / UF</p>
              <p className="font-semibold text-zinc-800 mt-1">
                {dados.cidade ? `${dados.cidade} - ${dados.estado}` : "—"}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">CEP</p>
              <p className="font-semibold text-zinc-800 mt-1">{dados.cep || "—"}</p>
            </div>
          </div>
        </div>

        <div className="mt-2 p-4 bg-blue-50/50 border border-blue-100 text-blue-700 rounded-xl text-xs flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <p>
            Precisa atualizar algum dado do endereço? Entre em contato com o Telecentro para validar seus novos dados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MeusDados;
