import { Outlet, Navigate , useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation(); 
    return (
        token ?
            <Outlet/> : 
            <Navigate to='/signin' state={{from: location}} replace/>
  )
}

export default RequireAuth