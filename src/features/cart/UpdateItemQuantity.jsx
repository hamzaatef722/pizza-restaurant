import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  return (
    <div className="gap-.5 flex items-center">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
        aria-label="Decrease quantity"
      >
        −
      </Button>

      <span className="font-display w-5 text-center text-sm font-bold">
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
