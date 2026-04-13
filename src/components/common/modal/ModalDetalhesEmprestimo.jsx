import { useEffect } from "react";
import Badge from "../Badge";
import Botao from "../Botao";
import LinhaDoTempo from "./LinhaDoTempo";
import { useAcoesEmprestimo } from "../../../hooks/emprestimo/useAcoesEmprestimo";
import {
  LuCircleHelp,
  LuClock,
  LuCircleAlert,
  LuCircleCheckBig,
  LuCircleX,
  LuBookOpen,
  LuUser,
  LuCalendar,
  LuBook,
} from "react-icons/lu";

import { FaWhatsapp } from "react-icons/fa";

// Mapeamento de status -> ícones e estilos
const mapaStatusCabecalho = {
  Solicitado: {
    icone: <LuCircleHelp className="w-full h-full text-blue-500" />,
    descricao: "O cliente solicitou o empréstimo e aguarda retirada",
    bgCor: "bg-blue-50",
    bgIcone: "bg-blue-200",
  },
  Emprestado: {
    icone: <LuClock className="w-full h-full text-purple-500" />,
    descricao: "O livro foi retirado pelo cliente e está emprestado",
    bgCor: "bg-purple-50",
    bgIcone: "bg-purple-200",
  },
  Atrasado: {
    icone: <LuCircleAlert className="w-full h-full text-red-500" />,
    descricao: "O prazo de devolução foi ultrapassado",
    bgCor: "bg-red-50",
    bgIcone: "bg-red-200",
  },
  Devolvido: {
    icone: <LuCircleCheckBig className="w-full h-full text-green-500" />,
    descricao: "O livro foi devolvido à biblioteca",
    bgCor: "bg-green-50",
    bgIcone: "bg-green-200",
  },
  Cancelado: {
    icone: <LuCircleX className="w-full h-full text-gray-500" />,
    descricao: "O empréstimo foi cancelado",
    bgCor: "bg-gray-50",
    bgIcone: "bg-gray-200",
  },
};

const ItemInfo = ({ label, valor, className, valorClassName = "" }) => (
  <div className={className}>
    <p className="text-sm text-zinc-600 leading-6">{label}</p>
    <p className={`font-medium ${valorClassName}`}>{valor || "-"}</p>
  </div>
);

const GrupoInfo = ({ titulo, icone: Icone, children }) => (
  <div>
    <div className="flex gap-2 items-center my-5">
      <Icone className="w-5 h-5" />
      <h2 className="font-bold text-xl">{titulo}</h2>
    </div>
    <div className="border border-zinc-300 rounded-lg p-5">{children}</div>
  </div>
);

