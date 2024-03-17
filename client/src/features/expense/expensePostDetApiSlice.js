import { apiSlice } from "../../app/api/apiSlice";
const expPostDetRoute = process.env.REACT_APP_EXP_POST_DET

export const expensePostDetailApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        getExpensePostDet: build.query({
            query: (expensePostId) => `${expPostDetRoute}/${expensePostId}`,
            transformResponse: (response, meta, arg) => response.expenseDetail
        })
    })
})

export const {
    useGetExpensePostDetQuery,
} = expensePostDetailApiSlice