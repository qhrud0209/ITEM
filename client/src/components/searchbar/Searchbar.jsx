import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Searchbar.module.css";

function Searchbar() {
  const [searchterm, setSearchterm] = useState("");
  const navigate = useNavigate();

  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      //console.log("enter");

      const decoding_searchTerm = decodeURIComponent(searchterm);

      //console.log(searchterm);
      //console.log(decoding_searchTerm);

      navigate(`/items/list/${searchterm}`);
    }
  };
  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="검색어를 입력하세요."
        name="search"
        onChange={(e) => setSearchterm(e.target.value)}
        onKeyDown={onKeySearch}
      />
      <button
        className={styles.submitButton}
        type="submit"
        onClick={() => navigate(`/items/${searchterm}`)}
      >
        검색
      </button>
    </div>
  );
}

export default Searchbar;
