import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button
      type="danger"
      onClick={() => dispatch(deleteItem(pizzaId))}
      aria-label="Remove item from cart"
    >
      ✕
    </Button>
  );
}

export default DeleteItem;
