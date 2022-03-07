import "./App.css";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";
import Slideshow from "./components/Slideshow/Slideshow";
import images from "./assets/img/promotions/promotions.js";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <div className="Wrapper">
      <header>
        <NavBar/>
        <Slideshow images={images} autoplay={true} controls={true}/>
      </header>
      <main>
        <ItemListContainer/>
        <hr/>
        <p style={{textAlign: "center"}}>Oportunamente se moverá este item en su respectiva página usando react router</p>
        <ItemDetailContainer id={5}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
