import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "../../services/apiRestaurant";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCart } from "../cart/cartSlice";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import DeleteItem from "../cart/DeleteItem";

const FALLBACK_DESCRIPTION =
  "Our signature pizza starts with slow-fermented dough, hand-stretched until light and airy, then baked in a wood-fired oven until the crust turns blistered and smoky. Every topping is layered fresh before serving, balancing rich, tangy, and savory notes in one bite. A simple classic made the same way every time.";

function PizzaDetails() {
  const pizza = useLoaderData();
  const {
    id,
    name,
    unitPrice,
    ingredients,
    soldOut,
    imageUrl,
    description,
    tags,
  } = pizza;

  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const item = cart.find((cartItem) => cartItem.pizzaId === id);
  const isInCart = Boolean(item);
  const [quantity, setQuantity] = useState(1);

  function handleAddItem() {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        quantity,
        unitPrice,
        totalPrice: unitPrice * quantity,
      }),
    );
  }

  return (
    <div className="bg-cream min-h-full">
      {/* Close — back to menu */}
      <Link
        to="/menu"
        aria-label="Close and back to menu"
        className="border-cream-dark bg-cream hover:bg-fire-dark absolute top-23 right-10 z-10 flex h-9 w-9 items-center justify-center border transition hover:text-white sm:top-23 sm:right-30"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </Link>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-12 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 pr-12 text-xs text-stone-500 sm:pr-0">
          <Link to="/" className="hover:text-stone-900">
            Home
          </Link>
          <span className="mx-2 text-stone-300">/</span>
          <Link to="/menu" className="hover:text-stone-900">
            Menu
          </Link>
          <span className="mx-2 text-stone-300">/</span>
          <span className="text-stone-900">{name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* ── Main content ── */}
          <div>
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Image — capped near its native size so it never upscales/pixelates on mobile */}
              <div className="border-cream-dark mx-auto w-40 shrink-0 border bg-white p-3 sm:mx-0 sm:w-52">
                <img
                  src={imageUrl}
                  alt={name}
                  className={`border-cream-dark aspect-square w-full border object-cover ${
                    soldOut ? "grayscale" : ""
                  }`}
                />
              </div>

              <div className="text-center sm:text-left">
                <h1 className="font-display text-3xl leading-[0.95] font-black tracking-wide uppercase sm:text-5xl">
                  {name}
                </h1>

                {(soldOut || tags?.length > 0) && (
                  <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                    {soldOut && (
                      <span className="border-cream-dark border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-stone-400 uppercase">
                        Sold out
                      </span>
                    )}
                    {tags?.map((tag) => (
                      <span
                        key={tag}
                        className="border-cream-dark border px-2.5 py-1 text-[10px] font-semibold tracking-widest text-stone-500 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <p className="mb-10 max-w-xl text-base leading-relaxed text-stone-600">
              {description || FALLBACK_DESCRIPTION}
            </p>

            <div className="border-cream-dark grid grid-cols-1 gap-8 border-t pt-8 sm:grid-cols-3">
              <div>
                <p className="mb-2 text-[10px] font-semibold tracking-widest text-stone-400 uppercase">
                  Ingredients
                </p>
                <p className="text-sm leading-relaxed text-stone-700">
                  {ingredients?.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* ── Sidebar: selection / order ── */}
          <aside className="border-cream-dark h-fit border p-6 lg:sticky lg:top-8">
            <p className="mb-2 text-[10px] font-semibold tracking-widest text-stone-400 uppercase">
              Your selection
            </p>
            <p className="font-display mb-6 text-4xl font-black">
              {formatCurrency(unitPrice)}
            </p>

            {soldOut ? (
              <p className="mb-6 text-sm text-stone-500">
                This pizza is currently unavailable.
              </p>
            ) : isInCart ? (
              <div className="mb-3 flex items-center gap-2">
                <UpdateItemQuantity pizzaId={id} quantity={item.quantity} />
                <DeleteItem pizzaId={id} />
              </div>
            ) : (
              <>
                <div className="border-cream-dark mb-6 flex w-fit items-center border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="hover:bg-fire flex h-10 w-10 items-center justify-center text-lg transition hover:text-white"
                  >
                    −
                  </button>
                  <span className="border-cream-dark flex h-10 w-10 items-center justify-center border-x text-sm font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center text-lg transition hover:bg-green-500 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddItem}
                  className="w-full bg-stone-800 px-4 py-3.5 text-center text-xs font-bold tracking-widest text-white uppercase transition hover:bg-stone-950"
                >
                  Add to order
                </button>
              </>
            )}

            <Link
              to="/menu"
              className="border-cream-dark bg-fire transitionbg-fire hover:bg-fire-dark mt-3 flex items-center justify-center border px-4 py-3 text-xs font-bold tracking-widest text-white uppercase"
            >
              Keep browsing
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const menu = await getMenu();
  const pizza = menu.find((p) => String(p.id) === params.pizzaId);

  if (!pizza) {
    throw new Response("Pizza not found", { status: 404 });
  }
  return pizza;
}

export default PizzaDetails;
