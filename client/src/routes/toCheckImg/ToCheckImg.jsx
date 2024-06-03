import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import replaceIMG from "../../assets/image/replaceIMG.png";

function ToCheckImg() {
  const [img, setImg] = useState();

  useEffect(() => {
    //console.log(replaceIMG);
    var data = replaceIMG.split(",")[1];
    console.log("data: " + data);
    console.log("atob:" + atob(data));
    console.log("type" + typeof atob(data));

    setImg(atob(data));

    console.log("plz:" + img);
  }, []);

  return (
    <div>
      <h1>Check Image</h1>

      <img src={`data:image/png;base64,${btoa(img)}`} alt="product" />
    </div>
  );
}

export default ToCheckImg;
