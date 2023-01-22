import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Loader from "./components/loader/Loader";
import { CartContextProvider } from "./context/CartContext";

const ItemDetailPage = lazy(() => import("./pages/item-detail/ItemDetail.page"));
const PoliticaDePrivacidad = lazy(() => import("./pages/legal/PoliticaDePrivacidad.page"));
const TerminosYCondiciones = lazy(() => import("./pages/legal/TerminosYCondiciones.page"));
const GarantiaYDevoluciones = lazy(() => import("./pages/legal/GarantiaYDevoluciones.page"));
const Home = lazy(() => import("./pages/home/Home.page"));
const Search = lazy(() => import("./pages/search/Search.page"));
const Category = lazy(() => import("./pages/category/Category.page"));
const Cart = lazy(() => import("./pages/cart/Cart.page"));
const Checkout = lazy(() => import("./pages/checkout/Checkout.page"));
const Login = lazy(() => import("./components/forms/login/Login"));
const Register = lazy(() => import("./components/forms/register/Register"));
const User = lazy(() => import("./pages/user/User.page"));
const Contact = lazy(() => import("./pages/contact/Contact.page"));

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <CartContextProvider>
          <Suspense fallback={<Loader />}>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/producto/:id" element={<ItemDetailPage />} />
                  <Route path="/categoria/:category" element={<Category />} />
                  <Route path="/search/:keywords" element={<Search />} />
                  <Route path="/carrito-de-compras" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Register />} />
                  <Route path="/usuario" element={<User />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/politica-de-privacidad" element={<PoliticaDePrivacidad />} />
                  <Route path="/terminos-y-condiciones" element={<TerminosYCondiciones />} />
                  <Route path="/garantia-y-devoluciones" element={<GarantiaYDevoluciones />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </Suspense>
        </CartContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
