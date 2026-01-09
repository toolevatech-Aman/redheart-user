import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if it exists
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  items: savedCart,
  totalCount: savedCart.reduce((acc, item) => acc + item.quantity, 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Check if same product + variant + add-ons exists
      const existingIndex = state.items.findIndex((item) => {
        const sameProduct = item._id === newItem._id;
        const sameAddOns =
          JSON.stringify(item.add_ons.map((a) => a._id).sort()) ===
          JSON.stringify(newItem.add_ons.map((a) => a._id).sort());
        return sameProduct && sameAddOns;
      });

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += 1;
      } else {
        state.items.push(newItem);
      }

      // Update total count
      state.totalCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item._id !== id);
      state.totalCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalCount = 0;
      localStorage.removeItem("cart");
    },

    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      if (state.items[index]) {
        state.items[index].quantity = quantity;
        state.totalCount = state.items.reduce((acc, item) => acc + item.quantity, 0);
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
