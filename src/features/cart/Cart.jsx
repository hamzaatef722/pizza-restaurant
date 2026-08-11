import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function Cart() {
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="bg-cream min-h-full">
      {/* Page header */}
      <div className="border-cream-dark bg-cream border-b px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow mb-2">Almost there</p>
          <h2 className="section-heading">Your Order</h2>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* ── Item table ── */}
          <div className="flex-1">
            <LinkButton to="/menu">← Back to menu</LinkButton>

            {/* Table header */}
            <div className="border-cream-dark text-smoke mt-6 grid grid-cols-[1fr_auto_auto_auto] gap-x-4 border-b pb-3 text-[10px] font-bold tracking-widest uppercase">
              <span>Item</span>
              <span className="text-center">Qty</span>
              <span className="text-right">Total</span>
              <span />
            </div>

            {/* Items */}
            <ul className="divide-cream-dark divide-y">
              {cart.map((item) => (
                <CartItem item={item} key={item.pizzaId} />
              ))}
            </ul>

            {/* Bottom actions */}
            <div className="mt-8 flex gap-4">
              <Button to="/order/new" type="primary">
                Order pizzas
              </Button>
              <Button type="secondary" onClick={() => dispatch(clearCart())}>
                Clear cart
              </Button>
            </div>
          </div>

          {/* ── Summary sidebar ── */}
          <div className="lg:w-72">
            <div className="border-cream-dark border bg-white p-6">
              <h3 className="font-display mb-5 text-base text-xs font-black tracking-widest uppercase">
                Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-stone-400">
                  <span>Delivery</span>
                  <span>{formatCurrency(2.5)}</span>
                </div>
              </div>

              <div className="border-cream-dark mt-5 border-t pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-xs font-black tracking-widest uppercase">
                    Total
                  </span>
                  <span className="font-display text-2xl font-black">
                    {formatCurrency(totalPrice + 2.5)}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <Button to="/order/new" type="primary" className="w-full">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
