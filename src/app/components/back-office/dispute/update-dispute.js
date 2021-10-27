import {useEffect, useState} from "react";
import {CUSTOM_VALIDATION}   from "../../../shared/validation/validation";
import {CustomUpload}        from "../../../shared/components/custom-upload/custom-upload";
import {CustomLoader}        from "../../../shared/components/custom-loader/custom-loader";
import {SERVICES}            from "../../../core/services/services";
import {CustomMessage}       from "../../../shared/components/alert/custom-message";
import {CustomToast}         from "../../../shared/components/alert/custom-toast";
import {FormDropdown}        from "../../../shared/components/form-component/form-dropdown";
import {FormTextArea}        from "../../../shared/components/form-component/form-text-area";
import {HELPER}              from "../../../shared/helper/helper";

export function UpdateDispute(props){
    const[loading,setLoading] = useState(false);
    const[validForm,setValidForm] = useState(false);
    const[messageTitle,setMessageTitle] = useState(null);
    const[successMessage,setSuccessMessage] = useState(null);
    const[currentIndex,setCurrentIndex] = useState(0);
    const [message,setMessage] = useState(null);

    const status =[
        {desc:'accepted',code:'ACCEPTED',status:true},
        {desc:'Declined',code:'DECLINED',status:false}
    ]

    const[dispute,setDispute] = useState({
        approved: null,
        comment: null,
        receiptDataBase64: null,
        logCode: props.logCode
    })

    const[disputeError,setDisputeError] = useState({
        approved: null,
        comment: null,
    })

    useEffect(() => {
            let mounted = true
            if(mounted) {
                checkValidForm();
            }
            return () => {
                mounted = false;
            }
        },[dispute,disputeError]
    );

    function isUploaded(decline){
        if(decline === null){
            return false;
        }
       return  decline ? dispute['receiptDataBase64'] !== null : true;
    }

    function checkValidForm(){
        const isDeclined = dispute['approved']? !(dispute['approved'].status):null;
        const validForm = CUSTOM_VALIDATION.VALID_OBJ(dispute,isDeclined?4:3);
        const upLoadedReceipt = isUploaded(isDeclined);
        const validErrorForm = !CUSTOM_VALIDATION.VALID_OBJ_ANY(disputeError);
        setValidForm(validForm && validErrorForm && upLoadedReceipt);
    }

    function validateForm(e,name,type,refineName,required){
        let value = e?.target?.value
        const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
        const isValidInput = !isEmpty ? CUSTOM_VALIDATION.BASIC_VALIDATION(value, type) : false;
        if (isValidInput) {
            //clear image
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

    const viewAlert = () =>{
        if(messageTitle){
            return (
                <div>
                    <CustomToast title={messageTitle} description={message} type="error"/>
                </div>
            )
        }
        else{
            return (
                <div/>
            )
        }
    }

    function submit(){
        setLoading(true);
        const params = {
            approved: dispute['approved'].status,
            comment: dispute['comment'],
            receiptDataBase64: dispute['receiptDataBase64'],
            logCode: dispute['logCode']
        }
        SERVICES.UPDATE_DISPUTE(params)
            .then(data=>{
                setMessageTitle(null)
                setSuccessMessage('Dispute resolved successfully')
                setCurrentIndex(1);
                setLoading(false);
            })
            .catch(error =>{
                setMessageTitle('Error');
                setMessage(HELPER.PROCESS_ERROR(error));
                setLoading(false);
            })
    }

    const customCancelButton = () => {
        if(!loading){
            return <button onClick={()=>props.closeModal()} className="secondary-button">Cancel</button>
        }
        else{
            return(
                <div/>
            )
        }
    }

    const customSubmitButton = () => {
        if(!loading) {
           return <button onClick={submit} disabled={!validForm} className="primary-button">Resolve</button>
        }
        else{
            return(
                <div className="pull-up-element-2">
                    <CustomLoader loadingText="Submitting..." />
                </div>
            )
        }
    }

    function getUploadFile(e){
        setDispute({...dispute,receiptDataBase64:e});
    }

    function validateDropdown(e,name){
        const value = e.target.value
        if(value){
            if(name === 'approved'){
                if(value.code === 'ACCEPTED'){
                    setDispute({...dispute,[name]: value, receiptDataBase64:null});
                }
                else{
                    setDispute({...dispute,[name]: value});
                }
            }
            else {
                setDispute({...dispute, [name]: value});
            }
            setDisputeError({...disputeError,[name]:''});
        }
        else{
            let errorMessage = 'Select Action';
            setDisputeError({...disputeError, [name]: errorMessage});
        }
    }

    const showUploadReceipt = () =>{
        const isDeclined = dispute['approved']? dispute['approved']?.code === 'DECLINED':false;

        if(isDeclined){
            return(
                <CustomUpload getUploadedFile={getUploadFile} title="Receipt"/>
            )
        }
        else{
            return <span/>
        }
    }

    const disputeForm = () =>{
        return(
            <div>
                <div>
                    <p className="custom-modal-title p-text-left">Dispute Resolution Initiation</p>
                </div>
                <div className="custom-dialog-subtitle-container-lg">
                    <p className="custom-dialog-subtitle p-mb-5">Fill the form below to resolve dispute </p>
                </div>
                <div className="p-pb-1">
                    {viewAlert()}
                </div>
                <div className="p-grid">
                    <div className="p-col-12">
                        <FormDropdown required={false} label="code" field="approved"
                        error={disputeError['approved']} disabled={loading}
                        value={dispute['approved']} fn={validateDropdown}
                        options={status} placeholder="Select Action"/>
                    </div>
                    <div className="p-col-12">
                        <FormTextArea required={false} field="comment" type="DESCRIPTION" error={disputeError['comment']} fn={validateForm} loading={loading}  placeholder="Comment"/>
                    </div>
                    <div className="p-col-12">
                        {showUploadReceipt()}
                    </div>
                    <div className="p-col-12">
                        <div className="p-mt-4">
                            <div className="p-grid">
                                <div className="p-col-6">
                                    {customCancelButton()}
                                </div>
                                <div className="p-col-6">
                                    {customSubmitButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const transformView = () =>{
        if(currentIndex){
            return(
                <div className="p-text-center p-mt-2">
                    <div>
                        <CustomMessage messageType="success"/>
                    </div>
                    <div>
                        <p className="success-message-text">{successMessage}</p>
                    </div>
                    <div className="success-message-btn-container">
                        <button onClick={()=>{
                            props.resolvedSuccessful();
                        }} className="primary-button p-mt-3">Close</button>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    {disputeForm()}
                </div>
            )
        }
    }




    return(
        <div className="p-pb-5">
            {transformView()}
        </div>
    )
}
