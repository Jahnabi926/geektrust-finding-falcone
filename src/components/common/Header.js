export default function Header() {
  const handleReset = () => {
    window.location.reload();
  };
  return (
    <>
      <header className="header">
      <div className="header-links">
        <a href="/">GeekTrust Home</a>
        <span className="header-space">|</span>
        <span onClick={handleReset}>Reset</span>
      </div>
      <h1 className="title">Finding Falcone !</h1>
      </header>
    </>
  );
}
