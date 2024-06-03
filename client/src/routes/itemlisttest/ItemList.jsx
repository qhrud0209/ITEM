import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Item from "../../components/item/Item.jsx";
import Header from "../../components/header/Header.jsx";
import Add from "../../components/add/Add.jsx";
import styles from "./ItemList.module.css";

function ItemsList() {
  const { searchTerm } = useParams();

  const [items, setItems] = useState([]);
  const [array, setArray] = useState([]);

  useEffect(() => {
    console.log(searchTerm);
    (async () => {
      const res = await fetch(`/search/${searchTerm}`);
      const data = await res.json();
      setItems(data);
      console.log(data);
      return data;
    })().then((data) => {
      setArray([...Array(parseInt(data.length / 4) + 1).keys()]);
      //console.log(array);
    });
  }, [searchTerm]);

  // 0 : 번호 , 1 : productName, 2:location, 3 : function, 4 : img, 5 : registrant, 6 : registeredDate
  return (
    <div>
      <Header />
      <div className={styles.block}>
        {array.map((index) =>
          items.slice(index * 4, (index + 1) * 4 - 1).map((item) => (
            //console.log(item[4]),
            // console.log(btoa(item[4])),
            <Item
              pid={item[0]}
              productName={item[1]}
              location={item[2]}
              func={item[3]}
              img={btoa(item[4]).toString()}
              registrant={item[5]}
              registeredDate={item[6]}
            />
          ))
        )}
      </div>
      <Add />
    </div>
  );
}

export default ItemsList;
