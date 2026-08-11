import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalPrice);
  const numOfPizzas = useSelector(getTotalQuantity);

  if (!numOfPizzas) return null;

  return (
    <div className="flex items-center justify-between bg-base px-6 py-4 sm:px-8">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-white/60 flex gap-6">
        <span>
          {numOfPizzas} {numOfPizzas === 1 ? "pizza" : "pizzas"}
        </span>
        <span className="text-white">{formatCurrency(totalPrice)}</span>
      </p>

      <Link
        to="/cart"
        className="font-display text-sm font-black uppercase tracking-widest text-white hover:text-ember transition-colors duration-200"
      >
        Open cart →
      </Link>
    </div>
  );
}

export default CartOverview;
