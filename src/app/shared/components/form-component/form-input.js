import './custom-form.css'
import moment from "moment";


export function FormInput (props){
    const showError = () =>{
        if(props.error && props.required){
            return <p className="p-error p-text-left">{props.error}</p>
        }
        else <small/>
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
              </div>
            )
        }
        else{
          return (
              <div className="p-mt-1">
                  <input id={props.field} name={props.field} defaultValue={props.value} className={props.error?'validation-error':''}  disabled={props.loading} onChange={(e)=>props.fn(e,props.field,props.type,props.placeholder,props.required)}   placeholder={props.placeholder}  type={props?.inputType?props?.inputType:'text'}/>
                  {showError()}
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
