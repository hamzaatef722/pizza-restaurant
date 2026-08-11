import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="bg-cream min-h-full">
      {/* Menu header */}
      <div className="border-cream-dark bg-cream border-b px-6 py-8 text-center sm:px-8 lg:px-12">
        <div className="tex mx-auto max-w-5xl">
          <p className="eyebrow mb-2">Our Menu</p>
          <h2 className="section-heading">{menu.length} Items</h2>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menu.map((pizza) => (
            <MenuItem pizza={pizza} key={pizza.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
