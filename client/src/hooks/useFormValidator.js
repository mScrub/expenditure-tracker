import { useState, useEffect } from 'react';

const useFormValidator = (...enteredVals) => {
    const [formIsValid, setFormIsValid] = useState(false);
    const checkVal = (el) =>  {
        return el === true;
    }

    useEffect(() => {
        const result = enteredVals.every(checkVal)
        if (result) {
          setFormIsValid(true);
        } else {
          setFormIsValid(false);
        }
      }, [enteredVals]);

      return { formIsValid }
}

export default useFormValidator