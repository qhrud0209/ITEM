import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Frontlogo from "../../components/frontlogo/Frontlogo";
import styles from "./Signin.module.css";

function Signin() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const signin = async () => {
    const formData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
    };

    const res = await fetch("/signin", formData);
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.message == "success") {
      navigate("/");
    } else {
      setMessage(data.message);
    }
  };

  const onKeyDownEnter = (e) => {
    console.log("i'm here");
    if (e.key === "Enter") {
      signin();
    }
  };

  return (
    <div>
      <Frontlogo />
      <div className={styles.block}>
        <div>
          <input
            className={styles.id}
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <input
            className={styles.pw}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDownEnter}
          />
        </div>
        <div>
          <button className={styles.loginBtn} onClick={signin}>
            로그인
          </button>
        </div>
        <p className={styles.message}>{message}</p>
        <div>
          <button
            className={styles.registerBtn}
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
export default Signin;
