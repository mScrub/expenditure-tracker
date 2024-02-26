import classes from './ExpensePostDetailsCard.module.css'

const ExpensePostDetailsCard = ({ labelName, children }) => {
    return (<>
        <div className={classes['expense-control-group']}>
            <div className={classes['expense-label-group']}>
                <div className={classes['expense-fixed-label-size']}>
                    <label>{labelName}</label>
                </div>
            </div>
            <div className={classes['expense-detail']}>
                <p className={classes.content}>{children}</p>
            </div>
        </div>
    </>)
}

export default ExpensePostDetailsCard;