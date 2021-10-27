import {useEffect, useState} from "react";
import {FormInput}           from "../../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}   from "../../../shared/validation/validation";
import {CustomUpload}        from "../../../shared/components/custom-upload/custom-upload";
import {CustomLoader}        from "../../../shared/components/custom-loader/custom-loader";
import {SERVICES}            from "../../../core/services/services";
import {CustomMessage}       from "../../../shared/components/alert/custom-message";
import {CustomToast}         from "../../../shared/components/alert/custom-toast";
import {HELPER}              from "../../../shared/helper/helper";

export function NewDispute(props){
    const[loading,setLoading] = useState(false);
    const[validForm,setValidForm] = useState(false);
    const[messageTitle,setMessageTitle] = useState(null);
    const[successMessage,setSuccessMessage] = useState(null);
    const[currentIndex,setCurrentIndex] = useState(0);
    const [message,setMessage] = useState(null);

    const[dispute,setDispute] = useState({
        customerAccountName: null,
        customerAccountNumber: null,
        transactionSearchKey: props.transactionSearchKey
    })

    const[disputeError,setDisputeError] = useState({
        customerAccountName: null,
        customerAccountNumber: null,
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
        const validForm = CUSTOM_VALIDATION.VALID_OBJ(dispute,3);
        const validErrorForm = !CUSTOM_VALIDATION.VALID_OBJ_ANY(disputeError);
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
         // receiptDataBase64: dispute['receiptDataBase64'],
         transactionSearchKey: dispute['transactionSearchKey']
     }
     SERVICES.CREATE_DISPUTE(params)
     .then(data=>{
         console.log('Dispute created successfully',data)
         setMessageTitle(null)
         setSuccessMessage('Dispute created successfully')
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
            return <button onClick={()=>props.closeDisputeModal()} className="secondary-button">Cancel</button>
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
                return <button disabled={!validForm} onClick={submit} className="primary-button">Submit</button>
            }
        }
        else{
            return(
                <div className="p-mt-2 p-text-center">
                    <CustomLoader loadingText="Submitting..." />
                </div>
            )
        }
    }

    function getUploadFile(e){
        setDispute({...dispute,receiptDataBase64:e});
    }

    const disputeForm = () =>{
        return(
            <div>
                <div>
                    <p className="custom-modal-title p-text-left">Create Dispute</p>
                </div>
                <div className="custom-dialog-subtitle-container-lg">
                    <p className="custom-dialog-subtitle p-mb-5">Fill the form below to create model </p>
                </div>
                <div className="p-pb-1">
                    {viewAlert()}
                </div>
                <div className="p-grid">
                    <div className="p-col-12">
                        <FormInput value={dispute['customerAccountName']} required={true} field="customerAccountName" type="NAME" error={disputeError['customerAccountName']} fn={validateForm} loading={loading}  placeholder="Customer account name"/>
                    </div>
                    <div className="p-col-12">
                        <FormInput value={dispute['customerAccountNumber']} required={true} field="customerAccountNumber" type="NUBAN" error={disputeError['customerAccountNumber']} fn={validateForm} loading={loading}  placeholder="Customer account number"/>
                    </div>
                    {/*<div className="p-col-12">*/}
                    {/*    <CustomUpload getUploadedFile={getUploadFile} title="Receipt"/>*/}
                    {/*</div>*/}
                    <div className="p-col-12">
                        <div className="p-mt-4">
                            <div className="p-grid">
                                <div className="p-col-6">
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
                            props.closeDisputeModal()
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
