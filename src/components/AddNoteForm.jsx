import { useState } from "react";
import { supabase } from "../utils/supabase";

export default function AddNoteForm({ onNoteAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    mood: "",
    positive_reflection: "",
    negative_reflection: "",
    physical_effort: 1,
    economic_effort: 1,
    actual_expense: "",
    image_url: "",
    date_visited: new Date().toISOString().split("T")[0],
  });

  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // FUNZIONE HANDLECHANGE PER GESTIRE IN MANIERA PIU' PULITA I CAMPI INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FUNZIONE HANDLESUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const tagsInArray = tags
        ? tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [];

      const tripData = {
        ...formData,
        tags: tagsInArray,
        actual_expense: formData.actual_expense
          ? parseFloat(formData.actual_expense)
          : null,
      };

      // INVIO IL FORM A SUPABASE
      const { data, error } = await supabase
        .from("travel_notes")
        .insert([tripData])
        .select();

      if (error) throw error;

      setFormData({
        title: "",
        description: "",
        location: "",
        mood: "",
        positive_reflection: "",
        negative_reflection: "",
        physical_effort: 1,
        economic_effort: 1,
        actual_expense: "",
        image_url: "",
        date_visited: new Date().toISOString().split("T")[0],
      });
      setTags("");

      // PASSIAMOLA AL GENITORE
      onNoteAdded?.(data[0]);

      alert("👍Nota aggiunta con successo");
    } catch (error) {
      console.error("Errore", error);
      setError(error.message || "Errore nell'aggiungere la nota");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white p-3 text-center">
              <h4>Aggiungi un Viaggio</h4>
            </div>

            {/* MOSTRA ERRORI SE CI SONO */}
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  ❌ {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* TITOLO */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Titolo *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="es. Colosseo, Pranzo da Luigi..."
                    required
                  />
                </div>

                {/* DOVE */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Luogo *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="es. Catania, Italia"
                    required
                  />
                </div>

                {/* QUANDO */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Data visita</label>
                  <input
                    type="date"
                    name="date_visited"
                    value={formData.date_visited}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* DESCRIZIONE */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Descrizione</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                    rows={3}
                    placeholder="Racconta la tua esperienza..."
                  />
                </div>

                {/* STATO */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Stato d'animo</label>
                  <select
                    name="mood"
                    value={formData.mood}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="" disabled selected>
                      Seleziona...
                    </option>
                    <option value="felice">😊 Felice</option>
                    <option value="emozionato">🤩 Emozionato</option>
                    <option value="rilassato">😌 Rilassato</option>
                    <option value="stressato">😒 Insoddisfatto</option>
                    <option value="stanco">😴 Stanco</option>
                    <option value="meravigliato">🤯 Meravigliato</option>
                  </select>
                </div>

                {/* TAGS */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Tags (separati da virgola)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="form-control"
                    placeholder="es. cibo, arte, natura"
                  />
                </div>

                {/* IMPEGNO FISICO */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Impegno fisico (1-5)
                    </label>
                    <select
                      name="physical_effort"
                      value={formData.physical_effort}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value={1}>1 - Molto facile</option>
                      <option value={2}>2 - Facile</option>
                      <option value={3}>3 - Medio</option>
                      <option value={4}>4 - Impegnativo</option>
                      <option value={5}>5 - Molto impegnativo</option>
                    </select>
                  </div>

                  {/* IMPEGNO ECONOMICO */}
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Effort economico (1-5)
                    </label>
                    <select
                      name="economic_effort"
                      value={formData.economic_effort}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value={1}>1 - Molto economico</option>
                      <option value={2}>2 - Economico</option>
                      <option value={3}>3 - Medio</option>
                      <option value={4}>4 - Costoso</option>
                      <option value={5}>5 - Molto costoso</option>
                    </select>
                  </div>
                </div>

                {/* COSTO */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Spesa effettiva (€)
                  </label>
                  <input
                    type="number"
                    name="actual_expense"
                    value={formData.actual_expense}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                    step="0.01"
                    placeholder="es. 25.50"
                  />
                </div>

                {/* URL*/}
                <div className="mb-4">
                  <label className="form-label fw-bold">URL Immagine</label>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`btn w-100 ${
                    loading ? "btn-secondary" : "btn-primary"
                  }`}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Salvando...
                    </>
                  ) : (
                    "💾 Salva nota di viaggio"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
