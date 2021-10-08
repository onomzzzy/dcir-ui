import './custom-form.css'
import {MultiSelect} from "primereact/multiselect";


export function FormMultiselect(props){
    const showError = () =>{
        if(props.error && props.required){
            return <p className="p-error p-text-left">{props.error}</p>
        }
        else <small/>
    }
    return(
        <div>
            <MultiSelect  className={props.error?'validation-error':''} optionLabel={props.label} value={props.value} options={props.options} onChange={(e) => props.fn(e,props.field)}  placeholder={props.placeholder} display="chip" />
            {showError()}
        </div>
    )
}
