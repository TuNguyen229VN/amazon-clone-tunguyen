export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: JSON.parse(localStorage.getItem("userInfo")) || null,
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  let index, newBasket;
  switch (action.type) {
    case "ADD_TO_BASKET": {
      const updatedBasket = [...state.basket, action.item];
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    }

    case "EMPTY_BASKET":
      localStorage.removeItem("basket");
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // return {
      //   ...state,
      //   basket: state.basket.filter((item) => item.id !== action.id),
      // };

      index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify(newBasket));
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return { ...state, basket: newBasket };
    case "SET_USER": {
      localStorage.setItem("userInfo", JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

export default reducer;
