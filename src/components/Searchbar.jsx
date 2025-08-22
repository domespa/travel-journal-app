import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "../utils/debounce";

export default function Searchbar({
  search,
  setSearch,
  filters,
  setFilters,
  userLocation,
  totalNotes,
  filteredCount,
}) {
  const inputRef = useRef();
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    [setSearch]
  );

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setSearch("");
    setFilters({
      mood: "",
      tags: "",
      maxExpense: "",
      maxDistance: "",
      sortBy: "date_desc",
    });
    // Reset anche il campo di ricerca visivamente
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const hasActiveFilters =
    search ||
    filters.mood ||
    filters.tags ||
    filters.maxExpense ||
    filters.maxDistance;

  return (
    <div className="mb-4">
      {/* BARRA DI RICERCA PRINCIPALE - la tua versione originale */}
      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <div className="input-group" style={{ maxWidth: "400px" }}>
            <span className="input-group-text">🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Cerca per titolo, luogo, descrizione o mood..."
              className="form-control"
              defaultValue={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {search && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setSearch("");
                  inputRef.current.value = "";
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
          >
            <option value="date_desc">📅 Più recenti prima</option>
            <option value="date_asc">📅 Più vecchi prima</option>
            <option value="expense_desc">💰 Spesa: dal più caro</option>
            <option value="expense_asc">💰 Spesa: dal più economico</option>
            <option value="title_asc">🔤 Titolo: A-Z</option>
            <option value="title_desc">🔤 Titolo: Z-A</option>
            {userLocation && (
              <>
                <option value="distance_asc">📍 Più vicini a te</option>
                <option value="distance_desc">📍 Più lontani da te</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* TOGGLE FILTRI AVANZATI */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? "🔽" : "▶️"} Filtri avanzati
          {hasActiveFilters && (
            <span className="badge bg-warning text-dark ms-2">!</span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={clearAllFilters}
          >
            🗑️ Cancella filtri
          </button>
        )}
      </div>

      {/* FILTRI AVANZATI */}
      {showAdvanced && (
        <div className="card">
          <div className="card-body">
            <div className="row g-3">
              {/* FILTRO MOOD */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">😊 Mood</label>
                <select
                  className="form-select form-select-sm"
                  value={filters.mood}
                  onChange={(e) => handleFilterChange("mood", e.target.value)}
                >
                  <option value="">Tutti i mood</option>
                  <option value="😊 Felice">😊 Felice</option>
                  <option value="😍 Innamorato">😍 Innamorato</option>
                  <option value="🤩 Entusiasta">🤩 Entusiasta</option>
                  <option value="😌 Rilassato">😌 Rilassato</option>
                  <option value="🤔 Pensieroso">🤔 Pensieroso</option>
                  <option value="😢 Nostalgico">😢 Nostalgico</option>
                  <option value="😴 Stanco">😴 Stanco</option>
                  <option value="🤯 Sorpreso">🤯 Sorpreso</option>
                </select>
              </div>
              {/* FILTRO TAGS */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">🏷️ Tags</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="es: mare, montagna, cibo"
                  value={filters.tags}
                  onChange={(e) => handleFilterChange("tags", e.target.value)}
                />
                <div className="form-text">Separati da virgola</div>
              </div>

              {/* FILTRO SPESA MASSIMA */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">💰 Spesa massima (€)</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="es: 500"
                  min="0"
                  step="10"
                  value={filters.maxExpense}
                  onChange={(e) =>
                    handleFilterChange("maxExpense", e.target.value)
                  }
                />
              </div>

              {/* FILTRO DISTANZA MASSIMA */}
              <div className="col-md-6 col-lg-3">
                <label className="form-label">
                  📍 Distanza massima (km)
                  {!userLocation && (
                    <small className="text-muted"> - GPS richiesto</small>
                  )}
                </label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="es: 100"
                  min="0"
                  step="10"
                  value={filters.maxDistance}
                  onChange={(e) =>
                    handleFilterChange("maxDistance", e.target.value)
                  }
                  disabled={!userLocation}
                />
                {!userLocation && (
                  <div className="form-text text-warning">
                    Abilita la geolocalizzazione per usare questo filtro
                  </div>
                )}
              </div>
            </div>

            {/* STATISTICHE FILTRI */}
            {hasActiveFilters && (
              <div className="mt-3 p-2 bg-light rounded">
                <small className="text-muted">
                  🔍 Filtri attivi: mostrati <strong>{filteredCount}</strong> di{" "}
                  <strong>{totalNotes}</strong> viaggi
                </small>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
