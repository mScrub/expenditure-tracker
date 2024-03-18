import { apiSlice } from "../../app/api/apiSlice";
const newExpensePostRoute = process.env.REACT_APP_NEW_EXP_POST

export const expenseNewPostApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        newPost: build.mutation({
            query: formData => ({
                url: newExpensePostRoute, 
                method: "POST",
                body: { ...formData}
            }),
            invalidatesTags: ['ExpensePost']
        }),
    }),
})

export const {
    useNewPostMutation
} = expenseNewPostApiSlice