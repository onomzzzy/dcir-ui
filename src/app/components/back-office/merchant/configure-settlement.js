
import {useEffect, useState} from "react";
import {ProgressSpinner}   from "primereact/progressspinner";
import {SERVICES}          from "../../../core/services/services";
import {FormInput}         from "../../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION} from "../../../shared/validation/validation";
import {FormDropdown}      from "../../../shared/components/form-component/form-dropdown";
import {FormMultiselect}   from "../../../shared/components/form-component/form-multiselect";
import {CustomMessage}     from "../../../shared/components/alert/custom-message";
import {HELPER}            from "../../../shared/helper/helper";


export function ConfigureSettlement(props){
    const [loading,setLoading] = useState(false);
    const [settlementTypes,setSettlementTypes] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [successMessage,setSuccessMessage] = useState(null);
    const [participants,setParticipates] = useState([])
    const [validForm,setValidForm] = useState(false)
    const [chargeTypes,setChargeTypes] = useState([])
    const [accountName,setAccountName] = useState(null);
    const [verifyingAccountNumber,setVerifyingAccountNumber] = useState(false)
    const [settlementInfo,setSettlementInfo] = useState(
        {
            accountName: null,
            accountNumber: null,
            chargeType: null,
            participants: null,
            settlementType: null
        }
    )
    const [settlementErrorForm,setSettlementErrorForm] = useState({
        accountName: null,
        accountNumber: null,
        chargeType: 'Select a charge type',
        participants: 'Select participants',
        settlementType: 'Select a settlement type'
    })


    useEffect(() => {
            let mounted = true
            if(mounted) {
                prefillForm();
                getSettlementType();
                getSettlementParticipantGlobal();
                getChargeTypes();
            }
            return () => {
                mounted = false;
            }
        },[]
    );


    function prefillForm(){
            setSettlementErrorForm(props.settlementErrorInfo);
            setSettlementInfo(props.settlementInfo);
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                validateForm()
            }
            return () => {
                mounted = false;
            }
        },[settlementInfo]
    );

    function validateForm(){
        const validForm = CUSTOM_VALIDATION.VALID_OBJ(settlementInfo,props.isUpdate?6:5);
        const validErrorForm = CUSTOM_VALIDATION.VALID_OBJ_ANY(settlementErrorForm);
        setValidForm(validForm && !validErrorForm);
    }


    function validateDropdown(e,name){
        const value = e.target.value
            if(value){
                setSettlementErrorForm({...settlementErrorForm,[name]:''});
                setSettlementInfo({...settlementInfo,[name]:value});
            }
            else{
                let errorMessage = 'Select charge type';
                if(name === 'settlementType') {
                    errorMessage = 'Select settlement type';
                }
                setSettlementErrorForm({...settlementErrorForm, [name]: errorMessage});
            }
    }

    function validateMultipleSelect(e,name){
        const value = e.target.value
        if(value.length){
            setSettlementErrorForm({...settlementErrorForm,[name]:''});
            setSettlementInfo({...settlementInfo,[name]:value});
        }
        else{
            let errorMessage = 'Select participants';
            setSettlementInfo({...settlementInfo,[name]:null});
            setSettlementErrorForm({...settlementErrorForm, [name]: errorMessage});
        }
    }

    function verifyAccountNumber(accNo){
        setVerifyingAccountNumber(true);
        setAccountName(null);
        setSettlementErrorForm({...settlementErrorForm, accountNumber:null});
        SERVICES.VERIFY_ACCOUNT_NUMBER(accNo)
            .then(data=>{
                setSettlementInfo({...settlementInfo, accountNumber: accNo});
                setAccountName(data?.result?.accountName);
                setVerifyingAccountNumber(false);
            })
            .catch(error=>{
                setSettlementErrorForm({...settlementErrorForm, accountNumber: HELPER.PROCESS_ERROR(error)});
                setVerifyingAccountNumber(false);
            })
    }


    function fillForm (e,name,type,refineName,required){
        const value = e.target.value
        const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
        const isValidInput = !isEmpty? CUSTOM_VALIDATION.BASIC_VALIDATION(value,type):false;
        if(isValidInput){
            if(name === 'accountNumber'){
                verifyAccountNumber(value);
            }
            else {
                setSettlementInfo({...settlementInfo, [name]: value});
                setSettlementErrorForm({...settlementErrorForm, [name]: null});
            }
        }
        else {
            let errorMessage = required && isEmpty? `${refineName} is required`:null;
            if(!isValidInput){
                errorMessage = `${refineName} is invalid`;
            }

            setSettlementErrorForm({...settlementErrorForm,[name]:errorMessage});
        }
    }


    function getSettlementType(){
     SERVICES.GET_SETTLEMENT_TYPE()
         .then(data=>{
             let arr = []
             data.result.forEach(e=>{
                arr.push({decs:e,code:e});
             })
          setSettlementTypes(arr);
         })
         .catch(error=>{

         })
    }

    function getSettlementParticipantGlobal(){
        const params = HELPER.TO_URL_STRING({
            page:0,
            size:10,
            global:true
        })
     SERVICES.GET_SETTLEMENT_PARTICIPANT_GLOBAL(params)
         .then(data=>{
             let arr = []
             data.result.content.forEach(e=>{
                arr.push({desc:e.participantId,code:e.name,id:e.participantId})
             })
            setParticipates(arr)
         })
         .catch(error=>{

         })
    }


    function getChargeTypes(){
      SERVICES.GET_CHARGE_MODELS()
          .then(data=>{
              let arr = []
              data?.result?.forEach(e=>{
                 arr.push({desc:e.chargeTypeName,code:e.code});
              })
            setChargeTypes(arr);
          })
          .catch(error =>{
           
          })
    }
    function submit(){
        setLoading(true);
        let participants = []
        let settlementInformation = {...settlementInfo}
        if(Array.isArray(settlementInformation.participants))
         settlementInformation.participants.forEach(e=>{
          participants.push(e.id);
        })
        settlementInformation = {...settlementInformation,participants:participants,
            settlementType:settlementInformation?.settlementType?.code
            ,chargeType:settlementInformation?.chargeType?.code};
        const payload = {
            basicInfo:props.basicInfo,
            settlementInfo:settlementInformation
        }
        SERVICES.CREATE_MERCHANT(payload)
            .then(data=>{
              props.callAlert(null,HELPER.PROCESS_ERROR(''));
              console.log('Merchant created successfully',data)
              setSuccessMessage('Merchant created successfully');
              props.offTitle();
              setCurrentIndex(1)
              setLoading(false);
            })
            .catch(error=>{
              props.callAlert('Error',HELPER.PROCESS_ERROR(error));
              setLoading(false);
            })
    }



    const customBackButton = () => {
        if(!loading){
            return <button onClick={()=> {
                props.settlementFn(settlementInfo,settlementErrorForm)
                props.fn(0)
            }
            } className="secondary-button">Back</button>
        }
        else{
            return(
                <div/>
            )
        }
    }

    const buttonView = () =>{
        if(props.isUpdate){
            return <button disabled={!validForm} onClick={submit} className="primary-button">Update</button>
        }
        else{
            return <button disabled={!validForm} onClick={submit} className="primary-button">Submit</button>
        }
    }

    const customButton = () => {
        if(!loading){
            return(
            <div>
            {buttonView()}
            </div>
            )
        }
        else{
            return(
                <div>
            <span><span className="loading-icon"> <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="4"/></span>
            <span className="verifying-credentials">submitting...</span></span>
                </div>
            )
        }
    }


    const pageForm = () =>{
        if(currentIndex){
            return (
                <div>
                <CustomMessage close={true}  closeModal={props.closeModal} message={successMessage} messageType="success"/>
                </div>
            )
        }
        else {
            return (
                <div className="p-grid">
                    <div className="p-col-12">
                        <div className="p-mt-1">
                            <FormDropdown required={true} label="code" field="settlementType"
                                          error={settlementErrorForm['settlementType']} disabled={loading}
                                          value={settlementInfo['settlementType']} fn={validateDropdown}
                                          options={settlementTypes} placeholder="Select a Settlement type"/>
                        </div>
                    </div>
                    <div className="p-col-6">
                        <div className="p-mt-2">
                            <FormInput verifyingField="account no" verifying={verifyingAccountNumber} verified={accountName} value={settlementInfo['accountNumber']} required={true} field="accountNumber"
                                       type="NUBAN" error={settlementErrorForm['accountNumber']} fn={fillForm}
                                       loading={loading} placeholder="Account number"/>
                        </div>
                    </div>
                    <div className="p-col-6">
                        <div className="p-mt-2">
                            <FormInput value={settlementInfo['accountName']} required={true} field="accountName"
                                       type="NAME" error={settlementErrorForm['accountName']} fn={fillForm}
                                       loading={loading} placeholder="Account name"/>
                        </div>
                    </div>
                    <div className="p-col-6">
                        <div className="p-mt-2">
                            <FormDropdown required={true} field="chargeType" error={settlementErrorForm['chargeType']}
                                          disabled={loading} label="desc" value={settlementInfo['chargeType']}
                                          fn={validateDropdown} options={chargeTypes}
                                          placeholder="Select a charge type"/>
                        </div>
                    </div>
                    <div className="p-col-6">
                        <div className="p-mt-2">
                            <FormMultiselect required={true} error={settlementErrorForm["participants"]}
                                             field="participants" label="code" value={settlementInfo["participants"]}
                                             options={participants} fn={validateMultipleSelect}
                                             placeholder="Select participants"/>
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-mt-5">
                            <div className="p-grid">
                                <div className={loading ? 'p-col-12' : 'p-col-6'}>
                                    {customBackButton()}
                                </div>
                                <div className={loading ? 'p-col-12' : 'p-col-6'}>
                                    {customButton()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return(
        <div>
            {pageForm()}
        </div>
    )
}
