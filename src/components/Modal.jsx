import { createPortal } from "react-dom";
import AddNoteForm from "./AddNoteForm";

export default function Modal({
  title = "Aggiungi un Viaggio",
  show = false,
  onNoteAdded,
  onClose = () => {},
}) {
  return (
    show &&
    createPortal(
      <>
        <div className="modal-backdrop fade show " onClick={onClose} />
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title" id="modalTitle">
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={onClose}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                <AddNoteForm
                  onNoteAdded={(note) => {
                    onNoteAdded?.(note);
                    onClose?.();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </>,
      document.getElementById("modal-root")
    )
  );
}
