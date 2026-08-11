import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-medium text-sm text-base">
          <span className="font-display font-black text-fire">{quantity}×</span>{" "}
          {name}
        </p>
        <p className="font-display text-sm font-bold shrink-0">
          {formatCurrency(totalPrice)}
        </p>
      </div>

      {isLoadingIngredients ? (
        <p className="mt-1 text-xs text-stone-400 animate-pulse">
          Loading ingredients…
        </p>
      ) : (
        <p className="mt-1 text-xs italic text-stone-400">
          {ingredients.join(", ")}
        </p>
      )}
    </li>
  );
}

export default OrderItem;
