import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Loader from "./components/loader/Loader";
import { CartContextProvider } from "./context/CartContext";
import ItemDetailPage from "./pages/item-detail/ItemDetail.page";

const PoliticaDePrivacidad = lazy(() => import("./pages/legal/PoliticaDePrivacidad.page"));
const TerminosYCondiciones = lazy(() => import("./pages/legal/TerminosYCondiciones.page"));
const GarantiaYDevoluciones = lazy(() => import("./pages/legal/GarantiaYDevoluciones.page"));
const Home = lazy(() => import("./pages/home/Home.page"));

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
