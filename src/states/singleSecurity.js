import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getSecurity = createAsyncThunk("GET_SECURITY", async (name) => {
  try {
    const security = await axios.get(`/api/admin/securities/${name}`);
    return security.data;
  } catch (err) {
    console.log(err);
  }
});

export const getSecurityById = createAsyncThunk(
  "GET_SECURITY_BY_ID",
  async (id) => {
    try {
      const security = await axios.get(`/api/admin/securitiesById/${id}`);
      return security.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const createSecurity = createAsyncThunk(
  "CREATE_SECURITY",
  async (security) => {
    try {
      const securityToCreate = await axios.post(
        "/api/admin/add/security",
        security
      );
      return securityToCreate.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const editSecurity = createAsyncThunk(
  "EDIT_SECURITY",
  async (security) => {
    console.log("SECURITY", security);
    try {
      const editedSecurity = await axios.put(
        `/api/admin/edit/security/${security.id}`,
        security
      );
      return editedSecurity.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteSecurity = createAsyncThunk(
  "DELETE_SECURITY",
  async (id) => {
    try {
      const deletedSecurity = await axios.delete(
        `/api/admin/remove/security/${id}`
      );
      return deletedSecurity.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const securityReducer = createReducer([], {
  [getSecurity.fulfilled]: (state, action) => action.payload,
  [editSecurity.fulfilled]: (state, action) => action.payload,
  [deleteSecurity.fulfilled]: (state, action) => action.payload,
  [getSecurityById.fulfilled]: (state, action) => action.payload,
  [createSecurity.fulfilled]: (state, action) => action.payload,
});

export default securityReducer;
