import Button from "../Button";

const ConfirmModal = ({ message, warning, confirmText = "Confirmar", cancelText = "Cancelar", onConfirm, onClose }) => {
  return (
    <div className="pt-4">
      <div className="pb-6">
        <p>{message}</p>
        <p className="text-sm opacity-70 mt-1">{warning}</p>
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          variant="delete"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
