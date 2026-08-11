import { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartSidebar from "../features/cart/CartSidebar";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      {isLoading && <Loader />}

      <Header onCartOpen={() => setIsCartOpen(true)} />

      <div className="overflow-y-auto">
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      {/* Slide-in cart sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default AppLayout;
