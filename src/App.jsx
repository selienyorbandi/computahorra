import "./App.css";
import ItemListContainer from "./components/ItemListContainer.js/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="Wrapper">
      <header>
        <NavBar/>
        <ItemListContainer greeting={"¡Hola! Este es un componente provisorio para la entrega del desafío 4"}/>
      </header>
    </div>
  );
}

export default App;
