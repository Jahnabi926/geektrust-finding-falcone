export default function Header() {
  const handleReset = () => {
    window.location.reload();
  };
  return (
    <>
      <header className="header"></header>
      <div className="header-links">
        <a href="/">GeekTrust Home</a>
        <span className="header-space">|</span>
        <span onClick={handleReset}>Reset</span>
      </div>
    </>
  );
}
