import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-4 py-4">
      {/* Name */}
      <p className="font-medium text-sm text-base">{name}</p>

      {/* Qty controls */}
      <div className="flex items-center justify-center">
        <UpdateItemQuantity pizzaId={pizzaId} quantity={quantity} />
      </div>

      {/* Price */}
      <p className="text-right font-display text-sm font-bold text-base">
        {formatCurrency(totalPrice)}
      </p>

      {/* Delete */}
      <div className="flex justify-end">
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
