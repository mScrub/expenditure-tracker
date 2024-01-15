import { Fragment } from 'react';
import { Outlet } from 'react-router-dom'
import HeaderNavigation from '../components/HeaderNavigation'
import classes from './RootLayoutWrapper.module.css'

function RootLayoutWrapper() {
    return <Fragment>
        <HeaderNavigation />
        <main className={classes.content}>
            <Outlet />
        </main>
    </Fragment>
}

export default RootLayoutWrapper;