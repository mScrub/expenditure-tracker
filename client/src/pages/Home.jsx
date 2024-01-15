import { Link } from 'react-router-dom'
import classes from './Home.module.css'

function Home() {
    return (
        <div>
            <h1>Welcome to Expense Locator</h1>
            <p><Link to='/signup'>
                <div className={classes['custom-a-tag']}>
                    Sign up Now!
                </div>
            </Link></p>
        </div>
    )
}

export default Home;