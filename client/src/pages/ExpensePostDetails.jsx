
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetExpensePostDetQuery } from '../features/expense/expensePostDetApiSlice'
import { selectCurrentId } from '../features/expense/expenseDetSlice'
import Modal from '../components/Modal'
import ExpenseCards from '../components/ExpensePostDetailsCard'

const ExpensePostDetails = () => {
    const id = useSelector(selectCurrentId);
    const {
        data: postData,
        isLoading,
    } = useGetExpensePostDetQuery(id)
    
    if (isLoading) { return (<Modal><div>Loading details...</div></Modal>)}
    if (!postData) {
        return (
            <Modal>
                <h1>Unable not find post</h1>
                <p>Unfortunately, the requested expense record could not be found</p>
                <p><Link to={'..'}>Exit</Link></p>
            </Modal>
        )
    }

    return (
        <Modal>
            <ExpenseCards labelName='Location Name:'>
                {postData[0].location_name}
            </ExpenseCards>
            <ExpenseCards labelName='Address:'>
                {postData[0].address}
            </ExpenseCards>
            <ExpenseCards labelName='Amount Spent:'>
                {postData[0].amount_spent}
            </ExpenseCards>
            <ExpenseCards labelName='Date Of Expense:'>
                {postData[0].date_of_exp}
            </ExpenseCards>
        </Modal>
    )
}

export default ExpensePostDetails;
