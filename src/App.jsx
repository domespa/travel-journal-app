// SUPABASE & FORMATDATE
import { supabase } from "./utils/supabase";
import { formatDate, formatDateOnly } from "./utils/date";

// HOOK
import { useEffect } from "react";

// PAGES
import AddNoteForm from "./components/AddNoteForm";

export default function App() {
  // ----------------- INIZIO TEST CONNESSIONE SUPAPAGE
  // useEffect(() => {
  //   fetchSupa();
  // }, []);

  // const fetchSupa = async () => {
  //   try {
  //     const { data, error } = await supabase
  //       .from(`travel_notes`)
  //       .select(`*`)
  //       .order(`created_at`, { ascending: false });

  //     if (error) throw error;
  //     console.log("💚Connessione a supabase riuscita!");
  //   } catch (error) {
  //     console.error("Connessione a supabase non riuscita:", error.message);
  //   }
  // };
  // ----------------- FINE TEST

  // ----------------- INICIO TEST DATA
  console.log(formatDate(new Date().toISOString())); // "18/08/2025, 15:30"
  console.log(formatDateOnly(new Date().toISOString())); // "18/08/2025"
  // ----------------- FINE TEST DATA

  return (
    <>
      <h1>Progetto con supabase</h1>
      <AddNoteForm />
    </>
  );
}
