import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  username:string,
  birthday:Date,
  description:string,
  gender:string,
  __v:number
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: typeof window !== "undefined" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null,
  token: typeof window !== "undefined" && localStorage.getItem("token") ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
