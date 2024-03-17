import { useGetExpenseListQuery } from '../features/expense/expenseListApiSlice'
import ExpenseHistoryPost from './ExpenseHistoryPost'
import classes from './ExpenseHistoryList.module.css'

const ExpenseHistoryList = () => {
    const {
        data: expenseDataList,
        isLoading,
    } = useGetExpenseListQuery()

    return (
        <>
            <div className={classes['expense-history-container']}>
                {!isLoading && expenseDataList.length > 0 &&
                    expenseDataList.map((expensePost) => <ExpenseHistoryPost key={expensePost.expense_id} id={expensePost.unique_url} locationName={expensePost.location_name} amountSpent={expensePost.amount_spent} />)
                }
            </div>
            {!isLoading && expenseDataList.length === 0 &&
                <div className={classes['expense-history-empty-container']}>
                    <h2>No expense posts here yet!</h2>
                    <p>Start to create some expense posts</p>
                </div>
            }
            {isLoading &&
                <div className={classes['expense-history-empty-container']}>
                    <h2>Loading your expense posts...!</h2>
                </div>
            }
        </>
    )
}

export default ExpenseHistoryList
