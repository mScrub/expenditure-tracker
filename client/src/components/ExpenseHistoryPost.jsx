import classes from './ExpenseHistoryPost.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setId } from '../features/expenses/expenseSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollarSign, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const ExpenseHistoryPost = ({ id, locationName, amountSpent }) => {
    const dispatch = useDispatch();

    const handleCardClick = (expensePostId) => {
        dispatch(setId({expensePostId}));
    }

    return (
        <>
            <li className={classes['exp-card']}>
                <Link to={id} onClick={() => handleCardClick(id)}>
                    <div className={classes['iconized-content']}>
                        <FontAwesomeIcon color='black' className='fa-2xs' icon={faLocationDot} />
                        <p className={classes.location}>{locationName}</p>
                    </div>
                    <div className={classes['iconized-content']}>
                        <FontAwesomeIcon color='black' className='fa-2xs' icon={faDollarSign} />
                        <p className={classes['amount-spent']}>{amountSpent}</p>
                    </div>
                </Link>
            </li>
        </>
        )
}

export default ExpenseHistoryPost;