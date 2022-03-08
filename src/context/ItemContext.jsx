import { createContext, useReducer } from 'react';

const ItemContext = createContext();

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'AddToCart':
      const cart = { ...payload };

      return {
        ...state,
        isClicked: true,
        cart: [...state.cart, cart],
      };

    case 'RemoveFromCart':
      return {
        ...state,
        isClicked: false,
        cart: state.cart.filter((cart) => cart.itemId !== payload),
      };

    case 'increment':
      return {
        ...state,
        count: state.count + 1,
      };

    case 'decrement':
      if (state.count <= 0) {
        return {
          ...state,
          count: 0,
        };
      } else {
        return {
          ...state,
          count: state.count - 1,
        };
      }

    case 'reset':
      return {
        ...state,
        isClicked: false,
        count: 0,
      };

    default:
      return state;
  }
};

export const ItemContextProvider = ({ children }) => {
  const [{ cart, count, isClicked }, dispatch] = useReducer(reducer, {
    cart: [],
    count: 0,
    isClicked: false,
  });

  const addToCart = (
    itemId,
    itemName,
    itemCount,
    imageIndex,
    amount,
    total
  ) => {
    dispatch({
      type: 'AddToCart',
      payload: { itemId, itemName, itemCount, imageIndex, amount, total },
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: 'RemoveFromCart',
      payload: itemId,
    });
  };

  const increment = () => {
    dispatch({
      type: 'increment',
    });
  };

  const reset = () => {
    dispatch({
      type: 'reset',
    });
  };

  const decrement = () => {
    dispatch({
      type: 'decrement',
    });
  };

  return (
    <ItemContext.Provider
      value={{
        cart,
        count,
        increment,
        decrement,
        reset,
        addToCart,
        removeFromCart,
        isClicked,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
