// SUPABASE & FORMATDATE
import { supabase } from "./utils/supabase";
import { formatDate, formatDateOnly } from "./utils/date";

// HOOK
import { useEffect, useState } from "react";

// COMPONENTS
import AddNoteForm from "./components/AddNoteForm";
import NoteCard from "./components/NoteCard";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const placeHolder = "https://placehold.co/400x200";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Caricamento note");

      const { data, error } = await supabase
        .from(`travel_notes`)
        .select(`*`)
        .order(`created_at`, { ascending: false });

      if (error) throw error;

      setNotes(data);
      console.log("Note caricate", data);
    } catch (error) {
      console.error("Errore nel caricamento delle note", error.message);
      setError(error.message || "Errore nel caricamento");
    } finally {
      setLoading(false);
    }
  };

  // ----------------- INICIO TEST DATA
  // console.log(formatDate(new Date().toISOString()));
  // console.log(formatDateOnly(new Date().toISOString()));
  // ----------------- FINE TEST DATA

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
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={fetchNotes}
              >
                🔄 Riprova
              </button>
            </div>
          </div>
        )}

        {/* VIAGGI */}
        <div className="container pt-5">
          <h3 className="mb-4">📋 I tuoi viaggi ({notes.length})</h3>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <p className="mt-2">Caricamento viaggi...</p>
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">🎒 Nessun viaggio ancora</h4>
              <p className="text-muted">Aggiungi la tua prima esperienza!</p>
            </div>
          ) : (
            <div className="row">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} placeHolder={placeHolder} />
              ))}
            </div>
          )}
        </div>

        {/* AGGIUNGI VIAGGIO */}
        <AddNoteForm
          onNoteAdded={(newNote) => setNotes((prev) => [newNote, ...prev])}
        />
      </main>
    </>
  );
}
