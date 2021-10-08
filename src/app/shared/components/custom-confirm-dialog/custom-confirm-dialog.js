import './custom-confirm-dialog.css'
import {CustomLoader}    from "../custom-loader/custom-loader";


export function CustomConfirmDialog(props){
    const cancelButton = () =>{
     if(props.loading){
       return <div/>
     }
     else{
       return <button onClick={props.closeModal} className="secondary-button">No</button>
     }
    }

    const submitButton = () =>{
        if(props.loading){
            return (
                <div>
                    <CustomLoader loadingText={props.loadingText}/>
                </div>
            )
        }
        else{
            return <button onClick={()=>props.fn(props.itemId)} className="primary-button">Yes</button>
        }
    }

    return(
        <div>
            <div className="p-pb-1">
                <p className="confirm-text"> {props.confirmText} </p>
            </div>
            <div className="p-mt-6">
                <div className="p-grid">
                   <div className={props.loading?'p-col-12':'p-col-6'}>
                       {cancelButton()}
                   </div>
                    <div className={props.loading?'p-col-12':'p-col-6'}>
                        {submitButton()}
                    </div>
                </div>
            </div>
        </div>
    )
}
