function useExpenses() {
    const obtainPostInput = (e) => {
        const expenseData = new FormData(e.target);
        const address = expenseData.get("address")
        const locationName = expenseData.get("locationName")
        const amountSpent = expenseData.get("amountSpent")
        const date = expenseData.get("date")
        return {
            address,
            locationName,
            amountSpent,
            date
        }}
        return obtainPostInput;
}
export default useExpenses;

