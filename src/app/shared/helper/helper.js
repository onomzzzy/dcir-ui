import moment from "moment";

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

function responseStatus(response){
    const status = response.toString().toLowerCase();
    const statusToDisplay = titleCase(status);

    switch (status){
        case 'success':
        case 'accepted':
        case 'resolved':
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


export const HELPER = {
    TO_CURRENCY_FORMAT : toCurrencyFormat,
    FORMAT_DATE : formatDate,
    RESPONSE_CODE_COLOR: responseCodeColor,
    RESPONSE_STATUS: responseStatus,
}

