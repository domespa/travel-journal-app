import { createContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export const TravelContext = createContext();

export function TravelProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from(`travel_notes`)
          .select(`*`)
          .order(`created_at`, { ascending: false });

        if (error) throw error;

        setNotes(data || []);
        console.log("Caricamento viaggi riuscito");
      } catch (error) {
        setError(error.message || "Errore nel caricamento dei viaggi");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteAdded = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  return (
    <TravelContext.Provider
      value={{
        notes,
        setNotes,
        loading,
        error,
        handleNoteAdded,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}
