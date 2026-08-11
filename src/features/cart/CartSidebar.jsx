import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  getTotalPrice,
} from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./DeleteItem";

function CartSidebar({ isOpen, onClose }) {
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const navigate = useNavigate();

  function handleCheckout() {
    onClose();
    navigate("/order/new");
  }

  function handleViewFullCart() {
    onClose();
    navigate("/cart");
  }

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-[2px] transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Slide-in panel ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`fixed right-0 top-0 z-40 flex h-full w-full max-w-[22rem] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Panel header ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-cream-dark px-6 py-5">
          <h2 className="font-display text-2xl font-black uppercase tracking-wide text-base">
            Your Order
          </h2>
          <button
            onClick={onClose}
            id="cart-close-btn"
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center border border-stone-300 text-stone-400 transition-colors duration-200 hover:border-fire hover:text-fire focus:outline-none focus-visible:ring-2 focus-visible:ring-fire"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Items list ── */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <span className="text-5xl opacity-20" aria-hidden="true">
                🍕
              </span>
              <p className="font-display text-sm font-bold uppercase tracking-wide text-stone-400">
                Nothing in the box yet.
              </p>
              <p className="text-xs text-smoke">The oven is waiting.</p>
            </div>
          ) : (
            <ul className="divide-y divide-cream-dark">
              {cart.map((item) => (
                <li key={item.pizzaId} className="py-4">
                  {/* Name + price row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-black uppercase leading-tight tracking-wide text-base">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-smoke">
                        {item.quantity} &times;{" "}
                        {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <p className="shrink-0 font-display text-sm font-bold text-base">
                      {formatCurrency(item.totalPrice)}
                    </p>
                  </div>

                  {/* Controls row */}
                  <div className="mt-3 flex items-center gap-2">
                    <UpdateItemQuantity
                      pizzaId={item.pizzaId}
                      quantity={item.quantity}
                    />
                    <DeleteItem pizzaId={item.pizzaId} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer: totals + CTAs (only when cart has items) ── */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-cream-dark bg-white px-6 py-5">
            {/* Price breakdown */}
            <div className="mb-5 space-y-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-400">
                <span>Delivery</span>
                <span>{formatCurrency(2.5)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-cream-dark pt-3">
                <span className="font-display text-xs font-black uppercase tracking-widest text-base">
                  Total
                </span>
                <span className="font-display text-2xl font-black text-base">
                  {formatCurrency(totalPrice + 2.5)}
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="cart-checkout-btn"
              onClick={handleCheckout}
              className="w-full bg-fire py-3 font-display text-sm font-black uppercase tracking-widest text-white transition-all duration-200 hover:bg-fire-dark active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-fire focus-visible:ring-offset-2 mb-2"
            >
              Checkout
            </button>

            {/* View full cart */}
            <button
              id="cart-view-full-btn"
              onClick={handleViewFullCart}
              className="w-full border border-stone-300 bg-white py-3 font-display text-xs font-bold uppercase tracking-widest text-stone-600 transition-colors duration-200 hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >
              View full cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
