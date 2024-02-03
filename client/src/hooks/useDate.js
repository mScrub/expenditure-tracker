import {
    useState
} from 'react';


const useDate = (validateEnteredDate) => {
    const [enteredDate, setEnteredDate] = useState(new Date());
    const [isDateFieldTouched, setIsDateFieldTouched] = useState(false);

    const dateIsValid = validateEnteredDate(enteredDate);
    const dateHasError = !dateIsValid && isDateFieldTouched;

    const dateChangeHandler = event => {
        setEnteredDate(event)
    }

    const dateInputBlurHandler = () => {
        setIsDateFieldTouched(true);
    }

    const resetState = () => {
        setIsDateFieldTouched(false);
        setEnteredDate(new Date());
    }

    return {
        date: enteredDate,
        isDateValid: dateIsValid,
        dateHasError,
        dateChangeHandler,
        dateInputBlurHandler,
        resetState
    }
}

export default useDate;