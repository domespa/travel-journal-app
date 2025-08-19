import { formatDate, formatDateOnly } from "../utils/date";

export default function NoteCard({ note, placeHolder }) {
  // FUNZIONE HELPER PER GESTIRE IL MOOD
  const getMoodEmoji = (mood) => {
    const moods = {
      felice: "😊",
      emozionato: "🤩",
      rilassato: "😌",
      insoddisfatto: "😒",
      stanco: "😴",
      meravigliato: "🤯",
    };
    return moods[mood] || "😶‍🌫️";
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm hover-card">
        {/* IMMAGINE */}
        <img
          src={note.image_url || placeHolder}
          alt={note.title}
          className="card-img-top cardImg"
        />

        {/* TITOLO E LUOGO */}
        <div className="card-header bg-primary text-white">
          <h4 className="card-title mb-1">{note.title}</h4>
          <small>🗺️ {note.location}</small>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            {/* QUANDO */}
            <small className="text-muted">
              📅 {formatDateOnly(note.date_visited)}
            </small>

            {/* MOOD */}
            {note.mood && (
              <span className="badge bg-light text-dark">
                {getMoodEmoji(note.mood)} {note.mood}
              </span>
            )}
          </div>

          {/* DESCRIZIONE CON LIMITE DI 100 CARATTERI */}
          {note.description && (
            <p className="card-text text-muted">
              {note.description.length > 100
                ? `${note.description.substring(0, 100)}...`
                : note.description}
            </p>
          )}

          {/* TAGS */}
          {note.tags && note.tags.length > 0 && (
            <div className="mb-2">
              {note.tags.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-1">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
