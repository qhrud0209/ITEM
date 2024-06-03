import React from "react";
import Item from "../item/Item";
import styles from "./ItemList.module.css";
import Header from "../header/Header";

function ItemList({ itemList, offset, limit }) {
  console.log(itemList);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className={styles.itemList}>
        {itemList.slice(offset, offset + limit).map(
          (item) => (
            console.log(item),
            (
              <span>
                <Item
                  pid={item[0]}
                  productName={item[1]}
                  location={item[2]}
                  func={item[3]}
                  img={item[4]}
                  registrant={item[5]}
                  registeredDate={item[6]}
                />
              </span>
            )
          )
        )}
      </div>
    </div>
  );
}

export default ItemList;
