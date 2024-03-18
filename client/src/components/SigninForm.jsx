import useInput from '../hooks/useInput'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/auth/authApiSlice'
import { setCredentials } from '../features/auth/authSlice'
import useFormValidator from '../hooks/useFormValidator'
import useExceptionHandler from '../hooks/useExceptionHandler'
import FormEntryField from '../components/FormEntryField'
import { isAlphaNumeric } from '../utilities/sideFunctions'
import classes from '../components/NewSignupForm.module.css'
import objLookup from '../utilities/objectLookup';

const SignInForm = () => {
    const { exeRTKHook, resetErrMsg, errMsg } = useExceptionHandler();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timeDelay = objLookup.TIMER.fiveS;

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
    } = useInput((pwValue) => pwValue.trim() !== '' && !isAlphaNumeric(pwValue));

    const resetFields = () => {
        resetUserNameFieldInput();
        resetPWField();
    }

    const { formIsValid } = useFormValidator(enteredUserNameIsValid, enteredPasswordIsValid);

    const formSubmissionHandler = async event => {
        event.preventDefault();
        const result = await exeRTKHook(() => login({ username: enteredUserName, password: enteredPassword }).unwrap());
        if (result) {
            dispatch(setCredentials({ ...result.response , user: enteredUserName }));
            navigate('/welcome');
        } else { 
            setTimeout(resetErrMsg, timeDelay);
        }        
        resetFields();
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
