// src/app/store/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const login: any = createAsyncThunk(
    "sso/login",
    async (payload: any) => {
      const response = await axios
        .post(
          `https://accountsapi.seebiz.cloud/login`,
          {
            email: payload.email,
            password: payload.password,
            serviceUrl: payload.serviceUrl,
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

  type initialStateType = {
    status: string;
    user: string;
    email: string;
    token: string;
    displayName: string;
    imagesUrl: any;
    errorMessage: string;
    passConfirmation:Boolean;
    seebizData:any;
    accountDelete:Boolean
  };
  const initialState: initialStateType = {
    status: "not-authenticated",
    user: "",
    email: "",
    token: "",
    passConfirmation:false,
    displayName: "",
    imagesUrl: "",
    errorMessage: "",
    seebizData:"",
    accountDelete:false
  };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder:any)=> {
      builder
        .addCase(login.fulfilled,(state:any,payload:any)=>{
            if (
                payload?.payload?.data?.code === 200 ||
                payload?.payload?.data?.code === "200"
              ) {
              const userData = {
                email: payload?.payload?.data?.user?.email,
                images: payload?.payload?.data?.user?.images ||'',
                forceLogout: payload?.payload?.data?.user?.forceLogout || '',
                first_name: payload?.payload?.data?.user?.first_name || "",
                last_name: payload?.payload?.data?.user?.last_name|| "",
                phoneNumber: payload?.payload?.data?.user?.phoneNumber ||"",
                twoWayAuth: payload?.payload?.data?.user?.twoWayAuth || "",
                _id: payload?.payload?.data?.user?._id,
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
              state.messageDta = payload?.payload?.data?.message_data;
              state.errorMessage = null;
            }
        })
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
    //   logout(state) {
    //     state.user = null;
    //   },
  },
});

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
