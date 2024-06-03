import React from "react";
import { useNavigate } from "react-router-dom";
import plusImg from "../../assets/image/addbutton.png";
import styles from "./Add.module.css";

function Add() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/items/add");
  };

  return (
    <div className={styles.AddBtnLocation}>
      <button className={styles.AddButton} onClick={onClickAdd}>
        <img className={styles.AddImg} src={plusImg}></img>
      </button>
    </div>
  );
}

export default Add;
