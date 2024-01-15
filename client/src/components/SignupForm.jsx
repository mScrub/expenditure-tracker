import { useState, useEffect } from 'react'

import useInput from '../hooks/useInput'

import classes from './SignupForm.module.css'

import useUsers  from '../hooks/useUsers';

const SignupForm = () => {
    const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
    const { submitUser } = useUsers();


    function isAlphaNumeric(str) {
        return str.match(/^[a-zA-Z0-9]+$/) !== null;
    }

    const [formIsValid, setFormIsValid] = useState(false);

    const {
        value: enteredUserName, 
        isInputValid: enteredUserNameIsValid, 
        valueHasError: enteredUserNameIsInvalid,
        valueInputChangeHandler: enteredUserNameInputChangeHandler,
        valueInputBlurOrFocusHandler: enteredUserNameBlurChangeHandler,
        resetStates: resetUserNameFieldInput, 

    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isInputValid: enteredEmailIsValid,
        valueHasError: enteredEmailIsInvalid,
        valueInputChangeHandler: enteredEmailInputHandler,
        valueInputBlurOrFocusHandler: enteredEmailBlurHandler,
        resetStates: resetEmailInputField,

    } = useInput((emailValue) => (emailValue.trim() !== '' && emailValue.includes('@')))

    const {
        value: enteredPassword,
        isInputValid: enteredPasswordIsValid,
        valueHasError: enteredPasswordIsInvalid,
        valueInputChangeHandler: enteredPWChangeHandler,
        valueInputBlurOrFocusHandler: enteredPWBlurHandler,
        resetStates: resetPWField,
    } = useInput((pwValue) => pwValue.trim() !== '' && !isAlphaNumeric(pwValue))


    useEffect(() => {
        if (enteredUserNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [enteredUserNameIsValid, enteredEmailIsValid, enteredPasswordIsValid])// 

    const formSubmissionHandler = async event => {
        event.preventDefault();
        if (!enteredUserNameIsValid) {
            return;
        }
        if (!enteredEmailIsValid) {
            return;
        }
        if (!enteredPasswordIsValid) {
            return;
        }
        const createStatus = await submitUser(event);
        if (!createStatus) {
            resetUserNameFieldInput();
            resetEmailInputField();
            resetPWField();
            setIsDuplicateEmail(true);
            return;
        } 
        resetUserNameFieldInput();
        resetEmailInputField();
        resetPWField();
        setIsDuplicateEmail(false);
    }
    const baseInputClass = classes['form-control'];
    const truncateClassUserName = enteredUserNameIsInvalid ? classes['invalid'] : '';
    const truncateClassEmail = enteredEmailIsInvalid ? classes['invalid'] : '';
    const truncateClassPassword = enteredPasswordIsInvalid ? classes['invalid'] : '';

    return (
        <>
            <div>
                <h3>
                    Register
                </h3>
            </div>
            <form onSubmit={formSubmissionHandler}>
                <div className={classes['control-group']}>
                    <div className={classes['label-group']}>
                        <div className={classes['fixed-box-size']}>
                            <label htmlFor='username'>Enter your username</label>
                        </div>
                    </div>
                    <div className={`${baseInputClass} ${truncateClassUserName}`}>
                        <input type='text' id='username' name='username' placeholder="Username"
                            onBlur={enteredUserNameBlurChangeHandler}
                            onChange={enteredUserNameInputChangeHandler}
                            value={enteredUserName} />
                    </div>
                </div>
                <div className={classes['control-group']}>
                    <div className={classes['label-group']}>
                        <div className={classes['fixed-box-size']}>
                            <label htmlFor='email'>Enter your email</label>
                        </div>
                    </div>
                    <div className={`${baseInputClass} ${truncateClassEmail}`}>
                        <input type='text' id='email' name='email' placeholder='Email address'
                            onBlur={enteredEmailBlurHandler}
                            onChange={enteredEmailInputHandler}
                            value={enteredEmail}></input>
                    </div>
                </div>
                <div className={classes['control-group']}>
                    <div className={classes['label-group']}>
                        <div className={classes['fixed-box-size']}>
                            <label htmlFor='password'>Enter your password</label>
                        </div>
                    </div>
                    <div className={`${baseInputClass} ${truncateClassPassword}`}>
                        <input type='password' id='password' name='password' placeholder='Password'
                            onBlur={enteredPWBlurHandler}
                            onChange={enteredPWChangeHandler}
                            value={enteredPassword}></input>
                    </div>
                </div>
                <div>
                    {isDuplicateEmail && <p>Email is invalid</p>}
                    {enteredUserNameIsInvalid && <p>Username must not be empty</p>}
                    {enteredEmailIsInvalid && <p>Email must not be empty & must contain @</p>}
                    {enteredPasswordIsInvalid && <div>
                        <p>Password must be alphanumeric</p>

                    </div>}
                </div>
                <div className={classes['form-actions']}>
                    <button type='submit' disabled={!formIsValid}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};


export default SignupForm;