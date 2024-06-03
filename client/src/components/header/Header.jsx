import React from "react";
import { useNavigate } from "react-router-dom";

import Searchbar from "../searchbar/Searchbar";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <div>
      <h1 className={styles.logo} onClick={onClickLogo}>
        ITEM
      </h1>
      <Searchbar />
    </div>
  );
}

export default Header;
