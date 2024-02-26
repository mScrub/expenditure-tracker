import {
    httpCreateExpense,
    httpGetExpenseList,
    httpGetExpensePostDetail
} from "./requests";


function useExpenses() {
    const submitExpense = (async (e) => {
        const expenseData = new FormData(e.target);
        const address = expenseData.get("address")
        const locationName = expenseData.get("locationName")
        const amountSpent = expenseData.get("amountSpent")
        const date = expenseData.get("date")
        const response = await httpCreateExpense({
            address,
            locationName,
            amountSpent,
            date
        })
        const success = response.ok;
        if (!success) {
            const text = await response.json();
            return {
                respFlag: false,
                respMsg: text.error
            }
        } else {
            return true;
        }
    })

    const getExpenseList = async () => {
        const response = await httpGetExpenseList()
        let success = response.ok
        if (success) {
            return response.expenseList;
        } else {
            return [];
        }
    }
    return {
        submitExpense,
        getExpenseList,
    }
}
export default useExpenses;

export const getExpensePostDetails = async (expensePostId) => {
    const response = await httpGetExpensePostDetail(expensePostId)        ;
    const result = response.ok 
    if (!result) {
        return {
            ok: false, 
            error: 'No such post detail'
        }
    } else {
        return response.expenseDetail;
    }
}
