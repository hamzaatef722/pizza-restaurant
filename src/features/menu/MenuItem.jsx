import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const item = cart.find((cartItem) => cartItem.pizzaId === id);
  const isInCart = Boolean(item);

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

  return (
    <li
      className={`mx-auto w-full max-w-[320px] sm:max-w-none border-cream-dark flex flex-col border bg-white transition-shadow duration-200 hover:shadow-md hover:shadow-black/5 ${
        soldOut ? "opacity-60" : ""
      }`}
    >
      {/* ── Pizza image ── */}
      <div className="bg-cream-dark relative h-44 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${
              soldOut ? "grayscale" : ""
            }`}
            loading="lazy"
          />
        ) : (
          /* Fallback if no image */
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl opacity-20" aria-hidden="true">
              🍕
            </span>
          </div>
        )}

        {/* Sold out overlay */}
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="font-display text-sm font-black tracking-[0.25em] text-white uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* ── Card header: name + price ── */}
      <div className="border-cream-dark flex items-start justify-between gap-4 border-b px-5 pt-4 pb-3">
        <h3 className="font-display text-base sm:text-lg leading-tight font-black tracking-wide uppercase">
          {name}
        </h3>

        {!soldOut && (
          <p className="font-display shrink-0 text-base text-sm font-bold">
            {formatCurrency(unitPrice)}
          </p>
        )}
      </div>

      {/* ── Ingredients ── */}
      <div className="flex-1 px-5 py-3">
        <p className="text-xs leading-relaxed text-stone-500 italic">
          {ingredients.join(", ")}
        </p>
      </div>

      {/* ── Footer: details + action ── */}
      <div className="border-cream-dark flex items-center justify-between border-t px-5 py-3">
        <span className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase">
          Details
        </span>

        {isInCart ? (
          <div className="flex items-center gap-2">
            <UpdateItemQuantity pizzaId={id} quantity={item.quantity} />
            <DeleteItem pizzaId={id} />
          </div>
        ) : (
          !soldOut && (
            <Button onClick={handleAddItem} type="small">
              + Add
            </Button>
          )
        )}
      </div>
    </li>
  );
}

export default MenuItem;
