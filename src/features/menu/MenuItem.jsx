import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import PizzaDetailsModal from "./PizzaDetails";
import { Link } from "react-router-dom";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const item = cart.find((cartItem) => cartItem.pizzaId === id);
  const isInCart = Boolean(item);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const detailsBtnRef = useRef(null);

  function handleAddItem() {
    if (soldOut) return;
    dispatch(
      addItem({
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice,
      }),
    );
  }

  function closeDetails() {
    setIsDetailsOpen(false);
    detailsBtnRef.current?.focus();
  }

  return (
    <li
      className={`border-cream-dark mx-auto flex w-full max-w-[320px] flex-col border bg-white transition-shadow duration-200 hover:shadow-md hover:shadow-black/5 sm:max-w-none ${
        soldOut ? "opacity-60" : ""
      }`}
    >
      <div className="border-cream-dark flex items-start justify-between gap-4 border-b px-5 pt-4 pb-3">
        <h3 className="font-display text-base leading-tight font-black tracking-wide uppercase sm:text-lg">
          {name}
        </h3>
        {!soldOut && (
          <p className="font-display shrink-0 text-base text-sm font-bold">
            {formatCurrency(unitPrice)}
          </p>
        )}
      </div>

      <div className="flex-1 px-5 py-3">
        <p className="text-xs leading-relaxed text-stone-500 italic">
          {ingredients.join(", ")}
        </p>
      </div>

      <div className="border-cream-dark flex items-center justify-between border-t px-5 py-3">
        <Link
          to={`/menu/${id}`}
          ref={detailsBtnRef}
          onClick={() => setIsDetailsOpen(true)}
          className="border-cream-dark inline-flex items-center gap-1.5 border px-3 py-2 text-[10px] font-bold tracking-widest text-stone-600 uppercase transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="11" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Details
        </Link>

        {isInCart ? (
          <div className="flex items-center gap-2">
            <UpdateItemQuantity pizzaId={id} quantity={item.quantity} />
            <DeleteItem pizzaId={id} />
          </div>
        ) : !soldOut ? (
          <Button onClick={handleAddItem} type="small">
            + Add
          </Button>
        ) : (
          <span className="border-cream-dark border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-stone-600 uppercase">
            soldOut
          </span>
        )}
      </div>

      {isDetailsOpen && (
        <PizzaDetailsModal pizza={pizza} onClose={closeDetails} />
      )}
    </li>
  );
}

export default MenuItem;
