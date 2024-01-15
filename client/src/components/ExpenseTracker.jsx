import React, { useEffect, useState, useCallback } from 'react';
import useInput from '../hooks/useInput'
import GoogleMapsPlaces from '../pages/maps/GoogleMapsPlaces';

import classes from '../styles/ExpenseTracker.module.css'
import TrackerDataEntryCont from './TrackerDataEntryField';


function ExpenseTracker() {
  const [autofillAddress, setautofillAddress] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const handleAddrAutoUpdate = useCallback((addressToUpdate) => {
    setautofillAddress(addressToUpdate);
  }, []);

  const {
    value: enteredName,
    isInputValid: enteredNameIsValid,
    valueHasError: enteredNameHasError,
    valueInputChangeHandler: nameChangeHandler,
    valueInputBlurOrFocusHandler: nameBlurHandler,
    resetStates: resetNameField,
  } = useInput((enteredValueOfName) => enteredValueOfName.trim() !== '');

  const {
    value: enteredAmountSpent,
    isInputValid: amountIsValid,
    valueHasError: amountisInvalid,
    valueInputChangeHandler: amountChangeHandler,
    valueInputBlurOrFocusHandler: amountBlurHandler,
    resetStates: resetAmountField
  } = useInput((amount) => amount.trim() !== '' && amount >= '0')

  useEffect(() => {
    if (enteredNameIsValid && amountIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

  }, [enteredNameIsValid, amountIsValid]);

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!enteredNameIsValid) {
      return;
    } else if (!enteredAmountSpent) {
      return;
    }
    resetNameField();
    resetAmountField();
  }

  const baseInputCSSClass = classes['form-control']
  const truncateClassName = enteredNameHasError ? classes['invalid'] : '';
  const truncateClassAmount = amountisInvalid ? classes['invalid'] : '';

  return (
    <>
      <div className={classes['main-container']}>

        <div className={classes['left-container']}>
          <div>
            <h3>Add Expense:</h3>
          </div>
          <form>
            <TrackerDataEntryCont
              fieldType='text'
              isDisabled='true'
              htmlFor='addressOfPlace'
              id='address'
              placeholderVal='Autofilled Address'
              enteredValue={autofillAddress}
              baseCSS={baseInputCSSClass}>Address:
            </TrackerDataEntryCont>

            <TrackerDataEntryCont
              fieldType='text'
              htmlFor='nameOfLocation'
              id='nameOfPlace'
              placeholderVal='Location Name'
              changeHandler={nameChangeHandler}
              blurHandler={nameBlurHandler}
              enteredValue={enteredName}
              baseCSS={baseInputCSSClass}
              suppCSS={truncateClassName}>Enter Location Name:
            </TrackerDataEntryCont>

            <TrackerDataEntryCont
              fieldType='text'
              htmlFor='amountSpentAtLoc'
              id='amountSpent'
              placeholderVal='Amount Spent'
              changeHandler={amountChangeHandler}
              blurHandler={amountBlurHandler}
              enteredValue={enteredAmountSpent}
              baseCSS={baseInputCSSClass}
              suppCSS={truncateClassAmount}>Enter Amount Spent:
            </TrackerDataEntryCont>
          </form>

          <div>
            {enteredNameHasError && <p>Location name must not be empty</p>}
            {amountisInvalid && <p>Amount spent can't be empty nor less than 0</p>}
          </div>


          <div className={classes['form-actions']}>
            <button disabled={!formIsValid} onClick={formSubmissionHandler}>
              Submit
            </button>
          </div>
        </div>

        <div className={classes['right-container']}>
          <GoogleMapsPlaces onAddressChange={handleAddrAutoUpdate} />
        </div>

      </div>
    </>
  );
}


export default ExpenseTracker;
