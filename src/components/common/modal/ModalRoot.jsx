import ConfirmModal from "./ConfirmModal";
import DetailsBookModal from "./DetailsBookModal";

// Registro de tipos de modal e seus componentes correspondentes
const MODAL_COMPONENTS = {
  confirm: ConfirmModal,
  detailsBook: DetailsBookModal,
};

const ModalRoot = ({ isOpen, type, onClose, title, props, size, overlayClose }) => {
  if (!isOpen || !type) return null;

  const ModalComponent = MODAL_COMPONENTS[type];

  if (!ModalComponent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40" onClick={overlayClose ? onClose : undefined} />

      {/* Container do modal */}
      <div className={`relative bg-white rounded-lg shadow-xl p-6 ${getSizeClasses(size)}`}>
        {/* Cabeçalho */}
        {title && (
          <div className="pb-3 border-b border-zinc-200">
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
        )}

        {/* Corpo do modal renderizado dinamicamente */}
        <div className="pt-4 text-base">
          <ModalComponent {...props} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

const getSizeClasses = (size) => {
  const sizes = {
    sm: "w-full max-w-sm",
    md: "w-full max-w-md",
    lg: "w-full max-w-lg",
    xl: "w-full max-w-3xl",
  };
  return sizes[size] || sizes.md;
};

export default ModalRoot;
