import { Form, useActionData, useNavigation } from "react-router-dom";
import { redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\\s]?\(?\d{1,3}?\)?[-.\\s]?\d{1,4}[-.\\s]?\d{1,4}[-.\\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const { userName, position, address, status } = useSelector(
    (state) => state.user,
  );
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="bg-cream min-h-full">
      {/* Page header */}
      <div className="border-cream-dark bg-cream border-b px-6 py-8 text-center sm:px-8 lg:px-12">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow mb-2">Almost there</p>
          <h2 className="section-heading">Place your order</h2>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <Form method="POST" className="space-y-6">
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="customer-name"
              className="text-smoke text-xs font-bold tracking-widest uppercase"
            >
              First Name
            </label>
            <input
              id="customer-name"
              className="input"
              type="text"
              name="customer"
              defaultValue={userName}
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone-number"
              className="text-smoke text-xs font-bold tracking-widest uppercase"
            >
              Phone number
            </label>
            <input
              id="phone-number"
              className="input"
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="delivery-address"
              className="text-smoke text-xs font-bold tracking-widest uppercase"
            >
              Delivery Address
            </label>
            <div className="relative">
              <input
                id="delivery-address"
                className="input pr-36"
                type="text"
                name="address"
                defaultValue={address}
                required
              />
              {!position.latitude && !position.longitude && (
                <span className="absolute top-1/2 right-2 -translate-y-1/2">
                  <Button
                    disabled={status === "loading"}
                    type="small"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(fetchAddress());
                    }}
                  >
                    {status === "loading" ? "Locating…" : "Use my location"}
                  </Button>
                </span>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="border-cream-dark flex items-center gap-4 rounded-sm border bg-white px-5 py-4">
            <input
              id="priority-checkbox"
              className="accent-fire focus:ring-fire h-5 w-5 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:outline-none"
              type="checkbox"
              name="priority"
              value={withPriority}
              onChange={(e) => setWithPriority(e.target.checked)}
            />
            <label htmlFor="priority-checkbox" className="cursor-pointer">
              <p className="font-display text-sm font-black tracking-wide uppercase">
                Priority order
              </p>
              <p className="text-smoke mt-0.5 text-xs">
                +20% &mdash; we&apos;ll move you to the front of the queue
              </p>
            </label>
          </div>

          {/* Hidden fields */}
          <input
            name="position"
            type="hidden"
            value={`${position.latitude},${position.longitude}`}
          />
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />

          {/* Price summary + CTA */}
          <div className="border-cream-dark flex items-center justify-between gap-4 border-t pt-6">
            <div>
              <p className="text-smoke text-xs font-semibold tracking-widest uppercase">
                Total
              </p>
              <p className="font-display text-2xl font-black">
                {formatCurrency(totalPrice)}
              </p>
              {withPriority && (
                <p className="text-smoke mt-0.5 text-xs">
                  incl. priority fee {formatCurrency(priorityPrice)}
                </p>
              )}
            </div>

            <Button
              disabled={isSubmitting || status === "loading"}
              type="primary"
            >
              {isSubmitting ? "Placing order…" : "Order now"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
