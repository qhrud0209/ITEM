import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import History from "../../components/record/History.jsx";
import Header from "../../components/header/Header.jsx";

import styles from "./ItemDetail.module.css";

function ItemDetail() {
  const navigate = useNavigate();

  const [isSignin, setIsSignin] = useState(false);

  const location = useLocation();
  const pid = location.state.pid;
  const productName = location.state.productName;
  const loca = location.state.location;
  const func = location.state.func;
  const image = location.state.image;
  const registrant = location.state.registrant;
  const registeredDate = location.state.registeredDate;

  //console.log(pid, productName, loca, func, image, registrant, registeredDate);

  const [histories, setHistories] = useState([]);

  const [convertImg, setConvertImg] = useState("");
  useEffect(() => {
    (async () => {
      const res = await fetch(`/product/history/${pid}`);
      const data = await res.json();
      //console.log(data);
      setHistories(data);
      console.log(histories);

      const resProduct = await fetch(`/product/${pid}`);
      const dataProduct = await resProduct.json();
      //console.log(dataProduct);
      //    console.log(btoa(dataProduct[0][4]));
      setConvertImg(btoa(dataProduct[0][4]));
    })();
  }, []);

  const onClickUSE = async () => {
    const resIsSignin = await fetch("/isSignin");
    const dataIsSignin = await resIsSignin.json();
    if (dataIsSignin.message === "Yes") {
      const resUser = await fetch("/user/info");
      const UserData = await resUser.json();

      console.log(UserData);

      const today = new Date();
      const formattedDate = today.toJSON().slice(0, 10);

      const res = await fetch("/product/history/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemID: pid,
          name: UserData.name,
          studentNumber: UserData.studentNumber,
          date: formattedDate,
        }),
      });

      console.log(res);

      window.location.reload();
    } else {
      alert("로그인이 필요합니다.");
      navigate("/signin");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.block}>
        <div>
          <img
            className={styles.IMG}
            src={`data:image/png;base64,${convertImg}`}
            alt="product"
          />
        </div>
        <div>
          <p className={styles.productName}>물품명 | {productName}</p>
          <p className={styles.productLocation}>물품 위치 | {loca}</p>
          <p className={styles.productFunction}>기능 | {func}</p>
          <p className={styles.productRegistrant}>
            등록인 | {registrant} / 등록 날짜 | {registeredDate}
          </p>
        </div>
        <p className={styles.historyUse}>사용 기록</p>
        <ul className={styles.historyBlock}>
          {histories.map((history) => {
            return (
              <History
                name={history[1]}
                studentNumber={history[2]}
                date={history[3]}
              />
            );
          })}
        </ul>
        <button className={styles.UseButton} onClick={onClickUSE}>
          사용하기
        </button>
      </div>
    </div>
  );
}

export default ItemDetail;
