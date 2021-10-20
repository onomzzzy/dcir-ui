import {useEffect, useState} from "react";
import {CUSTOM_VALIDATION}   from "../../shared/validation/validation";
import {CustomUpload}        from "../../shared/components/custom-upload/custom-upload";
import {CustomLoader}        from "../../shared/components/custom-loader/custom-loader";
import {SERVICES}            from "../../core/services/services";
import {CustomMessage}       from "../../shared/components/alert/custom-message";
import {CustomToast}         from "../../shared/components/alert/custom-toast";
import {FormDropdown}        from "../../shared/components/form-component/form-dropdown";
import {FormTextArea}        from "../../shared/components/form-component/form-text-area";

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

    function checkValidForm(){
        const validForm = CUSTOM_VALIDATION.VALID_OBJ(dispute,4);
        const validErrorForm = !CUSTOM_VALIDATION.VALID_OBJ_ANY(disputeError) && dispute['receiptDataBase64'] !== null;
        setValidForm(validForm && validErrorForm);
    }

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

    function upDateDispute (){

    }

    function submit(){
        setLoading(true);
        const params = {
            customerAccountName: dispute['customerAccountName'],
            customerAccountNumber: dispute['customerAccountNumber'],
            receiptDataBase64: dispute['receiptDataBase64'],
            transactionSearchKey: dispute['transactionSearchKey']
        }
        SERVICES.CREATE_DISPUTE(params)
            .then(data=>{
                setMessageTitle(null)
                setSuccessMessage('Dispute created successfully')
                setCurrentIndex(1);
                setLoading(false);
            })
            .catch(error =>{
                setMessageTitle('Error');
                setMessage('An error occur when creating dispute');
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
            if (props.isUpdate) {
                return <button disabled={!validForm} onClick={upDateDispute} className="primary-button">Update</button>
            }
            else {
                return <button disabled={!validForm} onClick={submit} className="primary-button">Resolve</button>
            }
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
            setDisputeError({...disputeError,[name]:''});
            setDispute({...dispute,[name]:value});
        }
        else{
            let errorMessage = 'Select Action';
            setDisputeError({...disputeError, [name]: errorMessage});
        }
    }

    const showUploadReceipt = () =>{
        const isDeclined = dispute['accepted']? dispute['accepted']?.code === 'DECLINED':false;

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
                        <FormDropdown required={false} label="code" field="accepted"
                        error={disputeError['accepted']} disabled={loading}
                        value={dispute['accepted']} fn={validateDropdown}
                        options={status} placeholder="Select Action"/>
                    </div>
                    <div className="p-col-12">
                        <FormTextArea required={false} field="comment" type="" error={disputeError['comment']} fn={validateForm} loading={loading}  placeholder="Comment"/>
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
                            props.closeModal(true)
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
