import "./App.css";
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
    </div>
  );
}

export default App;
