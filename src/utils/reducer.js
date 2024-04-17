export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: JSON.parse(localStorage.getItem("userInfo")) || {
    auth: "",
    userProfile: "",
  },
};

// Selector
export const getBasketSize = (basket) =>
  basket?.reduce((amount, item) => parseInt(item.quantity) + amount, 0);
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

const reducer = (state, action) => {
  let index, newBasket;
  switch (action.type) {
    case "ADD_TO_BASKET": {
      let updatedBasket;
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );

      // Kiểm tra xem mặt hàng đã tồn tại trong giỏ hàng chưa
      if (existingItemIndex !== -1) {
        // Nếu mặt hàng đã tồn tại, tăng số lượng của nó lên
        const updatedItem = {
          ...state.basket[existingItemIndex],
          quantity: state.basket[existingItemIndex].quantity + 1,
        };
        updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex] = updatedItem;
      } else {
        // Nếu mặt hàng chưa tồn tại, thêm mặt hàng mới vào giỏ hàng
        const newItem = {
          ...action.item,
          quantity: 1, // Mặc định số lượng là 1
        };
        updatedBasket = [...state.basket, newItem];
      }

      // Cập nhật giỏ hàng trong localStorage
      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      // Trả về state mới
      return {
        ...state,
        basket: updatedBasket,
      };
    }
    case "CHANGE_QUANTITY_BASKET": {
      let updatedBasket;
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.id
      );
      if (existingItemIndex !== -1) {
        // Nếu mặt hàng đã tồn tại, tăng số lượng của nó lên
        const updatedItem = {
          ...state.basket[existingItemIndex],
          quantity: action.quantity,
        };
        updatedBasket = [...state.basket];
        updatedBasket[existingItemIndex] = updatedItem;
      }
      // Cập nhật giỏ hàng trong localStorage
      localStorage.setItem("basket", JSON.stringify(updatedBasket));

      // Trả về state mới
      return {
        ...state,
        basket: updatedBasket,
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
      let newUser = JSON.parse(JSON.stringify(state.user));
      if (!action.user && newUser) {
        newUser["userProfile"] = null;
      }
      if (newUser) {
        newUser["auth"] = action.user;
      }
      localStorage.setItem("userInfo", JSON.stringify(newUser));

      return {
        ...state,
        user: newUser,
      };
    }
    case "SET_USERPROFILE": {
      let newUser = JSON.parse(JSON.stringify(state.user));
      if (newUser) {
        newUser["userProfile"] = action.userProfile;
      }
      localStorage.setItem("userInfo", JSON.stringify(newUser));
      return {
        ...state,
        user: newUser,
      };
    }
    default:
      return state;
  }
};

export default reducer;
