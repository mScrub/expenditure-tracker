import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import ExpenseHistoryList from '../components/ExpenseHistoryList'
const ExpenseRecord = () => {
    return (
        <Fragment>
            <Outlet/>
            <ExpenseHistoryList/>
        </Fragment>
    )
}

export default ExpenseRecord;