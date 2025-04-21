// import React from 'react';
// import { useEffect } from 'react';
import { FormHelperText } from '../../../shared/modules/commonImports';


import './ErrorMessage.scss';


const ErrorMessage = (
    { formikObj, name, array = [], isFormSubmitted = false, reactHookFormUsed, errorsObj, subName = "" }:
        { formikObj?: any, name: string, array?: string[], isFormSubmitted?: boolean, reactHookFormUsed?: boolean, errorsObj?: any, subName?: string }
) => {

    let errorMessage = '';

    if (reactHookFormUsed) {
        errorMessage = typeof errorsObj?.[name] === "object" ? errorsObj?.[name]?.message : typeof errorsObj?.[name] === "string" ? errorsObj?.[name] : "";
    } else {
        errorMessage = (subName && formikObj.errors[name] && formikObj.errors[name][subName]) ? formikObj.errors[name][subName] :
            (typeof formikObj.errors[name] === "object") ? "" :
                (formikObj.errors[name] && array.length) ?
                    (formikObj.errors[name][array[0]] && formikObj.errors[name][array[0]][array[1]]) ?
                        formikObj.errors[name][array[0]][array[1]] :
                        "" :
                    formikObj.errors[name];
    }

    return (
        <div className='errorText'>
            {
                ((!reactHookFormUsed && formikObj.touched[name]) || isFormSubmitted) ?
                    Boolean(errorMessage) ? (
                        <FormHelperText error className='ml-1 mt-0'>
                            {errorMessage}
                        </FormHelperText>

                    ) : null
                    : null
            }
        </div>
    );
}

export default ErrorMessage;