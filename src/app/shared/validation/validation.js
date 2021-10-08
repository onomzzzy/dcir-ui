

function validUsername(val) {
    return val ? val.toString().length > 1 : false;
}

 function validMobileNumber(param) {
    if (!param || param === '' || isNaN(param)) {
        return false;
    }

    param = param.replace(/\D/g, '');

    return !isNaN(param) && param.length >= 11 && param.length <= 16;
}

function toTitleCase(str: string): string {
    if (str) {
        return str.toLowerCase().split(' ').map((word) => {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
    return str;
}

function decodeJWT(token: string) {

    const base64Url = token.split('.')[1];
    if (base64Url) {
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    } else { return undefined; }
}

function validateObjectModel(obj, totalProperty) {
    let totalCurrentProperties = 0;
    for (const property in obj) {
        if(obj[property]) {
            totalCurrentProperties++;
        }
    }
    return totalCurrentProperties === totalProperty;
}

function validateObjectModelAny(obj) {
    let result = false;
    for (const property in obj) {
        if(obj[property]) {
            result = true;
            break;
        }
    }
    return result;
}


 function validNumber(param) {
    if (param == null || typeof param === 'undefined') {
        return false;
    }

    return !isNaN(param);
}
function validPercentage(param) {
   if(validNumber(param)){
      return param >= 0 && param <= 100
   }
   else{
       return false;
   }
}

 function validNameFormat(param) {
    const isValid = /^[-,A-Za-z\s]{1,}[\.]{0,1}[-,A-Za-z\s]{0,}$/;
    return isValid.test(param);
}

function validName(param) {
    return param != null && param.length >= 2 && param.length <= 150 && validNameFormat(param);
}

function validText(param) {
    return param != null && param !== '' && String(param).match(/^\s*$/) == null;
}

function validSecret(param: string) {
    const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
    return validText(param) && isValid.test(param);
}

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


    function validBVN(param) {
        if (!param || param === '' || isNaN(param)) {
            return false;
        }

        param = param.replace(/\D/g, '');

        return !isNaN(param) && param.length === 11;
    }

   function hasNumber(param) {
        const isValid = /\d/;
        return isValid.test(param);
    }
   function hasUppercase(param) {
        const isValid = /[A-Z]/;
        return isValid.test(param);
    }

    function hasSpecialChars(param) {
        const isValid = /[^a-zA-Z0-9]/;
        return isValid.test(param);
    }

    function validEmail(param) {
        const isValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return isValid.test(param);
    }

   function isNullOrEmptyOrUndefined(obj) {
        return obj === undefined || obj === null || ((obj + '').trim()).length === 0;
    }

    function validOTP(obj) {
        if (isNullOrEmptyOrUndefined(obj)) {
            return false;
        }
        else {
            if (!validNumber(obj)) {
                return false;
            }
            return obj.toString().length > 3;
        }
    }

    function validPin(param) {
        if (!validNumber(param)) {
            return false;
        }

        return param.toString().length === 4;
    }

    function validCvv(param) {
        if (!validNumber(param)) {
            return false;
        }

        return param.toString().length === 3;
    }

    function validNuban(param) {
        if (!param || param === '' || isNaN(param)) {
            return false;
        }

        param = param.replace(/\D/g, '');

        return !isNaN(param) && param.length === 10;
    }

   function isNullOrEmpty(object) {
        if (typeof object === undefined || object == null || object === '' || object.toString().replace(/\s/g, '') === '' || JSON.stringify(object) === JSON.stringify({})) {
            return true;
        }
    }

    function validCashInput(param) {
        if (isNullOrEmpty(param)) {
            return false;
        }

        param = param.toString().replace(/,/g, '');

        return !isNullOrEmpty(param) && !isNaN(param) && parseFloat(param) > 0;
    }

   function toUrlString(obj){
    let urlString = '';
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (obj[prop] != null && obj[prop].constructor === Array) {
                obj[prop].forEach(i => {
                    urlString += `${prop}=${i}&`;
                });
            } else {
                urlString += prop + '=' + obj[prop] + '&';
            }
        }
    }
    return urlString.substr(0, urlString.length - 1);
}


    function removeEmptyValues(obj) {
        const propNames = Object.getOwnPropertyNames(obj);
        // @ts-ignore
        propNames.forEach(propName => {
            if (obj[propName] === null || obj[propName] === undefined || obj[propName] === 'undefined') {
                delete obj[propName];
            }
        });
        return obj;
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    function basicValidation (input,inputType){
        // eslint-disable-next-line default-case
     switch (inputType){
         case 'NAME':
         return  validName(input);
         case 'EMAIL':
         return validEmail(input);
         case 'MOBILE_NUMBER':
         return validMobileNumber(input);
         case 'NUBAN':
         return validNuban(input);
         case 'PERCENT':
         return validPercentage(input);
         case 'CASH_INPUT':
         return validCashInput(input)
         default:
          return true;//No validation
     }
    }

export const CUSTOM_VALIDATION ={
    BASIC_VALIDATION: basicValidation,
    IS_EMPTY:isNullOrEmptyOrUndefined,
    VALID_OBJ:validateObjectModel,
    VALID_OBJ_ANY: validateObjectModelAny,
    TO_URL_STRING:toUrlString
}





