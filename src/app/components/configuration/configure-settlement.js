
import {useContext, useEffect, useState} from "react";
import {ProgressSpinner}                 from "primereact/progressspinner";
import {SERVICES}                        from "../../core/services/services";
import {FormInput}                       from "../../shared/components/form-component/form-input";
import {CUSTOM_VALIDATION}               from "../../shared/validation/validation";
import {FormDropdown}                    from "../../shared/components/form-component/form-dropdown";
import {FormMultiselect}                 from "../../shared/components/form-component/form-multiselect";
import {CustomMessage}                   from "../../shared/components/alert/custom-message";


export function ConfigureSettlement(props){
    const [loading,setLoading] = useState(false);
    const [settlementTypes,setSettlementTypes] = useState([]);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [successMessage,setSuccessMessage] = useState(null);
    const [participants,setParticipates] = useState([])
    const [validForm,setValidForm] = useState(false)
    const [chargeTypes,setChargeTypes] = useState([])
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
                // getSettlementParticipantNonGlobal();
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
        console.log(' validForm validErrorForm', validForm,validErrorForm,settlementInfo,settlementErrorForm)
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


    function fillForm (e,name,type,refineName,required){
        const value = e.target.value
        const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
        const isValidInput = !isEmpty? CUSTOM_VALIDATION.BASIC_VALIDATION(value,type):false;
        if(isValidInput){
            setSettlementInfo({...settlementInfo,[name]:value});
            setSettlementErrorForm({...settlementErrorForm,[name]:null});
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
     SERVICES.GET_SETTLEMENT_PARTICIPANT_GLOBAL()
         .then(data=>{
             let arr = []
             data.content.forEach(e=>{
                arr.push({desc:e.participantId,code:e.name})
             })
            setParticipates(arr)
         })
         .catch(error=>{

         })
    }

    function getSettlementParticipantNonGlobal(){
        SERVICES.GET_SETTLEMENT_PARTICIPANT_NON_GLOBAL()
            .then(data=>{

            })
            .catch(error=>{

            })
    }

    function getChargeTypes(){
      SERVICES.GET_CHARGE_TYPE()
          .then(data=>{
            setChargeTypes(data.result)
          })
          .catch(error =>{
           
          })
    }

    function upDateMerchant(){
        setLoading(true);
        let participants = []
        if(Array.isArray(settlementInfo.participants))
            settlementInfo.participants.forEach(e=>{
                participants.push(e.desc);
            })
        setSettlementInfo({...settlementInfo,'participants':participants});
        const payload = {
            basicInfo:props.basicInfo,
            id:props.merchantId,
            settlementInfo:settlementInfo
        }
        SERVICES.UPDATE_PARTICIPANT(payload)
            .then(data=>{
                setSuccessMessage('Merchant updated successfully');
                setCurrentIndex(1)
                setLoading(false);
            })
            .catch(error=>{
                props.callAlert(error.error,error.error_description);
                setLoading(false);
            })
    }

    function submit(){
        setLoading(true);
        let participants = []
        if(Array.isArray(settlementInfo.participants))
        settlementInfo.participants.forEach(e=>{
          participants.push(e.desc);
        })
        setSettlementInfo({...settlementInfo,'participants':participants});
        const payload = {
            basicInfo:props.basicInfo,
            settlementInfo:settlementInfo
        }
        SERVICES.CREATE_MERCHANT(payload)
            .then(data=>{
              setSuccessMessage('Merchant created successfully');
              setCurrentIndex(1)
              setLoading(false);
            })
            .catch(error=>{
              props.callAlert(error.error,error.error_description);
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
                <CustomMessage messageType="success"/>
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
                    <div className="p-col-12">
                        <div className="p-mt-1">
                            <FormInput value={settlementInfo['accountNumber']} required={true} field="accountNumber"
                                       type="NUBAN" error={settlementErrorForm['accountNumber']} fn={fillForm}
                                       loading={loading} placeholder="Account number"/>
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-mt-2">
                            <FormInput value={settlementInfo['accountName']} required={true} field="accountName"
                                       type="NAME" error={settlementErrorForm['accountName']} fn={fillForm}
                                       loading={loading} placeholder="Account name"/>
                        </div>
                    </div>
                    <div className="p-col-12">
                        <div className="p-mt-2">
                            <FormDropdown required={true} field="chargeType" error={settlementErrorForm['chargeType']}
                                          disabled={loading} label="code" value={settlementInfo['chargeType']}
                                          fn={validateDropdown} options={chargeTypes}
                                          placeholder="Select a charge type"/>
                        </div>
                    </div>
                    <div className="p-col-12">
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
