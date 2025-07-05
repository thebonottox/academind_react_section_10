import { createContext } from "react";

export const CartContext = createContext({
  items: [], // This will later store the shopping cart items
  addItemToCart: () => {},
});

// Here we create our first context
// 1) Import createContext from react
// 2) Create the context and store it in a variable (capital cased)
// 3) Add a initial value to the context, that value will ne available to the components wrapped by it.
// In our case we set an object as the initial value (createContext({}))
// 4) We need to provide this context to other components, for that, make sure you are exporting it.

// Next we need to wrap our context around every component that will need to use it.
// In this case, we will need it in the Header and Shop components so we will use our context in the App compoment to wrap around them.
