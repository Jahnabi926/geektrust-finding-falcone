export default function Button(props) {
  const { children, onClick, disabled, className } = props;
  return (
    <div>
      <button onClick={onClick} disabled={disabled} className={className}>
        {children}
      </button>
    </div>
  );
}
