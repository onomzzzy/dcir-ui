
import {useEffect, useState} from "react";
import {CustomLoader}        from "../../../shared/components/custom-loader/custom-loader";
import {FormDropdown}        from "../../../shared/components/form-component/form-dropdown";
import {FormInput}           from "../../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}   from "../../../shared/validation/validation";
import {SERVICES}            from "../../../core/services/services";
import {CustomMessage}       from "../../../shared/components/alert/custom-message";
import {CustomToast}         from "../../../shared/components/alert/custom-toast";
import {HELPER}              from "../../../shared/helper/helper";

export function CustomSettlementParticipantModel(props){
    const [loading,setLoading] = useState(false);
    const [validForm,setValidForm] = useState(false);
    const [messageTitle,setMessageTitle] = useState(null);
    const [chargeTypes,setChargeTypes] = useState([])
    const [message,setMessage] = useState(null);
    const [successMessage,setSuccessMessage] = useState(null);
    const [currentIndex,setCurrentIndex] = useState(null);
    const [accountName,setAccountName] = useState(null);
    const [verifyingAccountNumber,setVerifyingAccountNumber] = useState(false)
    const [participant,setParticipant] = useState(
        {
            accountName: null,
            accountNumber: null,
            chargeType: null,
            description: null,
            global: null,
            name: null
        }
    )
    const participantTypes = [
        {desc:'GLOBAL',code:'GLOBAL',isGlobal:true},
        {desc:'NON_GLOBAL',code:'NON_GLOBAL',isGlobal:false},
    ]

    const [participantError,setParticipantError] = useState(
        {
            accountName: null,
            accountNumber: null,
            chargeType: null,
            description: null,
            global: null,
            name: null
        }
    )

    function verifyAccountNumber(accNo){
        setVerifyingAccountNumber(true);
        setAccountName(null);
        setParticipantError({...participantError, accountNumber:null});
        SERVICES.VERIFY_ACCOUNT_NUMBER(accNo)
            .then(data=>{
                setParticipant({...participant, accountNumber: accNo});
                setAccountName(data?.result?.accountName);
                setVerifyingAccountNumber(false);
            })
            .catch(error=>{
                setParticipantError({...participantError, accountNumber: HELPER.PROCESS_ERROR(error)});
                setVerifyingAccountNumber(false);
            })
    }

    function getGlobalCharge(global){
       if(global){
           return {desc:'GLOBAL',code:'GLOBAL',isGlobal:true}
       }
       return {desc:'NON_GLOBAL',code:'NON_GLOBAL',isGlobal:false}
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                getChargeType();
            }
            return () => {
                mounted = false;
            }
        },[]
    );

    function getChargeType(){
        setChargeTypes([]);
        SERVICES.GET_CHARGE_MODELS()
            .then(data=>{
                let arr = []
                let newChargeType = null;
                data.result.forEach(e=>{
                  if(props.isUpdate && (e.chargeTypeName === props?.editParticipant?.chargeType)){
                      newChargeType = {desc:e.chargeTypeName,code:e.code}
                  }
                  arr.push({desc:e.chargeTypeName,code:e.code});
                })
                if(props.isUpdate){
                    const global = getGlobalCharge(props?.editParticipant?.global);
                    setParticipant({...props.editParticipant,global:global,chargeType: newChargeType});
                }
               setChargeTypes(arr);
               setLoading(false)
            })
            .catch(error=>{
                console.log('error ',error);
                setLoading(false)
            })
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                checkValidForm();
            }
            return () => {
                mounted = false;
            }
        },[participant,participantError]
    );

    function checkValidForm(){
        const validForm = CUSTOM_VALIDATION.VALID_OBJ(participant,props.isUpdate?7:6);
        const validErrorForm = !CUSTOM_VALIDATION.VALID_OBJ_ANY(participantError);
        setValidForm(validForm && validErrorForm);
    }




    function updateParticipant(){
        setLoading(true);
        const payload ={
            accountName: participant['accountName'],
            accountNumber: participant['accountNumber'],
            chargeType: participant['chargeType']?.code,
            description: participant['description'],
            global: participant['global']?.isGlobal,
            name: participant['name'],
            id:props?.editParticipant?.id
        }
        SERVICES.UPDATE_PARTICIPANT(payload)
            .then(data=>{
                console.log('success ',data)
                setMessageTitle(null)
                setSuccessMessage('Charge Model updated successfully')
                setCurrentIndex(1);
                setLoading(false);
            })
            .catch(error=>{
                setMessageTitle('Error',error);
                setMessage('An error occur when updating charge model');
                setLoading(false);
            })
    }

    const searchView = () =>{
       if(props.isSearch){
           return(
              <></>
           )
       }
       else{
           return (
               <div className="p-col-12">
               <div className="p-mt-2">
                   <FormInput value={participant['description']} required={true} field="description" type="" error={participantError['description']} fn={validateForm} loading={loading}  placeholder="Description"/>
               </div>
               </div>
           )
       }
    }

    const titleView = () =>{
      if(props.isUpdate){
        return 'Update Participant';
      }
      else if(props.isSearch){
        return 'Filter';
      }
      return 'New Participant'
    }

    const subTitleView = () =>{
        if(props.isUpdate){
            return 'Update the form below';
        }
        else if(props.isSearch){
            return 'Fill the form below to create participant';
        }
        return ''
    }

    const participantFormView = () =>{
       return(
           <div>
               <div>
                   <div className="custom-modal-title p-text-left">
                       {titleView()}
                   </div>
                   <div className="custom-dialog-subtitle-container p-mb-5">
                       <p className="custom-dialog-subtitle">{subTitleView()}</p>
                   </div>
               </div>
               <div className="p-pb-1">
                   {viewAlert()}
               </div>
               <div className="p-grid">
                   <div className="p-col-6">
                       <div className="p-mt-1">
                           <FormDropdown required={true} label="code" field="global"
                                         error={participantError['global']} disabled={loading}
                                         value={participant['global']} fn={validateDropdown}
                                         options={participantTypes} placeholder="Select a participant type"/>
                       </div>
                   </div>
                   <div className="p-col-6">
                       <div className="p-mt-1">
                           <FormDropdown required={true} label="desc" field="chargeType"
                           error={participantError['chargeType']} disabled={loading}
                           value={participant['chargeType']} fn={validateDropdown}
                           options={chargeTypes} placeholder="Select a charge type"/>
                       </div>
                   </div>
                   <div className="p-col-12">
                       <div className="p-mt-1">
                           <FormInput value={participant['name']} required={true} field="name" type="NAME" error={participantError['name']} fn={validateForm} loading={loading}  placeholder="Name"/>
                       </div>
                   </div>
                   {searchView()}
                   <div className="p-col-12">
                       <div className="p-mt-2">
                           <FormInput verifyingField="account no" verifying={verifyingAccountNumber} verified={accountName}  value={participant['accountNumber']} required={true} field="accountNumber" type="NUBAN"
                                      error={participantError['accountNumber']} fn={validateForm} loading={loading}  placeholder="Account no"/>
                       </div>
                   </div>
                   <div className="p-col-12">
                       <div className="p-mt-2">
                           <FormInput value={participant['accountName']} required={true} field="accountName" type="NAME"
                                      error={participantError['accountName']} fn={validateForm} loading={loading}  placeholder="Account name"/>
                       </div>
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

    const chargeFormView = () =>{
        if(currentIndex){
            return(
                <div>
                    <div>
                        <CustomMessage messageType="success"/>
                    </div>
                    <div>
                        <p className="success-message-text">{successMessage}</p>
                    </div>
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
                    {participantFormView()}
                </div>
            )
        }
    }

    function filterSearch(){
        let payload ={}

        if(participant['accountName']){
            payload.accountName = participant['accountName'];
        }
        if(participant['accountNumber']){
            payload.accountNumber = participant['accountNumber'];
        }
        if(participant['chargeType']){
            payload.chargeType = participant['chargeType'].chargeCode;
        }

        if(participant['global']){
            payload.global = participant['global'].isGlobal;
        }

        if(participant['name']){
            payload.name = participant['name'];
        }

        return payload;
    }

    function submit(){
        setLoading(true);
        const payload ={
            accountName: participant['accountName'],
            accountNumber: participant['accountNumber'],
            chargeType: participant['chargeType']?.code,
            description: participant['description'],
            global: participant['global'].isGlobal,
            name: participant['name'],
        }

        SERVICES.CREATE_PARTICIPANT(payload)
            .then(data=>{
                console.log('success',data);
                setMessageTitle(null)
                setSuccessMessage('Participant created successfully');
                setCurrentIndex(1);
                setLoading(false);
            })
            .catch(error=>{
                setMessageTitle('Error',error);
                setMessage('An error occur when creating participant');
                setLoading(false);
            })
    }

    const customSubmitButton = () => {
        if(!loading) {
            if (props.isUpdate) {
                return <button disabled={!validForm} onClick={updateParticipant} className="primary-button">Update</button>
            }
            else if(props.isSearch){
                return <button onClick={()=>props?.searchFunction(filterSearch())} className="primary-button">Filter</button>
            }
            else {
                return <button disabled={!validForm} onClick={submit} className="primary-button">Submit</button>
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

    function validateDropdown(e,name){
        const value = e.target.value
        if(value){
            setParticipantError({...participantError,[name]:''});
            setParticipant({...participant,[name]:value});
        }
        else{
            let errorMessage = 'Select participant';
            if(name === 'chargeType'){
             errorMessage = 'Select charge type';
            }
            setParticipantError({...participantError, [name]: errorMessage});
        }
    }

    function validateForm(e,name,type,refineName,required){
        let value = e?.target?.value
        if(props.isSearch){
            setParticipant({...participant, [name]: value});
        }
        else {
            const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
            const isValidInput = !isEmpty ? CUSTOM_VALIDATION.BASIC_VALIDATION(value, type) : false;
            if (isValidInput) {
                if(name === 'accountNumber') {
                    verifyAccountNumber(value);
                }
                else {
                    setParticipant({...participant, [name]: value});
                    setParticipantError({...participantError, [name]: null});
                }
            }
            else {
                let errorMessage = required && isEmpty ? `${refineName} is required` : null;
                if (!isValidInput) {
                    errorMessage = `${refineName} is invalid`;
                }
                setParticipantError({...participantError, [name]: errorMessage})
            }
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

    const customCancelButton = () => {
        if(!loading){
            return <button onClick={props.closeModal} className="secondary-button">Close</button>
        }
        else{
            return(
                <div/>
            )
        }
    }
    return(
        <div>
        {chargeFormView()}
        </div>
    )
}
