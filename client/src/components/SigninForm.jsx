import { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { setCredentials } from '../features/auth/authSlice'
import FormEntryField from '../components/FormEntryField'
import { isAlphaNumeric } from '../utilities/sideFunctions'
import classes from '../components/NewSignupForm.module.css'
import objLookup from '../utilities/objectLookup';

const SignInForm = () => {
    const [formIsValid, setFormIsValid] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        value: enteredUserName,
        isInputValid: enteredUserNameIsValid,
        valueHasError: enteredUserNameIsInvalid,
        valueInputChangeHandler: enteredUserNameInputChangeHandler,
        valueInputBlurOrFocusHandler: enteredUserNameBlurChangeHandler,
        resetStates: resetUserNameFieldInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredPassword,
        isInputValid: enteredPasswordIsValid,
        valueHasError: enteredPasswordIsInvalid,
        valueInputChangeHandler: enteredPWChangeHandler,
        valueInputBlurOrFocusHandler: enteredPWBlurHandler,
        resetStates: resetPWField,
    } = useInput((pwValue) => pwValue.trim() !== '' && !isAlphaNumeric(pwValue))

    const resetFields = () => {
        resetUserNameFieldInput();
        resetPWField();
    }

    useEffect(() => {
        if (enteredUserNameIsValid && enteredPasswordIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [enteredUserNameIsValid, enteredPasswordIsValid])

    useEffect(() => {
        setErrMsg('');
    }, [enteredUserName, enteredPassword])


    const formSubmissionHandler = async event => {
        event.preventDefault();
        if (!enteredUserNameIsValid || !enteredPasswordIsValid) return;
        try {
            const userData = await login({ username: enteredUserName, password: enteredPassword }).unwrap()
            dispatch(setCredentials({ ...userData, user: enteredUserName }))
            resetFields();
            navigate('/welcome')
        } catch (error) {
            if (!error?.status) { 
                setErrMsg(objLookup.ERROR_MSG.noServerResponse);
            } else if (error.status === objLookup.ERROR_CODES_NUM[400]) {
                setErrMsg(objLookup.ERROR_MSG.missingUnameAndPwd);
            } else if (error.status === objLookup.ERROR_CODES_NUM[401]) {
                setErrMsg(objLookup.ERROR_MSG.unauthorized)
            } else {
                setErrMsg(objLookup.ERROR_MSG.failedLogin)
            }
        }
    }

    const baseInputClass = classes['form-control'];
    const truncateClassUserName = enteredUserNameIsInvalid ? classes['invalid'] : '';
    const truncateClassPassword = enteredPasswordIsInvalid ? classes['invalid'] : '';

    const content = isLoading ? <h1> Loading... </h1> :
        <form onSubmit={formSubmissionHandler}>
            <FormEntryField
                fieldType='text'
                htmlFor='username'
                id='username'
                placeholderVal='Username'
                name='username'
                enteredValue={enteredUserName}
                changeHandler={enteredUserNameInputChangeHandler}
                blurHandler={enteredUserNameBlurChangeHandler}
                baseCSS={baseInputClass}
                suppCSS={truncateClassUserName}
            > Enter your username:
            </FormEntryField>

            <label htmlFor='password'></label>
            <FormEntryField
                fieldType='text'
                htmlFor='password'
                id='password'
                placeholderVal='Password'
                name='password'
                enteredValue={enteredPassword}
                changeHandler={enteredPWChangeHandler}
                blurHandler={enteredPWBlurHandler}
                baseCSS={baseInputClass}
                suppCSS={truncateClassPassword}
            > Enter your password:
            </FormEntryField>

            {enteredUserNameIsInvalid && <p>Username must not be empty</p>}
            {enteredPasswordIsInvalid && <p>Password field must not be empty</p>}
            {<p className={errMsg ? classes.errmsg : "offscreen"} aria-live="assertive">{errMsg}</p>}
            <div className={classes['form-actions']}>
                <button type='submit' disabled={!formIsValid}>
                    Sign in
                </button>
            </div>
        </form>
    return content
}

export default SignInForm
