import { Link } from "react-router-dom";

function Button({ children, disabled, to, type = "primary", onClick }) {
  const base =
    "inline-flex items-center justify-center font-display font-bold uppercase tracking-widest text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-fire focus-visible:ring-offset-2 select-none";

  const styles = {
    primary:
      base +
      " bg-fire text-white hover:bg-fire-dark active:scale-[0.98] px-6 py-3 rounded-sm",

    small:
      base +
      " bg-fire text-white hover:bg-fire-dark active:scale-[0.98] px-4 py-2 rounded-sm text-xs",

    round:
      base +
      " bg-fire text-white hover:bg-fire-dark active:scale-[0.98] w-9 h-9 rounded-sm text-base",

    secondary:
      base +
      " border border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400 px-6 py-3 rounded-sm",

    ghost:
      base +
      " border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-sm",

    danger:
      base +
      " bg-transparent border border-fire/40 text-fire hover:bg-fire hover:text-white px-4 py-2 rounded-sm text-xs",
  };

  const cls = styles[type] ?? styles.primary;

  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={cls}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export default Button;
