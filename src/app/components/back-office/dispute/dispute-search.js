import './dispute.css'
import {useEffect, useState} from "react";
import {CustomLoader}        from "../../../shared/components/custom-loader/custom-loader";
import {FormInput}           from "../../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}   from "../../../shared/validation/validation";
import {FormDropdown}        from "../../../shared/components/form-component/form-dropdown";

export function DisputeSearch(props){
    const [loading,setLoading] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [dispute,setDispute] = useState(
        {
            resolutionStatus:null,
            status:null,
        }
    )

    const [disputeError,setDisputeError] = useState(
        {
            resolutionStatus:null,
            status:null,
        }
    )

    const resolutionStatus = [
        {desc:'Pending',code:'PENDING'},
        {desc:'Accepted',code:'ACCEPTED'},
        {desc:'Declined',code:'DECLINED'}
    ]

    const status = [
        {desc:'Pending',code:'PENDING'},
        {desc:'resolved',code:'RESOLVED'},
    ]


    function validateForm(e,name,type,refineName,required){
        let value = e?.target?.value
        const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
        const isValidInput = !isEmpty ? CUSTOM_VALIDATION.BASIC_VALIDATION(value, type) : false;
        if (isValidInput) {
            setDispute({...dispute, [name]: value});
            setDisputeError({...disputeError, [name]: null});
        }
        else {
            let errorMessage = required && isEmpty ? `${refineName} is required` : null;
            if (!isValidInput) {
                errorMessage = `${refineName} is invalid`;
            }
            setDisputeError({...disputeError, [name]: errorMessage})
        }
    }

    function filterSearch(){
        let payload ={}

        if(dispute['resolutionStatus']){
            payload.resolutionStatus = dispute['resolutionStatus']?.code;
        }
        if(dispute['status']){
            payload.status = dispute['status']?.code;
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
            setDisputeError({...disputeError,[name]:''});
            setDispute({...dispute,[name]:value});
        }
        else{
            let errorMessage = 'Select type';
            setDisputeError({...disputeError, [name]: errorMessage});
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
                        <FormDropdown required={false} label="code" field="resolutionStatus"
                        error={disputeError['resolutionStatus']} disabled={loading}
                         value={dispute['resolutionStatus']} fn={validateDropdown}
                         options={resolutionStatus} placeholder="Select resolution Status"/>
                    </div>
                    <div className="p-col-12">
                        <FormDropdown required={false} label="code" field="status"
                                      error={disputeError['status']} disabled={loading}
                                      value={dispute['status']} fn={validateDropdown}
                                      options={status} placeholder="Select status"/>
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




