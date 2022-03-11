import "App.css";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import ItemListContainer from "Containers/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "Containers/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="Wrapper">
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={<ItemListContainer categoryFilter={false}/>}/>
            <Route path="/item/:id" element={<ItemDetailContainer />}/>
            <Route path="/category/:id" element={<ItemListContainer categoryFilter={true}/>}/>
            <Route path="*" element={<Navigate replace to="/"/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
