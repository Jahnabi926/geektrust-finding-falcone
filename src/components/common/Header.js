import styles from "../../styles/common.module.css";

export default function Header() {
  const handleReset = () => {
    window.location.reload();
  };
  return (
    <>
      <header className="header">
        <div className={styles.header_links}>
          <a href="/">GeekTrust Home</a>
          <span className={styles.header_space}>|</span>
          <span onClick={handleReset}>Reset</span>
        </div>
        <h1 className={styles.title}>Finding Falcone !</h1>
      </header>
    </>
  );
}
