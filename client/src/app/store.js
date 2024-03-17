import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice"
import expenseDetReducer from "../features/expense/expenseDetSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        expenseDetail: expenseDetReducer
    }, 
    middleware: gDM => gDM().concat(apiSlice.middleware),
    devTools: false,
})
