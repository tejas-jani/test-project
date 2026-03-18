export default function Button({
  children,
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-4 py-2 text-sm transition-colors bg-slate-200 text-slate-800 hover:bg-slate-300 disabled:opacity-50 ${className}`.trim()}
    >
      {children}
    </button>
  );
}
