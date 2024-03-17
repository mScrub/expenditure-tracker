import React from 'react';
import { Link } from 'react-router-dom'
import classes from '../components/HeaderNavigation.module.css'

const Header = () => {
    return <>
        <div className={classes.container}>
            <header className={classes.header}>
                <nav>
                    <ul className={classes.list}>
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/About'>About</Link>
                        </li>
                        <li>
                            <Link to='/Tracker'>Tracker</Link>
                        </li>
                        <li>
                            <Link to='/ExpenseHistory'>Record</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    </>
}

export default Header;
