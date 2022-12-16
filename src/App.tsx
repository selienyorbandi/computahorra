import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Loader from "./components/loader/Loader";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader />}>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<span></span>} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default App;
