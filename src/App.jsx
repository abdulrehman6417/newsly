import { Route, Routes } from "react-router-dom";

import Signin from "./components/Signin/Signin";
import MainPage from "./components/MainPage/MainPage";
import NewsDetails from "./components/NewsDetails/NewsDetails";

function App() {
  return (
    <>
      {/* <Signin /> */}
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<NewsDetails />} />
      </Routes>
    </>
  );
}

export default App;
