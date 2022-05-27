import { Route, Routes } from "react-router-dom";

import NavBar from "components/NavBar/NavBar";
import Slideshow from "components/Slideshow/Slideshow";

import images from "assets/img/promotions/promotions.js";

function Header() {
  return (
    <header>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Slideshow images={images} autoplay controls />}
        />
        <Route path="*" element={<></>} />
      </Routes>
    </header>
  );
}

export default Header;
