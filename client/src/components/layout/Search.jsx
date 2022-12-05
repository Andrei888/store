import React from "react";

function Search() {
  return (
    <div>
      <input
        id="search-value"
        className="module-search_input"
        type="text"
        placeholder="Cauta telefon"
      />

      <input
        id="search-submit"
        className="module-search_submit"
        type="submit"
        value="Cauta telefon"
      />
    </div>
  );
}

export default Search;
