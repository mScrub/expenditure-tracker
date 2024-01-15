import classes from '../styles/ExpenseTracker.module.css'

const TrackerDataEntryField = ({children, htmlFor, baseCSS, suppCSS, id, placeholderVal, changeHandler, blurHandler, enteredValue, isDisabled }) => {
    
    let inputComponent = (
        <input type='text' id={id}
            placeholder={placeholderVal}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={enteredValue}
            disabled={isDisabled}
        />
    )

    return (
        <>
            <div className={classes['control-group']}>
                <div className={classes['label-group']}>
                    <div className={classes['fixed-box-size']}>
                        <label htmlFor={htmlFor}>
                            {children}
                        </label>
                    </div>
                </div>
                <div className={`${baseCSS} ${suppCSS}`}>
                    {inputComponent}
                </div>
            </div>
        </>
    )

}

export default TrackerDataEntryField;