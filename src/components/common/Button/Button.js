export default function Button(props) {
  const { children, onClick, disabled, className } = props;
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
