import "./App.css";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="Wrapper">
      <header>
        <NavBar/>
      </header>
      <main>
        <ItemListContainer/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
