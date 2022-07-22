import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CartContextProvider } from "context/CartContext";
import { AuthContextProvider } from "context/AuthContext";

import ItemListContainer from "containers/ItemListContainer/ItemListContainer";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import ScrollToTop from "components/ScrollToTop/scrollToTop";
import Login from "components/Login/Login";
import Register from "components/Register/Register";

import "App.css";
import Loader from "components/Loader/Loader";

function App() {
  const ItemDetailContainer = lazy(() =>
    import("containers/ItemDetailContainer/ItemDetailContainer")
  );
  const CartContainer = lazy(() =>
    import("containers/CartContainer/CartContainer")
  );
  const CheckoutContainer = lazy(() =>
    import("containers/CheckoutContainer/CheckoutContainer")
  );
  const UserContainer = lazy(() =>
    import("containers/UserContainer/UserContainer")
  );
  const PoliticaDePrivacidad = lazy(() =>
    import("pages/PoliticaDePrivacidad/PoliticaDePrivacidad")
  );
  const TerminosYCondiciones = lazy(() =>
    import("pages/TerminosYCondiciones/TerminosYCondiciones")
  );
  const GarantiaYDevoluciones = lazy(() =>
    import("pages/GarantiaYDevoluciones/GarantiaYDevoluciones")
  );
  
  return (
    <div className="Wrapper">
      <AuthContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ItemListContainer trending={true} />
                    </Suspense>
                  }
                />
                <Route path="/item/:id"  element={ 
                  <Suspense fallback={<Loader />}>
                    <ItemDetailContainer />
                  </Suspense>
                }>
                </Route>
                <Route
                  path="/category/:id"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ItemListContainer categoryFilter={true} />
                    </Suspense>
                  }
                />
                <Route
                  path="/search/:keywords"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ItemListContainer search={true} />
                    </Suspense>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <Suspense fallback={<Loader />}>
                      <CartContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Suspense fallback={<Loader />}>
                      <CheckoutContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/user/*"
                  element={
                    <Suspense fallback={<Loader />}>
                      <UserContainer />
                    </Suspense>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Login />
                    </Suspense>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Register />
                    </Suspense>
                  }
                />
                <Route
                  path="/politica-de-privacidad/*"
                  element={
                    <Suspense fallback={<Loader />}>
                      <PoliticaDePrivacidad />
                    </Suspense>
                  }
                />
                <Route
                  path="/terminos-y-condiciones/*"
                  element={
                    <Suspense fallback={<Loader />}>
                      <TerminosYCondiciones />
                    </Suspense>
                  }
                />
                <Route
                  path="/garantia-y-devoluciones/*"
                  element={
                    <Suspense fallback={<Loader />}>
                      <GarantiaYDevoluciones />
                    </Suspense>
                  }
                />
                <Route path="*" element={<Navigate replace to="/" />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
        </CartContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
