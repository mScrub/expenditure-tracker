import {
    httpCreateExpense,
    httpGetExpenseList
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
        // above parse is complete, then send out the list or send out an empty list
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