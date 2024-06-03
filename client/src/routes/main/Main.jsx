import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Main.module.css";
import BigLogo from "../../components/frontlogo/Frontlogo.jsx";
import Add from "../../components/add/Add.jsx";

function Main() {
  const navigate = useNavigate();

  const [isSignin, setIsSignin] = useState(false);
  const [searchterm, setSearchterm] = useState("");

  const onClickSignin = () => {
    navigate("/signin");
  };

  const onClickSignout = async () => {
    const res = await fetch("/signout");
    const data = await res.json();
    console.log(data);
    if (data.message === "success") {
      setIsSignin(false);
    }
    console.log(isSignin);
  };

  const onKeySearch = (e) => {
    if (e.key === "Enter") {
      //console.log("enter");

      const decoding_searchTerm = decodeURIComponent(searchterm);

      //console.log(searchterm);
      //console.log(decoding_searchTerm);

      navigate(`/items/list/${searchterm}`);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/isSignin");
      const data = await res.json();
      console.log(data);
      if (data.message == "Yes") {
        console.log("로그인 되어있음");
        setIsSignin(true);
        console.log(isSignin);
      }
    })();
  }, []);

  return (
    <div>
      <BigLogo />
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
          onClick={() => navigate(`/items/list/${searchterm}`)}
        >
          검색
        </button>
      </div>
      <Add />
      <div>
        {isSignin ? (
          <button className={styles.signout} onClick={onClickSignout}>
            로그아웃
          </button>
        ) : (
          <button className={styles.signin} onClick={onClickSignin}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
export default Main;
