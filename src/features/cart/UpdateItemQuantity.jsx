import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from "./cartSlice";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        aria-label="Decrease quantity"
      >
        −
      </Button>

      <span className="w-5 text-center font-display text-sm font-bold">
        {quantity}
      </span>

      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
        aria-label="Increase quantity"
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
