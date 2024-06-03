import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./routes/main/Main.jsx";
import Signin from "./routes/signin/Signin.jsx";
import Signup from "./routes/signup/Signup.jsx";
import FindPW from "./routes/findpw/Findpw.jsx";

import Items from "./routes/items/Items.jsx";
import ItemDetail from "./routes/items/ItemDetail.jsx";
import Additem from "./routes/additem/Additem.jsx";
import ItemList from "./routes/itemlisttest/ItemList.jsx";

import ToCheckImg from "./routes/toCheckImg/ToCheckImg.jsx";

function App() {
  <Route path="/" element={<Main />} />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/findpw" element={<FindPW />} />
        <Route path="/items/:searchTerm" element={<Items />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/detail/:key" element={<ItemDetail />} />
        <Route path="/items/detail" element={<ItemDetail />} />
        <Route path="/items/add" element={<Additem />} />

        <Route path="/items/list/:searchTerm" element={<ItemList />} />

        <Route path="/tocheckimg" element={<ToCheckImg />} />
      </Routes>
    </Router>
  );
}

export default App;
