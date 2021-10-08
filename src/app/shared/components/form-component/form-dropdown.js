import './custom-form.css'
import {Dropdown} from "primereact/dropdown";

export function FormDropdown(props){
    const showError = () =>{
        if(props.error && props.required){
            return <p className="p-error p-text-left">{props.error}</p>
        }
        else <small/>
    }
    return(
        <div>
            <Dropdown className={props.error?'validation-error':''} optionLabel={props.label} disabled={props.loading} value={props.value} options={props.options} onChange={(e) => props.fn(e,props.field)} placeholder={props.placeholder}/>
            {showError()}
        </div>
    )
}
