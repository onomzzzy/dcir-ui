


import {useEffect, useState} from "react";
import {CustomLoader}        from "../../shared/components/custom-loader/custom-loader";
import {FormInput}           from "../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}   from "../../shared/validation/validation";

export function SearchTransaction(props){
    const [loading,setLoading] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [transaction,setTransaction] = useState(
        {
            cardAcceptorId: null,
            chargeAmount: null,
            requestTime: null,
            terminalId: null,
            transactionAmount: null,
            transactionTime: null,
        }
    )

    const [transactionError,setTransactionError] = useState(
        {
            cardAcceptorId: null,
            chargeAmount: null,
            requestTime: null,
            terminalId: null,
            transactionAmount: null,
            transactionTime: null,
        }
    )

    useEffect(() => {
            let mounted = true
            if(mounted) {

            }
            return () => {
                mounted = false;
            }
        },[]
    );


    function validateForm(e,name,type,refineName,required){
        let value = e?.target?.value
            const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
            const isValidInput = !isEmpty ? CUSTOM_VALIDATION.BASIC_VALIDATION(value, type) : false;
            if (isValidInput) {
                setTransaction({...transaction, [name]: value});
                setTransactionError({...transactionError, [name]: null});
            }
            else {
                let errorMessage = required && isEmpty ? `${refineName} is required` : null;
                if (!isValidInput) {
                    errorMessage = `${refineName} is invalid`;
                }
                setTransaction({...transaction, [name]: errorMessage})
            }
    }

    function filterSearch(){
        let payload ={}

        if(transaction['cardAcceptorId']){
            payload.chargeCode = transaction['cardAcceptorId'];
        }
        if(transaction['chargeAmount']){
            payload.chargeCode = transaction['chargeAmount'];
        }
        if(transaction['requestTime']){
            payload.chargeType = transaction['requestTime'];
        }
        if(transaction['terminalId']){
            payload.chargeType = transaction['terminalId'];
        }
        if(transaction['transactionAmount']){
            payload.chargeType = transaction['transactionAmount'];
        }
        if(transaction['transactionTime']){
            payload.chargeType = transaction['transactionTime'];
        }

        return payload;
    }


    function cancelModal(){
        props.closeModal()
    }

    const customCancelButton = () => {
        if(!loading){
            return <button onClick={cancelModal} className="secondary-button">Cancel</button>
        }
        else{
            return(
                <div/>
            )
        }
    }

    function validateDropdown(e,name){
        const value = e.target.value
        if(value){
            setTransactionError({...transactionError,[name]:''});
            setTransaction({...transaction,[name]:value});
        }
        else{
            let errorMessage = 'Select type';
            setTransactionError({...transactionError, [name]: errorMessage});
        }
    }

    const customSubmitButton = () => {
        if(!loading) {
                return <button onClick={()=>props?.searchFunction(filterSearch())} className="primary-button">Filter</button>
        }
        else{
            return(
                <div className="pull-up-element-2">
                    <CustomLoader loadingText="Submitting..." />
                </div>
            )
        }
    }

    const chargeFormView = () =>{
        if(currentIndex){
            return(
                <div>
                    <div className="success-message-btn-container">
                        <button onClick={()=>{
                            props.closeModal(true)
                        }} className="primary-button success-message-btn">Close</button>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    {chargeTypeFormView()}
                </div>
            )
        }
    }

    const chargeTypeFormView = () =>{
        return(
            <div>
                <div className="custom-modal-title p-text-left">
                    Filter
                </div>
                <div className="custom-dialog-subtitle-container p-mb-5">
                </div>
                <div className="p-grid">
                    <div className="p-col-12">
                        <FormInput value={transaction['cardAcceptorId']} required={false} field="cardAcceptorId" type="" error={transactionError['cardAcceptorId']} fn={validateForm} loading={loading}  placeholder="Card acceptor id"/>
                    </div>
                    <div className="p-col-12">
                        <FormInput value={transaction['chargeAmount']} required={true} field="chargeAmount" type="CASH_INPUT" error={transactionError['chargeAmount']} fn={validateForm} loading={loading}  placeholder="Charge amount"/>
                    </div>
                    <div className="p-col-12">
                        <FormInput value={transaction['transactionAmount']} required={true} field="transactionAmount" type="CASH_INPUT" error={transactionError['transactionAmount']} fn={validateForm} loading={loading}  placeholder="Transaction amount"/>
                    </div>
                    <div className="p-col-12">
                        <FormInput value={transaction['terminalId']} required={false} field="terminalId" type="" error={transactionError['terminalId']} fn={validateForm} loading={loading}  placeholder="Terminal id"/>
                    </div>
                    <div className="p-col-6">
                        <FormInput value={transaction['requestTime']} required={false} field="requestTime" type="" error={transactionError['requestTime']} fn={validateForm} loading={loading}  placeholder="Start date"/>
                    </div>
                    <div className="p-col-6">
                        <FormInput value={transaction['transactionTime']} required={false} field="transactionTime" type="" error={transactionError['transactionTime']} fn={validateForm} loading={loading}  placeholder="End date"/>
                    </div>
                    <div className="p-col-12">
                        <div className="p-mt-5">
                            <div className="p-grid">
                                <div className={loading?'p-col-12':'p-col-6'}>
                                    {customCancelButton()}
                                </div>
                                <div className={loading?'p-col-12':'p-col-6'}>
                                    {customSubmitButton()}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="p-pb-2">
            {chargeFormView()}
        </div>
    )
}




