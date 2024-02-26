
import classes from './Modal.module.css'
import { useNavigate } from 'react-router-dom'
const Modal = ({ children }) => {
    const navigate = useNavigate();

    const onModalSelectHandler = () => {
        navigate('..')
    }
    return (
        <>
            <div className={classes.backdrop} onClick={onModalSelectHandler} />
            <dialog open={true} className={classes.modal}>{children}</dialog>
        </>
    )
}

export default Modal;