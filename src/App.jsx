// SUPABASE
import { supabase } from "./utils/supabase";

// HOOK
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    fetchSupa();
  }, []);

  const fetchSupa = async () => {
    try {
      const { data, error } = await supabase
        .from(`travel_notes`)
        .select(`*`)
        .order(`created_at`, { ascending: false });

      if (error) throw error;
      console.log("💚Connessione a supabase riuscita!");
    } catch (error) {
      console.error("Connessione a supabase non riuscita:", error.message);
    }
  };

  return (
    <>
      <h1>Progetto con supabase</h1>
    </>
  );
}
