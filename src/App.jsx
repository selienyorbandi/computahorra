import "App.css";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import ItemListContainer from "containers/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "containers/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartContextProvider } from "context/CartContext";
import { AuthContextProvider } from "context/AuthContext";
import ScrollToTop from "components/ScrollToTop/scrollToTop";
import PoliticaDePrivacidad from "pages/PoliticaDePrivacidad/PoliticaDePrivacidad";
import TerminosYCondiciones from "pages/TerminosYCondiciones/TerminosYCondiciones";
import GarantiaYDevoluciones from "pages/GarantiaYDevoluciones/GarantiaYDevoluciones";
import CartContainer from "containers/CartContainer/CartContainer";
import CheckoutContainer from "containers/CheckoutContainer/CheckoutContainer";
import UserContainer from "containers/UserContainer/UserContainer";
import Login from "components/Login/Login";
import Register from "components/Register/Register";

function App() {
  
  return (
    <div className="Wrapper">
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ScrollToTop/>
            <Header/>
            <main>
              <Routes>
                <Route path="/" element={<ItemListContainer categoryFilter={false}/>}/>
                <Route path="/item/:id" element={<ItemDetailContainer />}/>
                <Route path="/category/:id" element={<ItemListContainer categoryFilter={true}/>}/>
                <Route path="/cart" element={<CartContainer/>}/>
                <Route path="/checkout" element={<CheckoutContainer/>}/>
                <Route path="/user/*" element={<UserContainer/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/politica-de-privacidad/*" element={<PoliticaDePrivacidad/>}/>
                <Route path="/terminos-y-condiciones/*" element={<TerminosYCondiciones/>}/>
                <Route path="/garantia-y-devoluciones/*" element={<GarantiaYDevoluciones/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}/>
              </Routes>
            </main>
            <Footer/>
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
