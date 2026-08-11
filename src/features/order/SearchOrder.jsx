import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Track order">
      <input
        id="search-order-input"
        placeholder="Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search order by ID"
        className="w-24 rounded-sm border border-white/15 bg-white/10 px-3 py-2 text-xs font-display font-semibold uppercase tracking-widest text-white placeholder:text-white/40 transition-all duration-300 focus:w-40 focus:outline-none focus:ring-1 focus:ring-ember focus:border-transparent sm:w-32 sm:focus:w-52"
      />
    </form>
  );
}

export default SearchOrder;
