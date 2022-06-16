// We’re gonna import AuthService to make asynchronous HTTP requests
// with trigger one or more dispatch in the result.

// – register()

// calls the AuthService.register(username, email, password)
// dispatch setMessage if successful/failed
// – login()

// calls the AuthService.login(username, password)
// dispatch setMessage if successful/failed
// – logout(): calls the AuthService.logout().

// setMessage is imported from message slice that we’ve created above.

// We also need to use Redux Toolkit createAsyncThunk which provides a thunk that will take care of the action types and dispatching the right actions based on the returned promise. There are 3 async Thunks to be exported:

// register
// login
// logout

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import authService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      firstName,
      lastName,
      country,
      street,
      apt,
      city,
      state,
      zip,
      phone,
    },
    thunkAPI
  ) => {
    try {
      const response = await authService.register(
        email,
        password,
        firstName,
        lastName,
        country,
        street,
        apt,
        city,
        state,
        zip,
        phone
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login(email, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
const { reducer } = authSlice;
export default reducer;
