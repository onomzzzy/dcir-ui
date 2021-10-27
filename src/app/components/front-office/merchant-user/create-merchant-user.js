
import {useEffect, useState} from "react";
import {CustomToast}         from "../../../shared/components/alert/custom-toast";
import {SERVICES}            from "../../../core/services/services";
import {HELPER}              from "../../../shared/helper/helper";
import {CUSTOM_VALIDATION}   from "../../../shared/validation/validation";
import {CustomLoader}        from "../../../shared/components/custom-loader/custom-loader";
import {FormInput}           from "../../../shared/components/form-component/form-input";
import {CustomMessage}       from "../../../shared/components/alert/custom-message";
import {FormDropdown}        from "../../../shared/components/form-component/form-dropdown";


export function CreateMerchantUser(props){
    const [loading,setLoading] = useState(false);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [messageTitle,setMessageTitle] = useState(null);
    const [message,setMessage] = useState(null);
    const [validForm,setValidForm] = useState(false);
    const [successMessage,setSuccessMessage] = useState('')
    const [merchantUser,setMerchantUser] = useState(
        {
            firstname: null,
            lastname: null,
            email: null,
            merchantId: null,
            name: null,
            role: null,
        }
    )
    const [merchantUserError,setMerchantUserError] = useState(
        {
            firstname: null,
            lastname: null,
            email: null,
            merchantId: null,
            name: null,
            role: null,
        }
    )
    const [merchants,setMerchants] = useState([])
    const [roles,setRoles] = useState([])

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
                getMerchantUserRoles()
                getMerchants();
            }
            return () => {
                mounted = false;
            }
        },[]
    );

    function getMerchantUserRoles(){
        SERVICES.GET_FRONT_OFFICE_MERCHANT_ROLES()
            .then(data=>{
                let arr = []
              data?.result?.forEach(e=>{
                 arr.push({desc:e,code:e});
              })
                setRoles(arr);
            })
            .catch(error=>{
             console.log(' error ',error);
            })
    }

    function getMerchants(){
        const params = HELPER.TO_URL_STRING({
            page:0,
            size:10
        })
        SERVICES.GET_MERCHANTS(params)
            .then(data=>{
                const result = data.result.content
                let arr = [];
                result.forEach(e=>{
                   if(props.merchantId === e.merchantId)
                {
                    arr.push({desc: e?.merchantName, code: e?.merchantName, id: e.merchantId});
                }
                })
                setMerchants(arr);
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
        },[merchantUser,merchantUserError]
    );


    function checkValidForm(){
        const validForm = CUSTOM_VALIDATION.VALID_OBJ(merchantUser,6);
        const validErrorForm = !CUSTOM_VALIDATION.VALID_OBJ_ANY(merchantUserError);
        setValidForm(validForm && validErrorForm);
    }

    function validateForm(e,name,type,refineName,required){
        let value = e?.target?.value
        if(props.isSearch){
            setMerchantUser({...merchantUser, [name]: value});
        }
        else {
            const isEmpty = CUSTOM_VALIDATION.IS_EMPTY(value);
            const isValidInput = !isEmpty ? CUSTOM_VALIDATION.BASIC_VALIDATION(value, type) : false;
            if (isValidInput) {
                setMerchantUser({...merchantUser, [name]: value});
                setMerchantUserError({...merchantUserError, [name]: null});
            }
            else {
                let errorMessage = required && isEmpty ? `${refineName} is required` : null;
                if (!isValidInput) {
                    errorMessage = `${refineName} is invalid`;
                }
                setMerchantUserError({...merchantUserError, [name]: errorMessage})
            }
        }
    }

    function filterSearch(){
        let payload ={}

        if(merchantUser['firstname']){
            payload.chargeCode = merchantUser['firstname'];
        }
        if(merchantUser['lastname']){
            payload.chargeCode = merchantUser['lastname'];
        }
        if(merchantUser['email']){
            payload.chargeType = merchantUser['email'];
        }
        if(merchantUser['merchantId']){
            payload.chargeType = merchantUser['merchantId']?.id;
        }
        if(merchantUser['role']){
            payload.chargeType = merchantUser['role'];
        }

        return payload;
    }


    function updateChargeTypeModal(){

    }

    /*
 private String firstname;
private String lastname;
private String email;
private String merchantId;
private String name;
private String role;
 */
    function submit(){
        setLoading(true);
        const payload ={
            firstname: merchantUser['firstname'],
            lastname: merchantUser['lastname'],
            email: merchantUser['email'],
            name: merchantUser['name'],
            role:merchantUser['role']?.code,
            merchantId: merchantUser['merchantId']?.id
        }
        SERVICES.CREATE_FRONT_OFFICE_MERCHANT_USER(payload)
            .then(data=>{
                console.log('Merchant user created successfully',data);
                setMessageTitle(null)
                setSuccessMessage('Merchant user created successfully');
                setCurrentIndex(1);
                setLoading(false);
            })
            .catch(error=>{
                setMessageTitle('Error');
                setMessage(HELPER.PROCESS_ERROR(error));
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
            setMerchantUserError({...merchantUserError,[name]:''});
            setMerchantUser({...merchantUser,[name]:value});
        }
        else{
            let errorMessage = 'Select Merchant';
            setMerchantUserError({...merchantUserError, [name]: errorMessage});
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
                <div className="pull-up-element-2 p-mt-3">
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
                        <CustomMessage closeModal={props.closeModal} close={true} message={successMessage} messageType="success"/>
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
                    <div className="p-col-6">
                        <FormInput value={merchantUser['name']} required={true} field="name" type="NAME" error={merchantUserError['name']} fn={validateForm} loading={loading}  placeholder="Name"/>
                    </div>
                </>
            )
        }
    }

    const titleView = () =>{
        if(props.isSearch){
            return 'Filter';
        }
        else if(props.isUpdate){
           return 'Update merchant user'
        }
        else{
           return 'New merchant user';
        }
    }


    const subTitleView = () =>{
        if(props.isSearch){
            return '';
        }
        else if(props.isUpdate){
            return 'Update the form below'
        }
        else{
            return 'Fill the form below to create merchant user';
        }
    }

    const chargeTypeFormView = () =>{
        return(
            <div>
                <div className="custom-modal-title p-text-left">
                    {titleView()}
                </div>
                <div className="custom-dialog-subtitle-container p-mb-5">
                    <p className="custom-dialog-subtitle">{subTitleView()}</p>
                </div>
                <div className="p-pb-1">
                    {viewAlert()}
                </div>
                <div className="p-grid">
                    <div className="p-col-12">
                        <FormDropdown required={true} label="code" field="role"
                        error={merchantUserError['role']} disabled={loading}
                        value={merchantUser['role']} fn={validateDropdown}
                        options={roles} placeholder="Select a role"/>
                    </div>
                    <div className="p-col-12">
                     <FormDropdown required={true} label="code" field="merchantId"
                   error={merchantUserError['merchantId']} disabled={loading}
                   value={merchantUser['merchantId']} fn={validateDropdown}
                   options={merchants} placeholder="Select a Merchant"/>
                    </div>
                    <div className={props.isSearch?'p-col-12':'p-col-6'}>
                        <FormInput value={merchantUser['firstname']} required={true} field="firstname" type="NAME" error={merchantUserError['firstname']} fn={validateForm} loading={loading}  placeholder="First Name"/>
                    </div>
                    <div className={props.isSearch?'p-col-12':'p-col-6'}>
                        <FormInput value={merchantUser['lastname']} required={true} field="lastname" type="NAME" error={merchantUserError['lastname']} fn={validateForm} loading={loading}  placeholder="Last Name"/>
                    </div>
                    <div className={props.isSearch?'p-col-12':'p-col-6'}>
                        <FormInput value={merchantUser['email']} required={true} field="email" type="EMAIL" error={merchantUserError['email']} fn={validateForm} loading={loading}  placeholder="Email"/>
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
