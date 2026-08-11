// Test ID: IIDSAT

import OrderItem from "./OrderItem";

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  // Everyone can search for all orders, so for privacy reasons we're gonna exclude names or address
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  const statusColors = {
    preparing: "bg-ember/15 text-ember border border-ember/30",
    ready: "bg-green-100 text-green-700 border border-green-200",
    delivered: "bg-stone-100 text-stone-500 border border-stone-200",
  };

  return (
    <div className="bg-cream min-h-full">
      {/* Page header */}
      <div className="border-b border-cream-dark bg-cream px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Order #{id}</p>
            <h2 className="section-heading">Order Status</h2>
          </div>

          <div className="flex gap-2 flex-wrap">
            {priority && (
              <span className="badge bg-fire/10 text-fire border border-fire/25">
                Priority
              </span>
            )}
            <span
              className={`badge ${statusColors[status] ?? "bg-stone-100 text-stone-600 border border-stone-200"}`}
            >
              {status} order
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Delivery countdown */}
        <div className="flex flex-wrap items-center justify-between gap-3 border border-cream-dark bg-white px-6 py-5">
          <p className="font-display text-lg font-black uppercase tracking-wide text-base">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left`
              : "Order should have arrived"}
          </p>
          <p className="text-xs text-smoke">
            Est. delivery: {formatDate(estimatedDelivery)}
          </p>
        </div>

        {/* Order items */}
        <div className="border border-cream-dark bg-white">
          <div className="border-b border-cream-dark px-6 py-4">
            <p className="font-display text-xs font-black uppercase tracking-widest text-smoke">
              Your items
            </p>
          </div>
          <ul className="divide-y divide-cream-dark">
            {cart.map((item) => (
              <OrderItem
                item={item}
                key={item.pizzaId}
                isLoadingIngredients={fetcher.state === "loading"}
                ingredients={
                  fetcher.data?.find((el) => el.id === item.pizzaId)
                    ?.ingredients ?? []
                }
              />
            ))}
          </ul>
        </div>

        {/* Price breakdown */}
        <div className="border border-cream-dark bg-white px-6 py-5 space-y-2">
          <p className="flex justify-between text-sm text-stone-500">
            <span>Pizza total</span>
            <span>{formatCurrency(orderPrice)}</span>
          </p>
          {priority && (
            <p className="flex justify-between text-sm text-stone-500">
              <span>Priority fee</span>
              <span>{formatCurrency(priorityPrice)}</span>
            </p>
          )}
          <div className="border-t border-cream-dark pt-3 flex justify-between">
            <span className="font-display text-xs font-black uppercase tracking-widest">
              To pay on delivery
            </span>
            <span className="font-display text-xl font-black">
              {formatCurrency(orderPrice + priorityPrice)}
            </span>
          </div>
        </div>

        {/* Make priority */}
        {!priority && <UpdateOrder />}
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
