import './custom-form.css'
import moment            from "moment";
import {ProgressSpinner} from "primereact/progressspinner";


export function FormInput (props){
    const showError = () =>{
        if(props.error && props.required){
            return <p className="p-error p-text-left">{props.error}</p>
        }
        else return <small/>
    }

    const showVerified = () =>{
        if(!props.error && props.verified && !props?.verifying){
            return <p className="p-success p-text-left">{props.verified}</p>
        }
        else return <small/>
    }

    const verifyingAccountNumber = () =>{
        if(!props.error && props?.verifying){
            return <div className="p-text-left p-mt-1"><span className="p-success">Verifying {props.verifyingField || props.field} ...  <ProgressSpinner style={{width: '15px', height: '15px',marginLeft:'.1em',position:'relative',top:'.35em'}} strokeWidth="5" animationDuration=".5s"/></span></div>
        }
        else return <small/>
    }

    const today = moment().format('YYYY-MM-DD');

    const inputView = () =>{
        if(props.inputType && props.inputType === 'date'){
            return(
                <div className="p-mt-1">
                    <input  className={props.error?'validation-error':''} disabled={props.loading} onChange={(e)=>props.fn(e,props.field,props.type,props.placeholder,props.required)} type="date" id={props.field} placeholder={props.placeholder} name={props.field}
                           value={props.value}
                            max={today}/>
                    {showError()}
                    {showVerified()}
                    {verifyingAccountNumber()}
              </div>
            )
        }
        else{
          return (
              <div className="p-mt-1">
                  <input id={props.field} name={props.field} defaultValue={props.value} className={props.error?'validation-error':''}  disabled={props.loading} onChange={(e)=>props.fn(e,props.field,props.type,props.placeholder,props.required)}   placeholder={props.placeholder}  type={props?.inputType?props?.inputType:'text'}/>
                  {showError()}
                  {showVerified()}
                  {verifyingAccountNumber()}
              </div>
          )
        }
    }

    return (
        <div>
            {inputView()}
        </div>
    )
}
