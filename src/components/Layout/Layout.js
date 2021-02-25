import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const Layout = ({ children, title = "Dream Finder" }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
