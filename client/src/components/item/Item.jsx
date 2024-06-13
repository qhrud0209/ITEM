import { useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Item.module.css";

function Item({
  pid,
  productName,
  location,
  func,
  image,
  registrant,
  registeredDate,
  quantity,
}) {
  //console.log(pid, productName, func, image, registrant, registeredDate);

  const navigate = useNavigate();
  const [convertImg, setConvertImg] = useState("");

  useEffect(() => {
    console.log(image);

    (async () => {
      const res = await fetch(`/product/${pid}`);
      const data = await res.json();
      console.log(data);
      console.log(btoa(data[0][4]));
      setConvertImg(btoa(data[0][4]));
    })();
  }, []);

  const onClickItem = () => {
    navigate(`/items/detail/${pid}`, {
      state: {
        pid: pid,
        productName: productName,
        location: location,
        func: func,
        image: image,
        registrant: registrant,
        registeredDate: registeredDate,
        quantity: quantity,
      },
    });
  };
  return (
    <div className={styles.block}>
      <div className={styles.Item} onClick={onClickItem}>
        <div>
          <img
            className={styles.Img}
            src={`data:image/png;base64,${convertImg}`}
            alt="product"
          />
        </div>
        <div>
          <h1 className={styles.productName}>{productName}</h1>
          <p className={styles.productLocation}>{location}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
