import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Item from "../../components/item/Item.jsx";
import Header from "../../components/header/Header.jsx";
import Add from "../../components/add/Add.jsx";
import styles from "./Items.module.css";
function Items() {
  const { searchTerm } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    //console.log(searchTerm);
    (async () => {
      const res = await fetch(`/search/${searchTerm}`);
      const data = await res.json();
      setItems(data);
      console.log(data);
    })();
  }, [searchTerm]);

  // 0 : 번호 , 1 : productName, 2:location, 3 : function, 4 : img, 5 : registrant, 6 : registeredDate
  return (
    <div>
      <Header />
      <div>
        {items.map((item) => {
          return (
            //console.log(item[4]),
            //console.log(btoa(item[4])),
            <div>
              <Item
                pid={item[0]}
                productName={item[1]}
                location={item[2]}
                func={item[3]}
                img={btoa(item[4])}
                registrant={item[5]}
                registeredDate={item[6]}
              />
            </div>
          );
        })}
      </div>
      <Add />
    </div>
  );
}

export default Items;
