import Button from "../../ui/Button";

function EmptyCart() {
  return (
    <div className="bg-cream min-h-full">
      <div className="border-cream-dark bg-cream border-b px-6 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-2">Cart</p>
          <h2 className="section-heading">Your Order</h2>
        </div>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center sm:px-8">
        {/* Flame illustration */}
        <span className="text-6xl opacity-30" aria-hidden="true">
          🍕
        </span>

        <div>
          <p className="font-display text-base text-xl font-bold tracking-wide uppercase">
            Nothing in the box yet.
          </p>
          <p className="text-smoke mt-2 text-sm">The oven is waiting.</p>
        </div>

        <Button to="/menu" type="primary">
          Browse the menu
        </Button>
      </div>
    </div>
  );
}

export default EmptyCart;
