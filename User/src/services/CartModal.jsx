import ReactDOM from "react-dom";

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-40 bg-black/50"
    ></div>
  );
};

const Overlay = ({ children, onClose }) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-2xl font-bold">My Cart</h2>

        <button
          onClick={onClose}
          className="text-2xl font-bold text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto p-5">
        {children}
      </div>
    </div>
  );
};

const elem = document.getElementById("modal-root");

function CartModal({ onClose, children }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        elem
      )}

      {ReactDOM.createPortal(
        <Overlay onClose={onClose}>
          {children}
        </Overlay>,
        elem
      )}
    </>
  );
}

export default CartModal;