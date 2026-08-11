import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const className =
    "inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-widest text-smoke hover:text-fire transition-colors duration-200";

  if (to === "-1")
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
