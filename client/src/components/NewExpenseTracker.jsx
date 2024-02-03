import React, { useEffect, useState } from 'react';
import useInput from '../hooks/useInput'
import useDate from '../hooks/useDate'
import useExpenses from '../hooks/useExpenses';
import { isNumeric } from '../utilities/sideFunctions';
import classes from './NewExpenseTracker.module.css'
import GoogleMapsPlaces from '../pages/maps/GoogleMapsPlaces';
import FormEntryField from './FormEntryField';


function ExpenseTracker() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [pendingExpenseCreation, setIsPendingExpenseCreation] = useState(false);
  const { submitExpense } = useExpenses();

  const {
    value: enteredAddr,
    isInputValid: enteredAddrIsValid,
    valueHasError: enteredAddrHasError,
    addrInputChangeHandler: addrChangeHandler,
    valueInputBlurOrFocusHandler: addrBlurHandler,
    resetStates: resetAddrField,
  } = useInput((address) => address !== '');

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
  } = useInput((amount) => amount.trim() !== '' && amount >= '0' && isNumeric(amount))

  const {
    date: enteredDate,
    isDateValid: dateIsValid,
    dateHasError: dateIsInvalid,
    dateChangeHandler: dateHandler,
    dateInputBlurHandler: dateBlurHandler,
    resetState: resetDateField
  } = useDate((date) => date !== null)

  useEffect(() => {
    if (enteredNameIsValid && amountIsValid && dateIsValid && enteredAddrIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }

  }, [enteredNameIsValid, amountIsValid, dateIsValid, enteredAddrIsValid]);

  const resetExpenseFormFields = () => {
    resetNameField();
    resetAmountField();
    resetDateField();
    resetAddrField();
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (!enteredNameIsValid || !enteredAmountSpent || !enteredDate || !enteredAddr) return;
    const createExpStat = await submitExpense(event);
    if (!createExpStat.respFlag) {
      setIsPendingExpenseCreation(true);
      resetExpenseFormFields();
      return;
    }
    resetExpenseFormFields();
  };

  const baseInputCSSClass = classes['form-control']
  const truncateClassAddr = enteredAddrHasError ? classes['invalid'] : '';
  const truncateClassName = enteredNameHasError ? classes['invalid'] : '';
  const truncateClassAmount = amountisInvalid ? classes['invalid'] : '';
  const truncateClassDate = dateIsInvalid ? classes['invalid'] : '';

  return (
    <>
      <div className={classes['main-container']}>
        <div className={classes['left-container']}>
          <div>
            <h3>Add Expense:</h3>
          </div>
          <form onSubmit={formSubmissionHandler}>
            <FormEntryField
              fieldType='text'
              isReadOnly={true}
              htmlFor='addressOfPlace'
              id='address'
              placeholderVal='Autofilled Address'
              name='address'
              changeHandler={addrChangeHandler}
              blurHandler={addrBlurHandler}
              enteredValue={autofillAddress}
              baseCSS={baseInputCSSClass}
              suppCSS={truncateClassAddr}>Address:
            </FormEntryField>

            <FormEntryField
              fieldType='text'
              htmlFor='nameOfLocation'
              id='nameOfPlace'
              placeholderVal='Location Name'
              changeHandler={nameChangeHandler}
              blurHandler={nameBlurHandler}
              enteredValue={enteredName}
              baseCSS={baseInputCSSClass}
              suppCSS={truncateClassName}>Enter Location Name:
            </FormEntryField>

            <FormEntryField
              fieldType='text'
              htmlFor='amountSpentAtLoc'
              id='amountSpent'
              placeholderVal='Amount Spent'
              changeHandler={amountChangeHandler}
              blurHandler={amountBlurHandler}
              enteredValue={enteredAmountSpent}
              baseCSS={baseInputCSSClass}
              suppCSS={truncateClassAmount}>Enter Amount Spent:
            </FormEntryField>

            <FormEntryField
              fieldType='date'
              htmlFor='dateSelection'
              id='dateSelection'
              name='date'
              changeHandler={dateHandler}
              blurHandler={dateBlurHandler}
              enteredValue={enteredDate}
              baseCSS={baseInputCSSClass}
              suppCSS={truncateClassDate}>Select Date:
            </FormEntryField>
          </form>

          <div>
            {pendingExpenseCreation && <p>Error, try once more</p>}
            {enteredAddrHasError && <p>Address must not be empty</p>}
            {enteredNameHasError && <p>Location name must not be empty</p>}
            {amountisInvalid && <p>Amount spent can't be empty nor less than 0</p>}
            {dateIsInvalid && <p>Date can't be empty</p>}
          </div>

          <div className={classes['form-actions']}>
            <button disabled={!formIsValid}>
              Submit
            </button>
          </div>
        </div>

        <div className={classes['right-container']}>
          <GoogleMapsPlaces onAddressChange={addrChangeHandler} />
        </div>
      </div>
    </>
  );
}


export default ExpenseTracker;
