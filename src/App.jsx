// SUPABASE & FORMATDATE
import { supabase } from "./utils/supabase";

// HOOK
import { useContext, useEffect, useState } from "react";

// CONTEXT
import { TravelContext } from "./context/TravelContext";

// UTILS
import { takeDistance } from "./utils/distance";

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
  const [userLocation, setUserLocation] = useState(null);

  // FILTRI
  const [filters, setFilters] = useState({
    mood: "",
    tags: "",
    maxExpense: "",
    maxDistance: "",
    sortBy: "date_desc",
  });

  // SCROLL TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FUNZIONI PER APRIRE E CHIUDERE LE MODAL SELEZIONATE
  const handleOpenNote = (n) => {
    setSelectedNote(n);
    setShowDetailModal(true);
  };

  const handleCloseNote = () => {
    setShowDetailModal(false);
    setSelectedNote(null);
  };

  // FILTRAGGIO VIAGGI AVANZATA
  const getFilteredSortedNotes = () => {
    let filtered = notes.filter((note) => {
      //FILTRO TESTO
      if (search) {
        const searchMin = search.toLowerCase();
        const text =
          note.title?.toLowerCase().includes(searchMin) ||
          note.location?.toLowerCase().includes(searchMin) ||
          note.description?.toLowerCase().includes(searchMin) ||
          note.mood?.toLowerCase().includes(searchMin);
        if (!text) return false;
      }

      // FILTRO MOOD
      if (filters.mood && note.mood !== filters.mood) {
        return false;
      }

      // FILTRO TAG
      if (filters.tags) {
        const filteredTags = filters.tags
          .toLowerCase()
          .split(",")
          .map((t) => t.trim());
        const hasTag =
          note.tags &&
          note.tags.some((t) =>
            filteredTags.some((ft) => t.toLowerCase().includes(ft))
          );
        if (!hasTag) return false;
      }

      // FILTRO SPESA
      if (filters.maxExpense) {
        const maxExp = parseFloat(filters.maxExpense);
        if (!note.actual_expense || note.actual_expense > maxExp) {
          return false;
        }
      }

      // FILTRO DISTANZA
      if (
        filters.maxDistance &&
        userLocation &&
        note.latitude &&
        note.longitude
      ) {
        const distance = takeDistance(
          userLocation.latitude,
          userLocation.longitude,
          note.latitude,
          note.longitude
        );
        const maxDist = parseFloat(filters.maxDistance);
        if (distance > maxDist) {
          return false;
        }
      }

      return true;
    });

    //  ORDINAMENTO
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "date_desc":
          return new Date(b.date_visited) - new Date(a.date_visited);
        case "date_asc":
          return new Date(a.date_visited) - new Date(b.date_visited);
        case "expense_desc":
          return (b.actual_expense || 0) - (a.actual_expense || 0);
        case "expense_asc":
          return (a.actual_expense || 0) - (b.actual_expense || 0);
        case "distance_asc":
          if (userLocation && a.latitude && b.latitude) {
            const distA = takeDistance(
              userLocation.latitude,
              userLocation.longitude,
              a.latitude,
              a.longitude
            );
            const distB = takeDistance(
              userLocation.latitude,
              userLocation.longitude,
              b.latitude,
              b.longitude
            );
            return distA - distB;
          }
        case "distance_desc":
          if (userLocation && a.latitude && b.latitude) {
            const distA = takeDistance(
              userLocation.latitude,
              userLocation.longitude,
              a.latitude,
              a.longitude
            );
            const distB = takeDistance(
              userLocation.latitude,
              userLocation.longitude,
              b.latitude,
              b.longitude
            );
            return distB - distA;
          }
        case "title_asc":
          return a.title?.localeCompare(b.title) || 0;
        case "title_desc":
          return b.title?.localeCompare(a.title) || 0;
        default:
          return new Date(b.date_visited) - new Date(a.date_visited);
      }
    });

    return filtered;
  };

  const filteredNotes = getFilteredSortedNotes();

  const placeHolder = "https://placehold.co/400x200";

  return (
    <>
      {/* HEADER */}
      <header className=" text-center py-4">
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
        <div className="container p-4 defDiv">
          <TravelMap
            notes={notes}
            onMarkerClick={(note) => {
              setSelectedNote(note);
              setShowDetailModal(true);
            }}
            onLocationUpdate={setUserLocation}
          />
        </div>

        {/* VIAGGI */}
        <div className="container mt-5 p-4 defDiv">
          <h4 className="mb-4">📋 I tuoi viaggi ({filteredNotes.length})</h4>

          <Searchbar
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
            userLocation={userLocation}
            totalNotes={notes.length}
            filteredCount={filteredNotes.length}
          />

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Caricamento...</span>
              </div>
              <p className="mt-2">Caricamento viaggi...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-5">
              <h4>🎒 Nessun viaggio ancora</h4>
              <p>Aggiungi la tua prima esperienza!</p>
            </div>
          ) : (
            <div className="row">
              {filteredNotes.map((note, index) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  placeHolder={placeHolder}
                  userLocation={userLocation}
                  onClick={handleOpenNote}
                  index={index + 1}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            className="btn btn-warning position-fixed bottom-0 end-0 m-3"
            style={{ zIndex: 9999 }}
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
              userLocation={userLocation}
            />
          )}
        </div>
      </main>
    </>
  );
}
