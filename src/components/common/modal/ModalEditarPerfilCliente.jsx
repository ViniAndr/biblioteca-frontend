import { useState } from "react";
import Botao from "../Botao";
import Input from "../../forms/Input";
import { atualizarPerfilCliente } from "../../../services/clienteService";
import { useAlerta } from "../../../contexts/AlertaContext";

const ModalEditarPerfilCliente = ({ dados, aoSucesso, aoFechar }) => {
  const { mostrarAlerta } = useAlerta();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: dados.nome || "",
    email: dados.email || "",
    telefone: dados.telefone || "",
  });

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const salvar = async (e) => {
    e.preventDefault();

    const mudouNome = form.nome !== dados.nome;
    const mudouEmail = form.email !== dados.email;
    const mudouTelefone = form.telefone !== dados.telefone;

    if (!mudouNome && !mudouEmail && !mudouTelefone) {
      mostrarAlerta("Nenhuma alteração foi feita.", "attention");
      aoFechar(); // Apenas fecha o modal, não precisa chamar a API
      return;
    }

    setLoading(true);

    const res = await atualizarPerfilCliente({
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
    });

    if (!res.error) {
      mostrarAlerta("Perfil atualizado com sucesso!", "success");
      aoSucesso(); // Recarrega os dados na tela principal
      aoFechar();
    } else {
      // 3. Se der erro (ex: email já existe), mostramos o erro que veio do back
      mostrarAlerta(res.message, "error");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={salvar} className="space-y-4">
      <Input label="Nome Completo" name="nome" value={form.nome} onChange={lidarComMudanca} required />
      <Input label="E-mail" name="email" type="email" value={form.email} onChange={lidarComMudanca} required />
      <Input label="Telefone / WhatsApp" name="telefone" value={form.telefone} onChange={lidarComMudanca} required />

      <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
        <Botao variante="outline" onClick={aoFechar} type="button">
          Cancelar
        </Botao>
        <Botao variante="primary" type="submit" carregando={loading}>
          Salvar Alterações
        </Botao>
      </div>
    </form>
  );
};

export default ModalEditarPerfilCliente;
