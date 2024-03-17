import { apiSlice } from "../../app/api/apiSlice";
const expListRoute = process.env.REACT_APP_EXP_LIST

export const expenseListApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getExpenseList: build.query({
            query: () => expListRoute,
            transformResponse: (response, meta, arg) => response.expenseList,
            providesTags: ['ExpensePost']
        })
    })
})

export const {
    useGetExpenseListQuery,
} = expenseListApiSlice