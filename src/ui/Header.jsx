import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";
import { getTotalQuantity } from "../features/cart/cartSlice";

function Header({ onCartOpen }) {
  const numOfPizzas = useSelector(getTotalQuantity);

  return (
    <header className="bg-base flex items-center justify-between px-6 py-4 sm:px-8">
      {/* Logo */}
      <Link
        to="/"
        className="font-display hover:text-ember flex items-center gap-2 text-xl font-black tracking-[0.2em] text-white uppercase transition-colors duration-200"
        aria-label="Fast React Pizza Co. — Home"
      >
        <span className="text-2xl leading-none" aria-hidden="true">
          🍕
        </span>
        <span>Fast Pizza Co.</span>
      </Link>

      <SearchOrder />
      {/* Right: search + username + cart */}
      <div className="flex items-center gap-5">
        <Username />

        {/* Cart icon — only shows when cart has items */}
        {numOfPizzas > 0 && (
          <button
            onClick={onCartOpen}
            id="cart-icon-btn"
            aria-label={`Open cart, ${numOfPizzas} ${numOfPizzas === 1 ? "item" : "items"}`}
            className="hover:text-ember focus-visible:ring-ember relative flex h-10 w-10 items-center justify-center text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2"
          >
            {/* Shopping cart SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
            </svg>

            {/* Item count badge */}
            <span className="bg-fire font-display absolute -top-1 -right-1 flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] leading-none font-black text-white">
              {numOfPizzas > 9 ? "9+" : numOfPizzas}
            </span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
