import './custom-form.css'


export function FormTextArea (props){
    const showError = () =>{
        if(props.error && props.required){
            return <p className="p-error p-text-left">{props.error}</p>
        }
        else <small/>
    }
    return (
        <div className=" p-mt-1">
            <textarea defaultValue={props.value} className={props.error?'validation-error':''}  disabled={props.loading} onChange={(e)=>props.fn(e,props.field,props.type,props.placeholder,props.required)}   placeholder={props.placeholder}/>
            {showError()}
        </div>
    )
}
