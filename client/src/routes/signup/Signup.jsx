import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Frontlogo from "../../components/frontlogo/Frontlogo";
import styles from "./Signup.module.css";
function Signup() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");

  const onSignup = async () => {
    console.log(id, pw, name, studentNumber);

    const body = {
      id: id,
      password: pw,
      name: name,
      studentNumber: studentNumber,
    };

    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log(res);

    if (res.status === 200) {
      navigate("/signin");
    }
  };

  const isThereNone =
    id === "" ||
    pw === "" ||
    name === "" ||
    studentNumber === "" ||
    studentNumber.length >= 5 ||
    typeof parseInt(studentNumber) != "number";

  return (
    <div>
      <Frontlogo />
      <div className={styles.block}>
        <input
          className={styles.id}
          type="text"
          placeholder="아이디"
          name="id"
          onChange={(e) => setId(e.target.value)}
        />

        <input
          className={styles.pw}
          type="password"
          placeholder="비밀번호"
          name="pw"
          onChange={(e) => setPw(e.target.value)}
        />

        <input
          className={styles.name}
          type="text"
          placeholder="이름"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={styles.studentNumber}
          type="text"
          placeholder="학번"
          name="studentNumber"
          onChange={(e) => setStudentNumber(e.target.value)}
        />
        <div>
          <button
            disabled={isThereNone}
            className={styles.registerBtn}
            onClick={onSignup}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
