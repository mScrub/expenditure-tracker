
import classes from './Modal.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { resetId } from '../features/expense/expenseDetSlice';

const Modal = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onModalSelectHandler = () => {
        dispatch(resetId());
        navigate('..');
    }
    return (
        <>
            <div className={classes.backdrop} onClick={onModalSelectHandler} />
            <dialog open={true} className={classes.modal}>{children}</dialog>
        </>
    )
}

export default Modal;