import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import Header from "../../components/header/Header";

import styles from "./Additem.module.css";

import replaceIMG from "../../assets/image/replaceIMG.png";

function Additem() {
  const navigate = useNavigate();

  var temp = replaceIMG.split(",")[1];
  var imageData = atob(temp);
  const imageInput = useRef();

  const [productName, setProductName] = useState("");
  const [loca, setLoca] = useState("");
  const [func, setFunc] = useState("");
  const [productImage, setProductImage] = useState(imageData);
  const [registrant, setRegistrant] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [quantity, setQuantity] = useState();

  const isNotSignin = () => {
    navigate("/signin");
    alert("로그인이 필요합니다.");
  };
  useEffect(() => {
    console.log(imageData);
    (async () => {
      const res = await fetch("/isSignin");
      const data = await res.json();
      console.log(data);
      if (data.message === "Yes") {
        console.log("로그인되어 있음");
        setRegistrant(data.name);
      } else {
        isNotSignin();
      }
    })();
    //console.log(image);
  }, []);

  const onClearAttachment = () => {
    imageInput.current.value = "";
  };

  const onChangeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      //console.log("Encoded Base 64 File String:", reader.result);
      var data = reader.result.split(",")[1];
      var binaryBlob = atob(data);
      //console.log("Encoded Binary File String:", binaryBlob);

      setProductImage(binaryBlob);
      var convertBase64 = btoa(binaryBlob);

      //console.log("Decoded Base 64 File String:", convertBase64);

      //console.log("img" + img);
    };
    reader.readAsDataURL(file);
  };

  const onAddItem = async () => {
    const today = new Date();
    const formattedDate = today.toJSON().slice(0, 10);

    setRegisteredDate(formattedDate);

    console.log(productImage);

    console.log(
      productName,
      loca,
      func,
      productImage,
      registrant,
      registeredDate,
      quantity
    );

    const res = await fetch("/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: productName,
        location: loca,
        func: func,
        image: productImage,
        registrant: registrant,
        registeredDate: formattedDate,
        quantity: quantity,
      }),
    });

    console.log(res);
    const data = await res.json();
    console.log(data);
    console.log(data.message);
    if (data.message == "success") {
      alert("물품이 추가되었습니다.");

      setProductName("");
      setLoca("");
      setFunc("");
      onClearAttachment();
      setProductImage("null");
      setQuantity("");
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.block}>
        <h1 className={styles.Title}>물품 추가</h1>
        <div className={styles.itemName}>
          <input
            className={styles.input}
            type="text"
            placeholder="물품명"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className={styles.itemLocation}>
          <input
            className={styles.input}
            type="text"
            placeholder="물품 위치"
            name="location"
            value={loca}
            onChange={(e) => setLoca(e.target.value)}
          />
        </div>
        <div className={styles.itemFunction}>
          <input
            className={styles.input}
            type="text"
            placeholder="기능"
            name="func"
            value={func}
            onChange={(e) => setFunc(e.target.value)}
          />
        </div>
        <div className={styles.itemQuantity}>
          <input
            className={styles.input}
            type="number"
            placeholder="수량"
            name="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className={styles.itemImage}>
          <input
            className={styles.input}
            type="file"
            name="image"
            ref={imageInput}
            onChange={onChangeImage}
          />
        </div>
        <button
          id="ProductImageInput"
          className={styles.addButton}
          type="submit"
          onClick={onAddItem}
        >
          추가
        </button>
      </div>
    </div>
  );
}

export default Additem;
