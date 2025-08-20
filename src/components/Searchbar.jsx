import { useCallback, useEffect, useRef } from "react";
import { debounce } from "../utils/debounce";

export default function Searchbar({ search, setSearch }) {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearch = useCallback(
    debounce((value) => setSearch(value), 500),
    [setSearch]
  );
  return (
    <div className="input-group" style={{ maxWidth: "400px" }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Cerca..."
        className="form-control"
        defaultValue={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}