const ModalDetalhesEmprestimo = ({ id, aoAtualizar, aoFechar }) => {
  const {
    visualizarDetalhes,
    dados,
    carregando,
    confirmarRetirada,
    cancelarEmprestimo,
    renovarEmprestimo,
    devolverEmprestimo,
  } = useAcoesEmprestimo();

  useEffect(() => {
    if (id) visualizarDetalhes(id);
  }, [id]);

  console.log("dados:", dados);

  const lidarComCancelamento = async () => {
    const resposta = await cancelarEmprestimo(dados.id);
    if (resposta.success && aoAtualizar) aoAtualizar();
  };

  const lidarComRetirada = async () => {
    const resposta = await confirmarRetirada(dados.id);
    if (resposta.success && aoAtualizar) aoAtualizar();
  };

  const lidarComRenovacao = async () => {
    const resposta = await renovarEmprestimo(dados.id);
    if (resposta.success && aoAtualizar) aoAtualizar();
  };

  const lidarComDevolucao = async () => {
    const resposta = await devolverEmprestimo(dados.id, "Devolvido em bom estado");
    if (resposta.success && aoAtualizar) aoAtualizar();
  };

  const lidarComWhatsApp = () => {
    if (!dados?.cliente?.telefone) {
      alert("O cliente não possui um telefone cadastrado.");
      return;
    }

    // Remove tudo que não for número (ex: parênteses, traços, espaços)
    const numeroLimpo = dados.cliente.telefone.replace(/\D/g, "");

    // Monta a mensagem amigável (o encodeURIComponent garante que espaços e acentos funcionem no link)
    const mensagem = encodeURIComponent(
      `Olá ${dados.cliente.nome}, tudo bem? Notamos que o livro "${dados.livro.titulo}" venceu. Gostaria de solicitar a renovação do prazo ou prefere agendar a devolução na biblioteca?`,
    );

    // O "55" é o código do Brasil. Se o telefone já vier com 55, precisará de um ajuste fino aqui depois.
    window.open(`https://wa.me/55${numeroLimpo}?text=${mensagem}`, "_blank");
  };

  const renderizarAcoes = () => {
    const podeRenovar = dados?.renovacoes < 2;

    switch (dados.status) {
      case "Solicitado":
        return (
          <>
            <Botao variante="danger" onClick={lidarComCancelamento}>
              Cancelar
            </Botao>
            <Botao variante="primary" onClick={lidarComRetirada}>
              Confirmar Retirada
            </Botao>
          </>
        );
      case "Emprestado":
        return (
          <>
            <Botao variante="outline" disabled={!podeRenovar} onClick={lidarComRenovacao}>
              Renovar ({dados.renovacoes}/2)
            </Botao>
            <Botao variante="primary" onClick={lidarComDevolucao}>
              Devolver Livro
            </Botao>
          </>
        );
      case "Atrasado":
        return (
          <>
            {/* O Botão de Contato com visual verde do WhatsApp */}
            <Botao
              variante="outline"
              className="border-green-500 text-green-600 hover:bg-green-50 flex items-center gap-2"
              onClick={lidarComWhatsApp}
            >
              <FaWhatsapp className="text-lg" /> Contatar
            </Botao>

            <Botao variante="outline" disabled={!podeRenovar} onClick={lidarComRenovacao}>
              Renovar ({dados.renovacoes}/2)
            </Botao>

            <Botao variante="primary" onClick={lidarComDevolucao}>
              Devolver Livro
            </Botao>
          </>
        );
      default:
        return null;
    }
  };

  // Filtro inteligente para dados vazios ou aguardando
  const formatarValor = (valor) => {
    if (!valor || valor === "Aguardando") {
      // Se o ciclo já fechou, não estamos aguardando mais nada.
      if (dados.status === "Cancelado" || dados.status === "Devolvido") {
        return "-";
      }
      return "Aguardando";
    }
    return valor;
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center p-10">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!dados) return null;

  const cabecalho = mapaStatusCabecalho[dados.status] || {};

  return (
    <div>
      {/* Cabeçalho */}
      <div className={`${cabecalho.bgCor} p-5 rounded-t-lg`}>
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className={`rounded-full p-2 w-10 h-10 ${cabecalho.bgIcone}`}>{cabecalho.icone}</div>
            <div>
              <h3 className="text-lg font-bold">{dados.status}</h3>
              <p className="text-sm text-zinc-600">{cabecalho.descricao}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-3 flex justify-between">
          {[
            { label: "Livro", valor: dados.livro?.titulo, Icone: LuBookOpen },
            { label: "Cliente", valor: dados.cliente?.nome, Icone: LuUser },
          ].map(({ label, valor, Icone }) => (
            <div key={label} className="flex gap-3 items-center">
              <div className="rounded-full p-2 bg-white w-10 h-10">
                <Icone className="w-full h-full" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 leading-6">{label}</p>
                <h3 className="text-base font-bold leading-6">{valor}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linha do tempo */}
      <div className="my-5">
        <LinhaDoTempo items={dados} />
      </div>

      {/* Detalhes do empréstimo */}
      <GrupoInfo titulo="Detalhes do Empréstimo" icone={LuCalendar}>
        <div className="flex mt-2 gap-10">
          <div className="flex-1 flex flex-col gap-3">
            <ItemInfo label="Solicitação e aprovação" valor={dados.dataSolicitacao} />
            <ItemInfo label="Prazo de retirada" valor={dados.prazoRetirada} />
            <ItemInfo label="Data da retirada/empréstimo" valor={formatarValor(dados.dataEmprestimo)} />
            <ItemInfo label="Prazo para devolução" valor={formatarValor(dados.prazoDevolucao)} />
            <ItemInfo
              label="Data do cancelamento"
              valor={dados.dataCancelamento === "Aguardando" ? "-" : dados.dataCancelamento}
            />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <ItemInfo label="Data da devolução" valor={formatarValor(dados.dataDevolucao)} />
            <ItemInfo label="Data da Última Renovação" valor={dados.ultimaRenovacao} />
            <ItemInfo label="Quantidade de renovações" valor={`${dados.renovacoes}`} />
            <ItemInfo label="Funcionário responsável" valor={formatarValor(dados.funcionario?.nome)} />
          </div>
        </div>
      </GrupoInfo>

      {/* Informações do Livro */}
      <GrupoInfo titulo="Informações sobre o Livro" icone={LuBook}>
        <div className="flex mt-2 gap-10">
          <div className="flex-1 flex flex-col gap-3">
            <ItemInfo label="Título" valor={dados.livro?.titulo} />
            <ItemInfo label="ISBN" valor={dados.livro?.isbn} />
            <ItemInfo label="Autor" valor={dados.livro?.autor?.nome} />
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <ItemInfo label="Editora" valor={dados.livro?.editora?.nome} />
            <div>
              <p className="text-sm text-zinc-600 leading-6">Categorias</p>
              <div className="flex gap-2 flex-wrap mt-1">
                {dados.livro?.categoria?.map((cat) => (
                  <Badge key={cat.id} tamanho="md" variante="outline">
                    {cat.nome}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GrupoInfo>

      {/* Informações do Cliente */}
      <GrupoInfo titulo="Informações sobre o Cliente" icone={LuUser}>
        <div className="flex-1 flex flex-col gap-3">
          <ItemInfo label="Nome" valor={dados.cliente?.nome} />
          <div className="flex">
            <ItemInfo className="flex-1" label="Email" valor={dados.cliente?.email} />
            <ItemInfo className="flex-1" label="Telefone" valor={dados.cliente?.telefone} />
          </div>
          <ItemInfo
            label="Endereço"
            valor={`${dados.cliente.logradouro}, ${dados.cliente.numero} - ${dados.cliente.bairro}, ${dados.cliente.cidade}/${dados.cliente.estado} - ${dados.cliente.cep}`}
          />
        </div>
      </GrupoInfo>

      {/* Footer */}
      <div className="flex justify-between items-center mt-8 border-t border-zinc-200 pt-5">
        <Botao variante="outline">Imprimir Recibo</Botao>
        <div className="flex gap-4">
          {renderizarAcoes()}
          <Botao variante="outline" onClick={aoFechar}>
            Fechar
          </Botao>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalhesEmprestimo;
