import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

// Since we moved the logic related to the CartContext into the context file
// We now have to import the function containing that logic  which is being exported in that file.
import CartContextProvider from "./store/shopping-cart-context.jsx";
// As you can see below, that function name will now be our component name

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
