import { apiSlice } from "../../app/api/apiSlice"; 
const authRoute = process.env.REACT_APP_AUTH_AT

export const authApiSlice = apiSlice.injectEndpoints({ 
    endpoints: build => ({
        login: build.mutation({
            query: credentials => ({
                url: authRoute,
                method: "POST",
                body: { ...credentials }
            }),
        }),
    }),
})

export const { useLoginMutation } = authApiSlice