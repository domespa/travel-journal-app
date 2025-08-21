// SUPABASE & FORMATDATE
import { supabase } from "./utils/supabase";

// HOOK
import { useContext, useState } from "react";

// CONTEXT
import { TravelContext } from "./context/TravelContext";

// COMPONENTS
import NoteCard from "./components/NoteCard";
import Modal from "./components/Modal";
import DetailModal from "./components/DetailModal";
import Searchbar from "./components/Searchbar";
import TravelMap from "./components/TravelMap";

export default function App() {
  const { notes, handleNoteAdded, loading, error } = useContext(TravelContext);
  const [show, setShow] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");

  // FUNZIONI PER APRIRE E CHIUDERE LE MODAL SELEZIONATE
  const handleOpenNote = (n) => {
    setSelectedNote(n);
    setShowDetailModal(true);
  };

  const handleCloseNote = () => {
    setShowDetailModal(false);
    setSelectedNote(null);
  };

  // FILTRAGGIO VIAGGI
  const filteredNotes = notes.filter((n) => {
    if (!search) return true;

    return (
      n.location.toLowerCase().includes(search.toLowerCase()) ||
      n.mood.toLowerCase().includes(search.toLowerCase()) ||
      n.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const placeHolder = "https://placehold.co/400x200";

  return (
    <>
      {/* HEADER */}
      <header className="bg-primary text-white text-center py-2">
        <div className="container">
          <h1 className="mb-0">🌍 Travel Journal 🌍</h1>
          <p className="mb-0">I tuoi viaggi e ricordi</p>
        </div>
      </header>
      <main>
        {/* ERRORI */}
        {error && (
          <div className="container mb-4">
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
              <span>❌ {error}</span>
            </div>
          </div>
        )}

        {/* MAPPA */}
        <div className="container mt-4">
          <TravelMap
            notes={notes}
            onMarkerClick={(note) => {
              setSelectedNote(note);
              setShowDetailModal(true);
            }}
          />
        </div>

        {/* VIAGGI */}
        <div className="container pt-5">
          <h3 className="mb-4">📋 I tuoi viaggi ({filteredNotes.length})</h3>

          <Searchbar search={search} setSearch={setSearch} />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <p className="mt-2">Caricamento viaggi...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">🎒 Nessun viaggio ancora</h4>
              <p className="text-muted">Aggiungi la tua prima esperienza!</p>
            </div>
          ) : (
            <div className="row pt-5">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  placeHolder={placeHolder}
                  onClick={handleOpenNote}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            className="btn btn-warning position-fixed bottom-0 end-0 m-3"
            onClick={() => setShow(true)}
          >
            ✈️ Aggiungi
          </button>

          {/* MODALE AGGIUNTA VIAGGIO */}
          <Modal
            title="Aggiungi un Nuovo Viaggio"
            show={show}
            onClose={() => setShow(false)}
            onNoteAdded={(newNote) => {
              handleNoteAdded(newNote);
              setShow(false);
            }}
          />

          {/* MODALE VIAGGIO */}
          {selectedNote && (
            <DetailModal
              note={selectedNote}
              show={showDetailModal}
              onClose={handleCloseNote}
              placeHolder={placeHolder}
            />
          )}
        </div>
      </main>
    </>
  );
}
