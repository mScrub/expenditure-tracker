import { useEffect, useState } from 'react'
import ExpenseHistoryPost from './ExpenseHistoryPost'
import classes from './ExpenseHistoryList.module.css'
import useExpenses from '../hooks/useExpenses'

const ExpenseHistoryList = () => {
    const { getExpenseList } = useExpenses()
    const [expenseDataList, setExpenseDataList] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                setIsFetching(true);
                const listOfExpensePost = await getExpenseList();
                const tempList = [...listOfExpensePost];
                tempList.reverse();
                setExpenseDataList(tempList)
                setIsFetching(false);
            } catch (error) {
                console.error('Error in fetching expense post data', error)
            }
        }
        fetchExpenseData();
    }, []) 

    return (
        <>
            <div className={classes['expense-history-container']}>
                {!isFetching && expenseDataList.length > 0 &&
                    expenseDataList.map((expensePost) => <ExpenseHistoryPost key={expensePost.expense_id} id={expensePost.unique_url} locationName={expensePost.location_name} amountSpent={expensePost.amount_spent} />)
                }
            </div>
            {!isFetching && expenseDataList.length === 0 &&
                <div className={classes['expense-history-empty-container']}>
                    <h2>No expense posts here yet!</h2>
                    <p>Start to create some expense posts</p>
                </div>
            }
            {isFetching &&
                <div className={classes['expense-history-empty-container']}>
                    <h2>Loading your expense posts...!</h2>
                </div>
            }
        </>
    )
}

export default ExpenseHistoryList
