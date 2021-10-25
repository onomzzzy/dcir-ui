import moment                  from "moment";
import {LOCAL_STORAGE_SERVICE} from "../../core/services/storage-service";

function toCurrencyFormat(data) {
    return "₦"+ parseFloat(data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatDate(data){
    return `${moment(data).format("MMM Do YY")} | ${moment(data).format('LT')}`
}

function responseCodeColor(responseCode){
    switch (responseCode){
        case '00':
            return (<span style={{color:'#37AC00',fontWeight:'600'}}>{responseCode}</span>);
        case '91':
        return (<span style={{color:'#50B8EE',fontWeight:'600'}}>{responseCode}</span>);
        default :
        return (<span style={{color:'#464DF2',fontWeight:'600'}}>{responseCode}</span>)
    }
}

function titleCase (str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g,
        function(txt){return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();});
}

function getProcessError (error){
    console.log('err',error?.data?.error)
    const errorData = error?.data?.errors;
    const err = error?.data?.error? [`${error?.data?.error}`]: ['Something went wrong ...'];
    const errors = errorData?.length?errorData:err;

    let result = '';
    errors.forEach(e=>{
        result += e.message? `<p>${e.message}</p>`: e;
    })
     return result;
}

function responseStatus(response){
    const status = response.toString().toLowerCase();
    const statusToDisplay = titleCase(status);

    switch (status){
        case 'success':
        case 'accepted':
        case 'resolved':
        case 'active':
            return (
                <span className="custom-badge custom-badge-text custom-badge-success">{statusToDisplay}</span>
            );
        case 'pending':
            return (
                <span className="custom-badge custom-badge-text custom-badge-pending">{statusToDisplay}</span>
            );
        case 'declined':
        case 'failed':
            return (
                <span className="custom-badge custom-badge-text custom-badge-error">{statusToDisplay}</span>
            );
        default :
            return (
                <span className="custom-badge custom-badge-text custom-badge-warning">{statusToDisplay}</span>
            )
    }
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

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
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

function getRefineRole(){
    const roles = LOCAL_STORAGE_SERVICE.GET_ROLES()

    switch (roles[0]){
        case 'DCIR_BACKOFFICE_ADMIN':
         return 'Backoffice Admin';
        case 'DCIR_MERCHANT_SUPER_ADMIN':
         return 'Merchant Admin';
        case 'DCIR_BACKOFFICE_OPERATOR':
         return 'Backoffice Operator'
        default:
            return 'Dcir User'

    }

}

function hasAuthority(authority){
    const authorities = LOCAL_STORAGE_SERVICE.GET_AUTHORITIES();
    return authorities.includes(authority);
}

function hasRole(rolesArray){
    let hasRole = false;
    const roles = LOCAL_STORAGE_SERVICE.GET_ROLES();
    rolesArray.forEach(e=>{
       if(roles.includes(e)) {
           hasRole = true;
       }
    })
    return hasRole
}

function canPerformAction(authorities,action){
    let authority = '';
    authorities.forEach(e=>{
        if(e.label === action){
            authority = e.value;
        }
    })

    return hasAuthority(authority);
}


export const HELPER = {
    TO_CURRENCY_FORMAT : toCurrencyFormat,
    FORMAT_DATE : formatDate,
    RESPONSE_CODE_COLOR: responseCodeColor,
    RESPONSE_STATUS: responseStatus,
    PROCESS_ERROR: getProcessError,
    TO_URL_STRING:toUrlString,
    GET_ROLE:getRefineRole,
    HAS_AUTHORITY:hasAuthority,
    HAS_ROLE:hasRole,
    CAN_PERFORM_ACTION:canPerformAction
}

