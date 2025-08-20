import { formatDate, formatDateOnly } from "../utils/date";

export default function DetailModal({ note, show, onClose, placeHolder }) {
  if (!note) {
    return null;
  }
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
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header bg-primary text-white">
            <h4 className="modal-title">{note.title}</h4>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            />
          </div>

          {/* BODY */}
          <div className="modal-body p-0">
            {/* IMG */}
            <img
              src={note.image_url || placeHolder}
              alt={note.title}
              className="w-100"
              style={{ height: "300px", objectFit: "cover" }}
            />

            <div className="p-4">
              {/* INFO */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6 className="text-muted mb-1">
                    📍 Luogo - <strong>{note.location}</strong>
                  </h6>
                </div>
                <div className="col-md-3">
                  <h6 className="text-muted mb-1">📅 Data</h6>
                  <p>{formatDateOnly(note.date_visited)}</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-muted mb-1">Mood</h6>
                  <p>
                    {note.mood && (
                      <span className="badge bg-body-secondary text-dark">
                        {getMoodEmoji(note.mood)} {note.mood}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <hr />

              {/* DESCRIZIONE */}
              {note.description && (
                <div className="mb-4">
                  <h6 className="text-muted mb-2">📝 Descrizione</h6>
                  <p className="text-justify">{note.description}</p>
                </div>
              )}

              {/* RIFLESSIONI */}
              {(note.positive_reflection || note.negative_reflection) && (
                <div className="row mb-4">
                  {note.positive_reflection && (
                    <div className="col-md-6">
                      <h6 className="text-success mb-2">
                        👍 Cosa ti è piaciuto
                      </h6>
                      <div className="bg-body-secondary p-3 rounded">
                        <p className="mb-0">{note.positive_reflection}</p>
                      </div>
                    </div>
                  )}
                  {note.negative_reflection && (
                    <div className="col-md-6">
                      <h6 className="text-warning mb-2">👎 Cosa migliorare</h6>
                      <div className="bg-body-secondary p-3 rounded">
                        <p className="mb-0">{note.negative_reflection}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAGS */}
              {note.tags && note.tags.length > 0 && (
                <div className="mb-4">
                  <h6 className="text-muted mb-2"># Tags</h6>
                  <div>
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="badge bg-secondary me-2 mb-1"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* STATS */}
              <div className="row text-center">
                <div className="col-3">
                  <div className="bg-body-secondary p-3 rounded">
                    <h6 className="text-muted mb-1">💪 Fisico</h6>
                    <h4 className="text-primary">{note.physical_effort}/5</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-body-secondary p-3 rounded">
                    <h6 className="text-muted mb-1">💰 Economico</h6>
                    <h4 className="text-warning">{note.economic_effort}/5</h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-body-secondary p-3 rounded">
                    <h6 className="text-muted mb-1">💶 Spesa</h6>
                    <h4 className="text-success">
                      {note.actual_expense
                        ? `€${note.actual_expense}`
                        : "Gratis"}
                    </h4>
                  </div>
                </div>
                <div className="col-3">
                  <div className="bg-body-secondary p-3 rounded">
                    <h6 className="text-muted mb-1">📊 Rating</h6>
                    <h4 className="text-info">
                      {(
                        (6 - note.physical_effort + 6 - note.economic_effort) /
                        2
                      ).toFixed(1)}
                      /5
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
