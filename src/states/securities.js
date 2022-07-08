import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllSecurities = createAsyncThunk(
  "GET_ALL_SECURITIES",
  async () => {
    try {
      const allSecurities = await axios.get("/api/admin/securities");
      return allSecurities.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const getCloseSecurities = createAsyncThunk(
  "GET_CLOSE_SECURITIES",
  async ({ provincyId, addressX, addressY }) => {
    try {
      const closeSecurities = await axios.get(
        `/api/admin/securitiesByDistance/${provincyId}`,
        { x: addressX, y: addressY }
      );
      return closeSecurities.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const securitiesReducer = createReducer([], {
  [getAllSecurities.fulfilled]: (state, action) => action.payload,
  [getCloseSecurities.fulfilled]: (state, action) => action.payload,
});

export default securitiesReducer;
