import styles from "../../styles/header.module.css";

export default function Header() {
  const handleReset = () => {
    window.location.reload();
  };
  
  return (
    <>
      <header>
        <div className={styles.header_links} data-testid="home-link-container">
          <a href="/">GeekTrust Home</a>
          <span className={styles.header_space}>|</span>
          <span onClick={handleReset}>Reset</span>
        </div>
        <h1 className={styles.title}>Finding Falcone !</h1>
      </header>
    </>
  );
}
