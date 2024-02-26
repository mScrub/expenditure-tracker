import classes from '../components/NewExpenseTracker.module.css'
import DateSelector from './DateSelector'

const FormEntryField = ({ fieldType, children, htmlFor, baseCSS, suppCSS, id, placeholderVal, changeHandler, blurHandler, enteredValue, isReadOnly, name}) => {
    
    let inputComponent = (
        <input type='text' id={id}
            placeholder={placeholderVal}
            readOnly={isReadOnly}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={enteredValue}
            name={name}
        />
    )
    
    if (fieldType === 'date') {
        inputComponent = (<DateSelector dateChange={changeHandler} onDateBlur={blurHandler} selectedDate={enteredValue} name={name} />)
    }

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

export default FormEntryField;