import { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'
import useUsers from '../hooks/useUsers'
import classes from './NewSignupForm.module.css'
import FormEntryField from './FormEntryField';
import { isAlphaNumeric } from '../utilities/sideFunctions';


const NewSignupForm = () => {
    const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);
    const [isMissingData, setIsMissingData] = useState(false);

    const { submitUser } = useUsers();

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

    const resetFields = () => {
        resetUserNameFieldInput();
        resetEmailInputField();
        resetPWField();
    }

    useEffect(() => {
        if (enteredUserNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [enteredUserNameIsValid, enteredEmailIsValid, enteredPasswordIsValid])

    const formSubmissionHandler = async event => {
        event.preventDefault();
        if (!enteredUserNameIsValid || !enteredEmailIsValid || !enteredPasswordIsValid) return;
        const createStatus = await submitUser(event);
        if (!createStatus.ok && createStatus.message === "Duplicate Email") {
            resetFields();
            setIsDuplicateEmail(true);
            return;
        } 
        if (!createStatus.ok && createStatus.message === "Missing Form Field Data") {
            setIsMissingData(true);
            resetFields();
            return;
        }
        resetFields();
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

                <FormEntryField
                    fieldType='text'
                    htmlFor='email'
                    id='email'
                    placeholderVal='Email'
                    name='email'
                    enteredValue={enteredEmail}
                    changeHandler={enteredEmailInputHandler}
                    blurHandler={enteredEmailBlurHandler}
                    baseCSS={baseInputClass}
                    suppCSS={truncateClassEmail}
                > Enter your email:
                </FormEntryField>

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
                <div>
                    {isDuplicateEmail && <p>Email is invalid</p>}
                    {isMissingData && <p>Input can't be left empty</p>}
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


export default NewSignupForm;