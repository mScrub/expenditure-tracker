import {
    httpCreateExpense,
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
    return {
        submitExpense,
    }
}
export default useExpenses;