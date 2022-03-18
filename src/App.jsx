import "App.css";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import ItemListContainer from "containers/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "containers/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart from "components/Cart/Cart";
import { CartContextProvider } from "context/CartContext";
import ScrollToTop from "components/ScrollToTop/scrollToTop";

function App() {
  return (
    <div className="Wrapper">
      <CartContextProvider>
        <BrowserRouter>
          <ScrollToTop/>
          <Header/>
          <main>
            <Routes>
              
              <Route path="/" element={<ItemListContainer categoryFilter={false}/>}/>
              <Route path="/item/:id" element={<ItemDetailContainer />}/>
              <Route path="/category/:id" element={<ItemListContainer categoryFilter={true}/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>
          </main>
          <Footer/>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
