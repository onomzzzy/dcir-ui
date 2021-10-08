import './merchant.css'
import {useContext, useEffect, useState} from "react";
import {ProgressSpinner}                 from "primereact/progressspinner";
import {CustomToast}                     from "../../shared/components/alert/custom-toast";
import {MainContext}                     from "../../../App";
import {ConfigureSettlement}             from "../configuration/configure-settlement";
import {FormInput}                       from "../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}               from "../../shared/validation/validation";
import {CustomLoader}                    from "../../shared/components/custom-loader/custom-loader";

export function CreateMerchantComponent(props){
    const mainContext = useContext(MainContext);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [loading,setLoading] = useState(false);
    const [messageTitle,setMessageTitle] = useState(null);
    const [alertType,setAlertType] = useState('success');
    const [message,setMessage] = useState(null);
    const [settlement,setSettlement] =useState('')
    const [validForm,setValidForm] = useState(false);
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
        mainEmail:null,
        phoneNumber:null,
        cardAcceptorId:null,
        alternatePhoneNumber:null,
        supportEmail:null,
        settlementEmail:null,
        disputeEmail:null
    })

    const [merchantErrorForm,setMerchantErrorForm] = useState({
        merchantName:null,
        mainEmail:null,
        phoneNumber:null,
        cardAcceptorId:null,
        alternatePhoneNumber:null,
        supportEmail:null,
        settlementEmail:null,
        disputeEmail:null
    })

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


    function resetError(){
        setSettlementErrorInfo({...settlementErrorInfo,
            accountName: null,
            accountNumber: null,
            chargeType: null,
            participants: null,
            settlementType: null})
    }

    function preFillForm(e){
      setSettlementInfo(e?.settlementInfo);
      setMerchantForm(e?.basicInfo);
      resetError()
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                validateForm()
            }
            return () => {
                mounted = false;
            }
        },[merchantForm]
    );

    function validateForm(){
        // eslint-disable-next-line no-unused-vars
        const validForm = checkValidBasicForm();
        setValidForm(validForm);
    }



   function checkValidBasicForm(){
       return CUSTOM_VALIDATION.VALID_OBJ(merchantForm,8);
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
        else{
            return(
                <button disabled={!validForm}  onClick={
                    (e)=> navigate(1)
                }
                className="primary-button">Next</button>
            )
        }
    }

    const basicInfo = () =>{
        return(
            <div className="p-grid">
                <div className="p-col-12">
                    <FormInput value={merchantForm['merchantName']} required={true} field="merchantName" type="NAME" error={merchantErrorForm['merchantName']} fn={fillForm} loading={loading}  placeholder="Merchant name"/>
                </div>
                <div className="p-col-6">
                    <FormInput value={merchantForm['mainEmail']} required={true} field="mainEmail" type="EMAIL" error={merchantErrorForm['mainEmail']} fn={fillForm} loading={loading}  placeholder="Main email"/>
                </div>
                <div className="p-col-6">
                    <FormInput value={merchantForm['supportEmail']} required={true} field="supportEmail" type="EMAIL" error={merchantErrorForm['supportEmail']} fn={fillForm} loading={loading}  placeholder="Support email"/>
                </div>
                <div className="p-col-6">
                    <FormInput value={merchantForm['settlementEmail']} required={true} field="settlementEmail" type="EMAIL" error={merchantErrorForm['settlementEmail']} fn={fillForm} loading={loading}  placeholder="Settlement email"/>
                </div>
                <div className="p-col-6">
                    <FormInput value={merchantForm['disputeEmail']} required={true} field="disputeEmail" type="EMAIL" error={merchantErrorForm['disputeEmail']} fn={fillForm} loading={loading}  placeholder="Dispute email"/>
                </div>
                <div className="p-col-6">
                    <FormInput value={merchantForm['phoneNumber']} required={true} field="phoneNumber" type="MOBILE_NUMBER" error={merchantErrorForm['phoneNumber']} fn={fillForm} loading={loading}  placeholder="Phone number"/>
                </div>
                <div className="p-col-6">
                    <FormInput value={merchantForm['alternatePhoneNumber']} required={true} field="alternatePhoneNumber" type="MOBILE_NUMBER" error={merchantErrorForm['alternatePhoneNumber']} fn={fillForm} loading={loading}  placeholder="alternate phone number"/>
                </div>
                <div className="p-col-12">
                    <FormInput value={merchantForm['cardAcceptorId']} required={true} field="cardAcceptorId" type="" error={merchantErrorForm['cardAcceptorId']} fn={fillForm} loading={loading}  placeholder="Card acceptor id"/>
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
           return <ConfigureSettlement merchantId={props?.editMerchant?.id} isUpdate={props.isUpdate} callAlert={callAlert} closeModal={close} settlementErrorInfo={settlementErrorInfo} basicInfo={merchantForm} settlementFn={setSettlementDetails} settlementInfo={settlementInfo} fn={navigate}/>
       }
    }


    function fillForm (e,name,type,refineName,required){
        let value = e.target.value
        const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
        const isValidInput = !isEmpty? CUSTOM_VALIDATION.BASIC_VALIDATION(value,type):false;
        if(isValidInput){
            setMerchantForm({...merchantForm,[name]:value});
            setMerchantErrorForm({...merchantErrorForm,[name]:null});
        }
        else {
            let errorMessage = required && isEmpty? `${refineName} is required`:null;
            if(!isValidInput){
                errorMessage = `${refineName} is invalid`;
            }
            setMerchantErrorForm({...merchantErrorForm,[name]:errorMessage})
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

 return (
         <div className="custom-form-container">
             <div>
                 <div className="custom-modal-title p-text-left">
                     {props.isUpdate?'Update Merchant':(props.isSearch?'Filter':'Create Merchant')}
                 </div>
                 <div className="custom-dialog-subtitle-container">
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
