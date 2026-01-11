// store/buyNowSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: null,
};

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setBuyNowItem: (state, action) => {
      state.item = action.payload;
    },
    clearBuyNowItem: (state) => {
      state.item = null;
    },
  },
});

export const { setBuyNowItem, clearBuyNowItem } = buyNowSlice.actions;
export default buyNowSlice.reducer;
