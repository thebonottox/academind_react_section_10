import { createContext, useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products.js";

export const CartContext = createContext({
  items: [], // This will later store the shopping cart items
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

// Here we create our first context
// 1) Import createContext from react
// 2) Create the context and store it in a variable (capital cased)
// 3) Add a initial value to the context, that value will ne available to the components wrapped by it.
// In our case we set an object as the initial value (createContext({}))
// 4) We need to provide this context to other components, for that, make sure you are exporting it.

// Next we need to wrap our context around every component that will need to use it.
// In this case, we will need it in the Header and Shop components so we will use our context in the App compoment to wrap around them.

// Below we created this function and moved everything inside it from the App component
// This way, we keep App clean and concise.
export default function CartContextProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  // Bellow, by wrapping our CartContext around those other components,
  // we are providing the context to them so they can consume it.
  // The value property below is required and seems to pass data to the context so it can then feed to other components.

  // We are consuming this context inside Cart.jsx and Product.jsx

  const ctxValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext value={ctxValue}>{children}</CartContext>;
}

// Notice how we receive the 'children' props in the function above and render it inside the CartContext component
// We need to do that so CartContext can be used around any components.
