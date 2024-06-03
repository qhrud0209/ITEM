import React from "react";
import styles from "./History.module.css";

function History({ name, studentNumber, date }) {
  console.log(name, studentNumber, date);
  return (
    <div>
      <li className={styles.history}>
        {studentNumber} {name} - {date}
      </li>
    </div>
  );
}
export default History;
