
import {useEffect, useState} from "react";
import {CustomLoader}                from "../../shared/components/custom-loader/custom-loader";
import {FormInput}           from "../../shared/components/form-component/form-input";
import {SERVICES}            from "../../core/services/services";
import {CustomToast}         from "../../shared/components/alert/custom-toast";
import {CUSTOM_VALIDATION}   from "../../shared/validation/validation";
import {FormDropdown}        from "../../shared/components/form-component/form-dropdown";
import {CustomMessage}       from "../../shared/components/alert/custom-message";

export function CustomChargeTypeModel(props){
    const [loading,setLoading] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [messageTitle,setMessageTitle] = useState(null);
    const [message,setMessage] = useState(null);
    const [chargeTypeCode,setChargeTypeCode] = useState('FLAT');
    const [validForm,setValidForm] = useState(false);
    const [successMessage,setSuccessMessage] = useState('')
    const [chargeTypeModel,setChargeTypeModel] = useState(
        {
            chargeCode: null,
            chargeName: null,
            chargeType: null,
            chargeTypeDesc: null,
            maxCap: null,
            flat:null,
            minCap: null,
            percent: null
        }
    )

    const [chargeTypeErrorModel,setChargeTypeErrorModel] = useState(
        {
            chargeCode: null,
            chargeName: null,
            chargeType: null,
            chargeTypeDesc: null,
            flat:null,
            maxCap: null,
            minCap: null,
            percent: null
        }
    )
    const [chargeTypes,setChargeTypes] = useState([])

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



    useEffect(() => {
            let mounted = true
            if(mounted) {
                getChargeTypes();
            }
            return () => {
                mounted = false;
            }
        },[]
    );

    function getChargeTypes(){
        SERVICES.GET_CHARGE_TYPE()
            .then(data=>{
                setChargeTypes(data.result);
                if(props.isUpdate) {
                    data?.result?.forEach(e => {
                        if (e.code === props?.editChargeType?.chargeType) {
                            setChargeTypeModel({...props.editChargeType,chargeType: e});
                        }
                    })
                }
                else{
                    data?.result?.forEach(e => {
                        if ( e.code === 'FLAT') {//initialize
                            setChargeTypeModel({...chargeTypeModel,chargeType:e});
                            setChargeTypeCode('FLAT');
                        }
                    })
                }
            })
            .catch(error=>{

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
        },[chargeTypeModel,chargeTypeErrorModel]
    );

    useEffect(() => {
            let mounted = true
            if(mounted) {
                resetChargeTypeForm();
            }
            return () => {
                mounted = false;
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[chargeTypeModel['chargeType']]
    );

    function resetChargeTypeForm (){
        setChargeTypeModel({...chargeTypeModel,minCap:null,maxCap:null,flat:null,percent:null});
        setChargeTypeErrorModel({...chargeTypeErrorModel,minCap:null,maxCap:null,flat:null,percent:null});
        document.getElementById('minCap').value = '';
        document.getElementById('maxCap').value = '';
        document.getElementById('flat').value = '';
        document.getElementById('percent').value = '';
    }

    function checkValidForm(){
        const validChargeType = validateChargeTypeField(chargeTypeCode);
        const validRequiredInputs = validateChargeTypeField('');
        const validErrorForm = !CUSTOM_VALIDATION.VALID_OBJ_ANY(chargeTypeErrorModel);
        setValidForm(validChargeType && validRequiredInputs && validErrorForm);
    }

    function validateChargeTypeField(chargeType){
        switch (chargeType){
            case 'FLAT':
            return CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['flat'], 'CASH_INPUT');
            case 'PERCENT_MAX_CAP':
            return CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['maxCap'] , 'CASH_INPUT')
                    && CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['percent'] , 'PERCENT');
            case 'PERCENT_MIN_CAP':
                return CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['minCap'] , 'CASH_INPUT')
                    && CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['percent'] , 'PERCENT');
            case 'PERCENT_MAX_MIN_CAP':
                return CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['maxCap'] , 'CASH_INPUT')
                    && CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['minCap'] , 'CASH_INPUT')
                    && CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['percent'] , 'PERCENT');
            case 'PERCENT_ALL':
              return  CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['percent'] , 'PERCENT');
             default :
            return CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['chargeCode'] , 'INPUT')
            && CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['chargeName'] , 'NAME')
            && CUSTOM_VALIDATION.BASIC_VALIDATION(chargeTypeModel['chargeTypeDesc'] , 'DESCRIPTION')
        }
    }

    function validateForm(e,name,type,refineName,required){
        let value = e?.target?.value
        if(props.isSearch){
            setChargeTypeModel({...chargeTypeModel, [name]: value});
        }
        else {
            const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
            const isValidInput = !isEmpty ? CUSTOM_VALIDATION.BASIC_VALIDATION(value, type) : false;
            if (isValidInput) {
                setChargeTypeModel({...chargeTypeModel, [name]: value});
                setChargeTypeErrorModel({...chargeTypeErrorModel, [name]: null});
            }
            else {
                let errorMessage = required && isEmpty ? `${refineName} is required` : null;
                if (!isValidInput) {
                    errorMessage = `${refineName} is invalid`;
                }
                setChargeTypeErrorModel({...chargeTypeErrorModel, [name]: errorMessage})
            }
        }
    }

    function filterSearch(){
            let payload ={}
            if(chargeTypeModel['chargeCode']){
              payload.chargeCode = chargeTypeModel['chargeCode'];
            }
           if(chargeTypeModel['chargeName']){
            payload.chargeCode = chargeTypeModel['chargeName'];
           }
            if(chargeTypeModel['chargeType']){
            payload.chargeType = chargeTypeModel['chargeType'].code;
           }

           return payload;
    }


    function updateChargeTypeModal(){
        setLoading(true);
        const payload ={
            chargeCode: chargeTypeModel['chargeCode'],
            chargeName: chargeTypeModel['chargeName'],
            chargeType: chargeTypeModel['chargeType']?.code,
            chargeTypeDesc: chargeTypeModel['chargeTypeDesc'],
            flat: chargeTypeModel['flat'],
            maxCap: chargeTypeModel['maxCap'],
            minCap: chargeTypeModel['minCap'],
            percent: chargeTypeModel['percent'],
            id:props?.editChargeType?.id
        }
        SERVICES.UPDATE_CHARGE_TYPE_MODEL(payload)
            .then(data=>{
                setMessageTitle(null)
                setSuccessMessage('Charge Model updated successfully')
                setCurrentIndex(1);
                setLoading(false);
            })
            .catch(error=>{
                setMessageTitle('Error');
                setMessage('An error occur when updating charge model');
                setLoading(false);
            })
    }


    function submit(){
        setLoading(true);
        const payload ={
            chargeCode: chargeTypeModel['chargeCode'],
            chargeName: chargeTypeModel['chargeName'],
            chargeType: chargeTypeModel['chargeType']?.code,
            chargeTypeDesc: chargeTypeModel['chargeTypeDesc'],
            flat:chargeTypeModel['flat']?parseInt(chargeTypeModel['flat']):0,
            maxCap: chargeTypeModel['maxCap']?parseInt(chargeTypeModel['maxCap']):0,
            minCap: chargeTypeModel['minCap']?parseInt(chargeTypeModel['minCap']):0,
            percent: chargeTypeModel['percent']?parseFloat(chargeTypeModel['percent']):0
        }
        SERVICES.CREATE_CHARGE_TYPE_MODEL(payload)
            .then(data=>{
              setMessageTitle(null)
              setSuccessMessage('Charge Model created successfully');
              setCurrentIndex(1);
              setLoading(false);
            })
            .catch(error=>{
                setMessageTitle('Error');
                setMessage('An error occur when creating charge model');
                setLoading(false);
            })
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
            //reset field in chargeType changes;
            setChargeTypeErrorModel({...chargeTypeErrorModel,[name]:''});
            setChargeTypeModel({...chargeTypeModel,[name]:value});
            setChargeTypeCode(value?.code);
        }
        else{
            let errorMessage = 'Select charge type';
            setChargeTypeErrorModel({...chargeTypeErrorModel, [name]: errorMessage});
        }
    }

    const customSubmitButton = () => {
        if(!loading) {
            if (props.isUpdate) {
                return <button disabled={!validForm} onClick={updateChargeTypeModal} className="primary-button">Update</button>
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
            {chargeTypeFormView()}
            </div>
            )
        }
    }

    const checkSearchView = () =>{
       if(props.isSearch){
          return (
              <>
                  <div className="p-col-12"/>
              </>
          )
       }
       else{
        return(
            <>
            <div className="p-col-12">
                <FormInput value={chargeTypeModel['chargeTypeDesc']} required={true} field="chargeTypeDesc" type="DESCRIPTION" error={chargeTypeErrorModel['chargeTypeDesc']} fn={validateForm} loading={loading}  placeholder="Charge type desc"/>
            </div>
           <div style={{display:(chargeTypeCode === 'PERCENT_MAX_CAP' || chargeTypeCode === 'PERCENT_MAX_MIN_CAP')?'block':'none'}} className="p-col-6">
               <FormInput value={chargeTypeModel['maxCap']} required={true} field="maxCap" type="CASH_INPUT" error={chargeTypeErrorModel['maxCap']} fn={validateForm} loading={loading}  placeholder="Maximum cap"/>
           </div>
           <div style={{display:(chargeTypeCode === 'PERCENT_MIN_CAP' || chargeTypeCode === 'PERCENT_MAX_MIN_CAP')?'block':'none'}} className="p-col-6">
               <FormInput value={chargeTypeModel['minCap']} required={true} field="minCap" type="CASH_INPUT" error={chargeTypeErrorModel['minCap']} fn={validateForm} loading={loading}  placeholder="Minimum cap"/>
           </div>
           <div style={{display:chargeTypeCode === 'FLAT'?'block':'none'}} className="p-col-12">
               <FormInput value={chargeTypeModel['flat']} required={true} field="flat" type="CASH_INPUT" error={chargeTypeErrorModel['flat']} fn={validateForm} loading={loading}  placeholder="Flat"/>
           </div>
            <div style={{display:(chargeTypeCode === 'PERCENT_ALL' || chargeTypeCode === 'PERCENT_MIN_CAP'||chargeTypeCode === 'PERCENT_MAX_CAP'||chargeTypeCode === 'PERCENT_MAX_MIN_CAP')?'block':'none'}}
             className={(chargeTypeCode === 'PERCENT_ALL' || chargeTypeCode === 'PERCENT_MAX_MIN_CAP') ? 'p-col-12' : 'p-col-6'}>
             <FormInput value={chargeTypeModel['percent']} required={true} field="percent" type="PERCENT"
              error={chargeTypeErrorModel['percent']} fn={validateForm} loading={loading}
              placeholder="Percentage"/>
                </div>
            </>
        )
       }
    }

    const chargeTypeFormView = () =>{
        return(
            <div>
                <div className="custom-modal-title p-text-left">
                    {props.isUpdate?'Update charge type model':(props.isSearch?'Filter':'New charge type model')}
                </div>
                <div className="custom-dialog-subtitle-container p-mb-5">
                    <p className="custom-dialog-subtitle">{props.isUpdate?'Update the form below':(props.isSearch?'':'Fill the form below to create model')}</p>
                </div>
                <div className="p-pb-1">
                    {viewAlert()}
                </div>
                <div className="p-grid">
                    <div className="p-col-12">
                        <FormDropdown required={true} label="code" field="chargeType"
                                      error={chargeTypeErrorModel['chargeType']} disabled={loading}
                                      value={chargeTypeModel['chargeType']} fn={validateDropdown}
                                      options={chargeTypes} placeholder="Select a charge type"/>
                    </div>
                    <div className={props.isSearch?'p-col-12':'p-col-6'}>
                        <FormInput value={chargeTypeModel['chargeCode']} required={true} field="chargeCode" type="INPUT" error={chargeTypeErrorModel['chargeCode']} fn={validateForm} loading={loading}  placeholder="Charge code"/>
                    </div>
                    <div className={props.isSearch?'p-col-12':'p-col-6'}>
                        <FormInput value={chargeTypeModel['chargeName']} required={true} field="chargeName" type="NAME" error={chargeTypeErrorModel['chargeName']} fn={validateForm} loading={loading}  placeholder="Charge type name"/>
                    </div>
                    {checkSearchView()}
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
