import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";

const MainPage = () => {
  const [menu, setMenu] = useState("top-headlines?country=us");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col">
      <Navbar setMenu={setMenu} setSearch={setSearch} />
      <Home menu={menu} search={search} />
    </div>
  );
};

export default MainPage;
