import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/auth/authSlice"
import { Link } from "react-router-dom"
import classes from "./Welcome.module.css"
const expenseListRoute = process.env.REACT_APP_EXP_POST_DET

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    const welcome = user ? `Welcome ${user}!` : 'Welcome!'
    const content = (
        <section className={classes.welcome}>
            <h1>{welcome}</h1>
            <p><Link to={expenseListRoute}>Go to the Expense List</Link></p>
        </section>
    )

    return content
}
export default Welcome