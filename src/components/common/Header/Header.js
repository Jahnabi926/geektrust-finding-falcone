import styles from "../Header/header.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = () => {
    if (location.pathname === "/result") {
      navigate("/");
    } else {
      window.location.reload();
    }
  };

  return (
    <header>
      <div className={styles.header_links} data-testid="home-link-container">
        <a href="/">GeekTrust Home</a>
        <span className={styles.header_space}>|</span>
        <span onClick={handleReset}>Reset</span>
      </div>
      <h1 className={styles.title}>Finding Falcone !</h1>
    </header>
  );
}
