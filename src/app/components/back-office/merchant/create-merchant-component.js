import './merchant.css'
import {useEffect, useState} from "react";
import {CustomToast}         from "../../../shared/components/alert/custom-toast";
import {ConfigureSettlement} from "./configure-settlement";
import {FormInput}           from "../../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}               from "../../../shared/validation/validation";
import {CustomLoader}                    from "../../../shared/components/custom-loader/custom-loader";
import {SERVICES}                        from "../../../core/services/services";
import {CustomMessage}                   from "../../../shared/components/alert/custom-message";
import {HELPER}                          from "../../../shared/helper/helper";

export function CreateMerchantComponent(props){
    const [currentIndex,setCurrentIndex] = useState(0);
    const [loading,setLoading] = useState(false);
    const [messageTitle,setMessageTitle] = useState(null);
    const [alertType,setAlertType] = useState('success');
    const [message,setMessage] = useState(null);
    const [validForm,setValidForm] = useState(false);
    const [hideTitle,setHideTitle] = useState(false);
    const [settlementInfo,setSettlementInfo] = useState({
        accountName: null,
        accountNumber: null,
        chargeType: null,
        participants: null,
        settlementType: null
    })

    const [settlementErrorInfo,setSettlementErrorInfo] = useState({
        accountName: null,
        accountNumber: null,
        chargeType: 'Select a charge type',
        participants: 'Select participants',
        settlementType: 'Select a settlement type'
    })

    const [merchantForm,setMerchantForm] = useState({
        merchantName:null,
        adminEmail:null,
        mainEmail:null,
        phoneNumber:null,
        cardAcceptorId:null,
        alternatePhoneNumber:null,
        supportEmail:null,
        settlementEmail:null,
        disputeEmail:null
    })

    const [merchantUpdateForm,setMerchantUpdateForm] = useState({
        merchantName:null,
        mainEmail:null,
        phoneNumber:null,
        merchantId:null,
        supportEmail:null,
        settlementEmail:null,
        disputeEmail:null
    })

    const [merchantUpdateErrorForm,setMerchantUpdateErrorForm] = useState({
        merchantName:null,
        mainEmail:null,
        phoneNumber:null,
        supportEmail:null,
        settlementEmail:null,
        disputeEmail:null
    })

    const [merchantErrorForm,setMerchantErrorForm] = useState({
        merchantName:null,
        adminEmail:null,
        mainEmail:null,
        phoneNumber:null,
        cardAcceptorId:null,
        alternatePhoneNumber:null,
        supportEmail:null,
        settlementEmail:null,
        disputeEmail:null
    })

    function upDateMerchant(){
        setLoading(true);
        SERVICES.UPDATE_MERCHANT(merchantUpdateForm)
           .then(data=>{
               console.log('Merchant updated successfully',data);
               setMessage('Merchant updated successfully');
               offTitle();
               setCurrentIndex(2);
               setLoading(false);
           })
           .catch(error=>{
               props.callAlert('Error',HELPER.PROCESS_ERROR(error));
               setLoading(false);
           })
    }

    function setSettlementDetails(info,error){
        setSettlementInfo(info)
        setSettlementErrorInfo(error);
    }

    function callAlert(title,description){
        setAlertType('error');
        setMessage(description);
        setMessageTitle(title);
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                if(props.isUpdate) {
                    preFillForm(props.editMerchant);
                }
            }
            return () => {
                mounted = false;
            }
        },[merchantForm]
    );


    function preFillForm(e){
        setMerchantUpdateForm(e);
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                validateForm()
            }
            return () => {
                mounted = false;
            }
        },[merchantForm,merchantUpdateForm]
    );

    function validateForm(){
        // eslint-disable-next-line no-unused-vars
        if(props.isUpdate){
            const validForm = CUSTOM_VALIDATION.VALID_OBJ(merchantUpdateForm,7);
            const noError =  !CUSTOM_VALIDATION.VALID_OBJ_ANY(merchantUpdateErrorForm);
            setValidForm(validForm  && noError)
        }
        else{
            setValidForm(checkValidBasicForm());
        }
    }



   function checkValidBasicForm(){
           const noError =  !CUSTOM_VALIDATION.VALID_OBJ_ANY(merchantErrorForm)
           return CUSTOM_VALIDATION.VALID_OBJ(merchantForm, 9) && noError;
    }

    const buttonView = () =>{
       if(props.isSearch){
          return (
              <button  onClick={
                  (e)=> navigate(1)
              }
                      className="primary-button">Filter</button>
          )
        }
        else {
           if (props.isUpdate) {
               return (
                   <button disabled={!validForm} onClick={
                       (e) => upDateMerchant()
                   }
                           className="primary-button">Update</button>
               )
           }
           else {
               return (
                   <button disabled={!validForm} onClick={
                       (e) => navigate(1)
                   }
                           className="primary-button">Next</button>
               )
           }
       }
    }

    const basicInfo = () =>{
        return(
            <div className="p-grid">
                <div className="p-col-12">
                    <div style={{display:props.isUpdate?'none':'block'}}>
                    <FormInput value={merchantForm['merchantName']} required={true} field="merchantName" type="NAME" error={merchantErrorForm['merchantName']} fn={fillForm} loading={loading}  placeholder="Merchant name"/>
                    </div>
                    <div style={{display:props.isUpdate?'block':'none'}}>
                        <FormInput value={merchantUpdateForm['merchantName']} required={true} field="merchantName" type="NAME" error={merchantUpdateErrorForm['merchantName']} fn={fillForm} loading={loading}  placeholder="Merchant name"/>
                    </div>
                </div>
                <div className="p-col-6">
                    <div style={{display:props.isUpdate?'none':'block'}}>
                    <FormInput value={merchantForm['mainEmail']} required={true} field="mainEmail" type="EMAIL" error={merchantErrorForm['mainEmail']} fn={fillForm} loading={loading}  placeholder="Main email"/>
                    </div>
                    <div style={{display:props.isUpdate?'block':'none'}}>
                        <FormInput value={merchantUpdateForm['mainEmail']} required={true} field="mainEmail" type="EMAIL" error={merchantUpdateErrorForm['mainEmail']} fn={fillForm} loading={loading}  placeholder="Main email"/>
                    </div>
              </div>
                <div className="p-col-6">
                    <div style={{display:props.isUpdate?'none':'block'}}>
                    <FormInput value={merchantForm['supportEmail']} required={true} field="supportEmail" type="EMAIL" error={merchantErrorForm['supportEmail']} fn={fillForm} loading={loading}  placeholder="Support email"/>
                    </div>
                    <div style={{display:props.isUpdate?'block':'none'}}>
                        <FormInput value={merchantUpdateForm['supportEmail']} required={true} field="supportEmail" type="EMAIL" error={merchantUpdateErrorForm['supportEmail']} fn={fillForm} loading={loading}  placeholder="Support email"/>
                    </div>
                    </div>
                <div className="p-col-6">
                    <div style={{display:props.isUpdate?'none':'block'}}>
                    <FormInput value={merchantForm['settlementEmail']} required={true} field="settlementEmail" type="EMAIL" error={merchantErrorForm['settlementEmail']} fn={fillForm} loading={loading}  placeholder="Settlement email"/>
                    </div>
                    <div style={{display:props.isUpdate?'block':'none'}}>
                        <FormInput value={merchantUpdateForm['settlementEmail']} required={true} field="settlementEmail" type="EMAIL" error={merchantUpdateErrorForm['settlementEmail']} fn={fillForm} loading={loading}  placeholder="Settlement email"/>
                    </div>
                    </div>
                <div className="p-col-6">
                    <div style={{display:props.isUpdate?'none':'block'}}>
                        <FormInput value={merchantForm['disputeEmail']} required={true} field="disputeEmail" type="EMAIL" error={merchantErrorForm['disputeEmail']} fn={fillForm} loading={loading}  placeholder="Dispute email"/>
                    </div>
                    <div style={{display:props.isUpdate?'block':'none'}}>
                        <FormInput value={merchantUpdateForm['disputeEmail']} required={true} field="disputeEmail" type="EMAIL" error={merchantUpdateErrorForm['disputeEmail']} fn={fillForm} loading={loading}  placeholder="Dispute email"/>
                    </div>

                </div>
                <div style={{display:props.isUpdate?'none':'block'}} className="p-col-6">
                    <FormInput value={merchantForm['adminEmail']} required={true} field="adminEmail" type="EMAIL" error={merchantErrorForm['adminEmail']} fn={fillForm} loading={loading}  placeholder="Admin email"/>
                </div>
                <div style={{display:props.isUpdate?'none':'block'}}  className="p-col-6">
                    <FormInput value={merchantForm['cardAcceptorId']} required={true} field="cardAcceptorId" type="CARD_ACCEPTANCE_ID" error={merchantErrorForm['cardAcceptorId']} fn={fillForm} loading={loading}  placeholder="Card acceptor id"/>
                </div>
                <div className={props.isUpdate?'p-col-12':'p-col-6'}>
                    <div  style={{display:props.isUpdate?'none':'block'}}>
                    <FormInput value={merchantForm['phoneNumber']} required={true} field="phoneNumber" type="MOBILE_NUMBER" error={merchantErrorForm['phoneNumber']} fn={fillForm} loading={loading}  placeholder="Phone number"/>
                    </div>
                    <div  style={{display:props.isUpdate?'block':'none'}}>
                        <FormInput value={merchantUpdateForm['phoneNumber']} required={true} field="phoneNumber" type="MOBILE_NUMBER" error={merchantUpdateErrorForm['phoneNumber']} fn={fillForm} loading={loading}  placeholder="Phone number"/>
                    </div>

                </div>
                <div style={{display:props.isUpdate?'none':'block'}}  className="p-col-6">
                    <FormInput value={merchantForm['alternatePhoneNumber']} required={true} field="alternatePhoneNumber" type="MOBILE_NUMBER" error={merchantErrorForm['alternatePhoneNumber']} fn={fillForm} loading={loading}  placeholder="alternate phone number"/>
                </div>
                <div className="p-col-6">
                    <div className="p-mt-5">
                        {!loading?
                            (<div>
                                <button onClick={props.closeModal} className="secondary-button">Close</button>
                            </div>)
                            :
                            (
                                <div/>
                            )
                        }
                    </div>
                </div>
                <div className={loading?'p-col-12':'p-col-6'}>

                    <div className="p-mt-5">
                        {!loading?
                            (<div>
                                {buttonView()}
                            </div>)
                            :
                            (<div>
                                <CustomLoader loadingText="submitting..."/>
                            </div>)
                        }
                    </div>

                </div>
            </div>
        )
    }

    const merchantWizard =()=>{
        // eslint-disable-next-line default-case
       switch (currentIndex){
           case 0:
           return basicInfo();
           case 1:
           return <ConfigureSettlement offTitle={offTitle} merchantId={props?.editMerchant?.id} isUpdate={props.isUpdate} callAlert={callAlert} closeModal={close} settlementErrorInfo={settlementErrorInfo} basicInfo={merchantForm} settlementFn={setSettlementDetails} settlementInfo={settlementInfo} fn={navigate}/>
           case 2:
            return (
                <div>
                    <CustomMessage close={true} closeModal={props.closeModal} messageType="success" message={message}/>
                </div>
            )
       }
    }


    function fillForm (e,name,type,refineName,required){
        let value = e.target.value
        const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
        const isValidInput = !isEmpty? CUSTOM_VALIDATION.BASIC_VALIDATION(value,type):false;
        if(isValidInput){
            if(props.isUpdate){
                setMerchantUpdateForm({...merchantUpdateForm, [name]: value});
                setMerchantUpdateErrorForm({...merchantUpdateErrorForm, [name]: null});
            }
            else {
                setMerchantForm({...merchantForm, [name]: value});
                setMerchantErrorForm({...merchantErrorForm, [name]: null});
            }
        }
        else {
            let errorMessage = required && isEmpty? `${refineName} is required`:null;
            if(!isValidInput){
                errorMessage = `${refineName} is invalid`;
            }
            if(props.isUpdate) {
                setMerchantUpdateErrorForm({...merchantUpdateErrorForm, [name]: errorMessage});
            }
            else
                {
                    setMerchantErrorForm({...merchantErrorForm, [name]: errorMessage})
                }
        }
    }


    function navigate(index){
        if(checkValidBasicForm()){
            setCurrentIndex(index)
        }

    }

    function close(e){
        props.closeModal(e);
        // mainContext.mainDispatch( {type:'SHOW_DIALOG',showDialog:false});
    }


    const currentWizardName = () =>{
        if(props.isSearch){
            return ''
        }
        else {
            switch (currentIndex) {
                case 0:
                    return 'Basic information';
                case 1:
                    return 'Settlement information';
                case 2:
                    return 'Settlement participant'
                default:
                    return ''
            }
        }
    }

    function offTitle(){
        setHideTitle(true);
    }

 return (
         <div className="custom-form-container">
             <div>
                 <div style={{display:hideTitle?'none':'block'}} className="custom-modal-title p-text-left">
                     {props.isUpdate?'Update Merchant':(props.isSearch?'Filter':'Create Merchant')}
                 </div>
                 <div style={{display:hideTitle?'none':'block'}} className="custom-dialog-subtitle-container">
                     <p className="custom-dialog-subtitle">{currentWizardName()}</p>
                 </div>
                 <div className="login-alert-container">
                     {messageTitle?
                         (
                             <div className="merchant-toast">
                             <CustomToast title={messageTitle} description={message} type={alertType}/>
                             </div>
                         )
                         :
                         (
                             <div/>
                         )
                     }
                 </div>
                 <div className="p-mt-2">
                     {merchantWizard()}
                 </div>

             </div>
         </div>
 )
}
