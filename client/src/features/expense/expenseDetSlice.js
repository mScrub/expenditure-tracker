import { createSlice } from "@reduxjs/toolkit";
const initialState = { id: null }

const expenseDetailSlice = createSlice({
    name: 'expenseDetail',
    initialState,
    reducers: {
        setId: (state, action) => {
            const { expensePostId } = action.payload 
            state.id = expensePostId
        },
        resetId: (state, action) => {
            state.id = null;
        }
    }
})

export const { setId, resetId } = expenseDetailSlice.actions 
export default expenseDetailSlice.reducer

export const selectCurrentId = (state) => state.expenseDetail.id;