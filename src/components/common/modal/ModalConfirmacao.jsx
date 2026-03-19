import Botao from "../Botao";

const ModalConfirmacao = ({ mensagem, aviso, textoConfirmar = "Confirmar", textoCancelar = "Cancelar", aoConfirmar, aoFechar }) => {
  return (
    <div className="pt-4">
      <div className="pb-6">
        <p>{mensagem}</p>
        <p className="text-sm opacity-70 mt-1">{aviso}</p>
      </div>
      <div className="flex justify-end gap-3">
        <Botao variante="outline" onClick={aoFechar}>
          {textoCancelar}
        </Botao>
        <Botao
          variante="delete"
          onClick={() => {
            aoConfirmar();
            aoFechar();
          }}
        >
          {textoConfirmar}
        </Botao>
      </div>
    </div>
  );
};

export default ModalConfirmacao;