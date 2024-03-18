import {
    useState,
} from "react";
import objLookup from "../utilities/objectLookup";

const useExceptionHandler = () => {
    const [errMsg, setErrMsg] = useState('');
    const exeRTKHook = async (rtkHook) => {
        try {
            const response = await rtkHook();
            return {
                response
            }
        } catch (error) {
            if (!error?.status) { 
                setErrMsg(objLookup.ERROR_MSG.noServerResponse);
            } else if (error.status === objLookup.ERROR_CODES_NUM[400]) {
                setErrMsg(objLookup.ERROR_MSG.missingData);
            } else if (error.status === objLookup.ERROR_CODES_NUM[401]) {
                setErrMsg(objLookup.ERROR_MSG.unauthorized)
            } else {
                setErrMsg(objLookup.ERROR_MSG.failedLogin)
            }
        }
    }

    const resetErrMsg = () => {
        setErrMsg('');
    }

    return {
        exeRTKHook,
        resetErrMsg,
        errMsg,
    }

}

export default useExceptionHandler