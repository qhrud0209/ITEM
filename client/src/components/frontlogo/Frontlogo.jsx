import React from "react";
import styles from "./Frontlogo.module.css";

import { useNavigate } from "react-router-dom";

function Frontlogo() {
  const navigate = useNavigate();
  const Clicklogo = () => {
    navigate("/");
  };

  return (
    <h1 onClick={Clicklogo} className={styles.frontlogo}>
      ITEM
    </h1>
  );
}

export default Frontlogo;
