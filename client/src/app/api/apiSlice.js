import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import {
    setCredentials,
    logOut
} from '../../features/auth/authSlice'
const srvLookup = require('../../utilities/objectLookup')
const API_URL = process.env.REACT_APP_API_URL
const refreshRoute = process.env.REACT_APP_RT

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization",`Bearer ${token}`)
        };
        return headers;
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === srvLookup.ERROR_CODES_NUM[403]) {
        const refreshResult = await baseQuery(refreshRoute, api, extraOptions);
        if (refreshResult?.data) {
            const user = await api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user}));
        }
        else {
            api.dispatch(logOut()); 
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: build => ({}),
});
