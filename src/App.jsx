import "./App.css";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import Slideshow from "./components/Slideshow/Slideshow";
import images from "./assets/img/promotions/promotions.js";

function App() {
  return (
    <div className="Wrapper">
      <header>
        <NavBar/>
        <Slideshow images={images} autoplay={true} controls={true}/>
      </header>
      <main>
        <ItemListContainer/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
