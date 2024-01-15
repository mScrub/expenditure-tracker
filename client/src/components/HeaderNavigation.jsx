import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import classes from '../components/HeaderNavigation.module.css'

const Header = () => {
    return <Fragment>
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
                </ul>
            </nav>
        </header>
    </Fragment>
}

export default Header;
