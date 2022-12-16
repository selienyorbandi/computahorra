import Footer from "./footer/Footer";
import NavBar from "./navbar/Navbar";

function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
export default Layout;
