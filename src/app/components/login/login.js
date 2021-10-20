import './login.css'
import {Icon}                            from "../../shared/icons/icon";
import {useState, useContext} from "react";
import {MainContext}                     from "../../../App";
import {SERVICES}                        from "../../core/services/services";
import {CONFIG}                          from "../../shared/config/config";
import {CustomToast}                     from "../../shared/components/alert/custom-toast";
import { useHistory }                    from "react-router-dom";
import {LOCAL_STORAGE_SERVICE}           from "../../core/services/storage-service";
import {CustomLoader}                    from "../../shared/components/custom-loader/custom-loader";


export function Login(){
    let history = useHistory();
  const mainContext = useContext(MainContext);
   const [username,setUsername] = useState('');
   const [password, setPassword] = useState("");
   const [errorTitle,setErrorTitle] = useState('');
   const [errorMessage,setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [loginText,setLoginText] = useState('Log in to your account');
   const [loadingText,setLoadText] = useState('verifying credentials...');


   function persistLoginDataAndRedirect(data){
    setLoadText('Logging in...');
    setLoginText(data?.username);
    const loginData = {
        username:data?.username,
        access_token:data?.access_token,
        authorities:data.authorities,
        expires_in:data.expires_in,
        firstName:data.firstName,
        lastName:data.lastName,
        roles:data.roles,
        isAuthenticated:true,
        name:data.name,
        selectedSideNav:'Dashboard',
        selectedSideNavIndex:0
    }
    mainContext.mainDispatch({ type: "PERSIST_LOGIN_DATA", loginData: loginData });
    LOCAL_STORAGE_SERVICE.SAVE_USER_CREDENTIAL(loginData);
    history.push("/dashboard");

   }

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function submit(){
       setLoading(true);
        const params ={
            username:username,
            password:password,
            grant_type:CONFIG.GRANT_TYPE,
            authenticationDomain:CONFIG.AUTHENTICATION_DOMAIN
        }

        SERVICES.LOGIN(params)
            .then(data=>{
              persistLoginDataAndRedirect(data?.result);
              setLoading(false);
            })
            .catch(error=>{
                const errorData = error?.data;
                if(errorData){
                      setErrorTitle(errorData.result?.error);
                      setErrorMessage(errorData.result?.error_description);
                }
                setLoading(false);
            })
    }

   return (
       <div>

           <div className="login-alert-container">
               {errorTitle?
                   (
                   <CustomToast title={errorTitle} description={errorMessage} type="error"/>
                   )
                   :
                   (
                    <div/>
                   )
               }
           </div>

           <div className="login-container">
               <div className="log-icon-top-container">
                   <div className="login-icon-position">
                   <Icon icon="logo"/>
                   </div>
               </div>
               <div className="login-card">
                <div className="login-text-container">
                  <p className="login-greeting">Welcome!</p>
                  <p className="login-note">{loginText}</p>
                </div>
                   <div className="login-form-container">
                       <div>
                           <div>
                               <input disabled={loading} onChange={handleUsernameChange} placeholder="Username"  type="text"/>
                           </div>
                           <div>
                               <div className="p-mt-4">
                               <input disabled={loading} onChange={handlePasswordChange} placeholder="Password"  type="password"/>
                               </div>
                               </div>
                           <div>
                               <div className="p-mt-5">
                                   {!loading?
                                       (<div>
                                           <button onClick={submit} className="primary-button">Submit</button>
                                       </div>)
                                       :
                                       (<div>
                                        <CustomLoader loadingText={loadingText}/>
                                       {/*<span><span className="loading-icon"> <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="4"/></span><span className="verifying-credentials">{loadingText}</span> </span>*/}
                                       </div>)
                                   }
                               </div>
                           </div>
                           <div>
                               <div className="forget-password-container">
                                   {!loading?
                                       (
                                       <span className="forget-password-note custom-font-family">Can't remember my password<span
                                           className="forget-password-link">Help!</span></span>
                                       )
                                       :
                                       (
                                           <div/>
                                       )
                                   }
                                   </div>
                           </div>
                       </div>
                   </div>
               </div>

           </div>

       </div>
   )
}
