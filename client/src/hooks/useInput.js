import {
    useState
} from 'react';

const useInput = (validateEnteredValue) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isFieldTouched, setIsFieldTouched] = useState(false);

    const valueIsValid = validateEnteredValue(enteredValue);
    const valueHasError = !valueIsValid && isFieldTouched;

    const valueInputChangeHandler = event => {
        setEnteredValue(event.target.value);
    }

    const addrInputChangeHandler = incString => {
        setEnteredValue(incString)
    }

    const valueInputBlurOrFocusHandler = () => {
        setIsFieldTouched(true);
    }

    const resetStates = () => {
        setIsFieldTouched(false);
        setEnteredValue('');
    }

    return {
        value: enteredValue,
        isInputValid: valueIsValid,
        valueHasError,
        valueInputChangeHandler,
        addrInputChangeHandler,
        valueInputBlurOrFocusHandler,
        resetStates,
    }

}

export default useInput;