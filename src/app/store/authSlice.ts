// src/app/store/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "next/config";


type initialStateType = {
  status: string;
  user: string;
  email: string;
  token: string;
  displayName: string;
  imagesUrl: any;
  errorMessage: string;
  passConfirmation: Boolean;
  seebizData: any;
  accountDelete: Boolean;
};
const initialState: initialStateType = {
  status: "not-authenticated",
  user: "",
  email: "",
  token: "",
  passConfirmation: false,
  displayName: "",
  imagesUrl: "",
  errorMessage: "",
  seebizData: "",
  accountDelete: false,
};

export const login: any = createAsyncThunk(
  "sso/login",
  async (payload: any) => {
    const response = await axios
      .post(
        `http://localhost:5000/login`,
        {
          email: payload.email,
          password: payload.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((error) => {
        console.error("AxiosError:", error);
        throw error;
      });
    const data = response;
    return data;
  }
);

export const signup: any = createAsyncThunk(
  "sso/signup",
  async (payload: any) => {
    console.log("Payload",payload)
    const response = await axios
      .post(
        `http://localhost:5000/add`,
        {
          email: payload.email,
          password: payload.password,
          first_name:payload.first_name,
          last_name:payload.last_name,
          number:parseInt(payload.number)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((error) => {
        console.error("AxiosError:", error);
        throw error;
      });
    const data = response;
    return data;
  }
);
export const logout: any = createAsyncThunk("sso/Logout", async () => {
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(login.fulfilled, (state: any, payload: any) => {
      if (
        payload?.payload?.data?.code === 200 ||
        payload?.payload?.data?.code === "200"
      ) {

        console.log("-----payload fro store",payload)
        // return
        const userData = {
          email: payload?.payload?.data?.user?.email,
          first_name: payload?.payload?.data?.user?.first_name || "",
          last_name: payload?.payload?.data?.user?.last_name || "",
          phoneNumber: payload?.payload?.data?.user?.number || "",
        };
        var fullName = "";
        if (
          payload?.payload?.data?.user?.first_name ||
          payload?.payload?.data?.user?.last_name
        ) {
          fullName =
            payload?.payload?.data?.user?.first_name +
            " " +
            payload?.payload?.data?.user?.last_name;
        }
        state.displayName = fullName;
        state.status = "authenticated";
        state.user = userData;
        state.token = payload?.payload?.data?.token;
        state.errorMessage = null;
      }
    });
    builder.addCase(signup.fulfilled, (state: any, payload: any) => {
      if (
        payload?.payload?.data?.code === 200 ||
        payload?.payload?.data?.code === "200"
      ) {

        console.log("-----payload fro store",payload)
        // return
        const userData = {
          email: payload?.payload?.data?.user?.email,
          first_name: payload?.payload?.data?.user?.first_name || "",
          last_name: payload?.payload?.data?.user?.last_name || "",
          phoneNumber: payload?.payload?.data?.user?.number || "",
        };
        var fullName = "";
        if (
          payload?.payload?.data?.user?.first_name ||
          payload?.payload?.data?.user?.last_name
        ) {
          fullName =
            payload?.payload?.data?.user?.first_name +
            " " +
            payload?.payload?.data?.user?.last_name;
        }
        state.displayName = fullName;
        state.status = "authenticated";
        state.user = userData;
        state.token = payload?.payload?.data?.token;
        state.errorMessage = null;
      }
    });
    //   loginStart(state) {
    //     state.loading = true;
    //     state.error = null;
    //   },
    //   loginSuccess(state, action: PayloadAction<User>) {
    //     state.loading = false;
    //     state.user = action.payload;
    //   },
    //   loginFailure(state, action: PayloadAction<string>) {
    //     state.loading = false;
    //     state.error = action.payload;
    //   },
    builder.addCase(logout.fulfilled, (state: any, payload: any) => {
      state.status= "",
      state.user="",
      state.token = null;
    })
  },
});

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
