import useScrollToTop from "../../hooks/useScrollToTop";
import Footer from "./footer/Footer";
import NavBar from "./navbar/Navbar";
import styles from "./styles.module.css";

function Layout({ children }: { children: JSX.Element }) {
  useScrollToTop();

  return (
    <>
      <NavBar />
      <main className={styles.MainContainer}>{children}</main>
      <Footer />
    </>
  );
}
export default Layout;
