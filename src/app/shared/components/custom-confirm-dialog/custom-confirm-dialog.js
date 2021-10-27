import './custom-confirm-dialog.css'
import {CustomLoader}  from "../custom-loader/custom-loader";
import {CustomToast}   from "../alert/custom-toast";
import {CustomMessage} from "../alert/custom-message";


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

    const currentView = () =>{
        if(props?.success){
            return(
                <div className="p-mt-2 p-pb-1">
                    <CustomMessage messageType="success" message={props.success}/>
                    <div className="p-mt-2 p-pb-1">
                        <p onClick={props.closeModal} className="close-modal add-cursor">Close</p>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div>
                    <div className="p-pb-1">
                        <p className="confirm-text"> {props.confirmText} </p>
                    </div>
                    <div style={{display:props.toastError?'block':'none'}} className="p-mt-1">
                        <CustomToast title="Error" description={props.toastError} type="error"/>
                    </div>
                    <div className="p-mt-6 p-pb-1">
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
    }

    return(
      <div>
          {currentView()}
      </div>
    )
}
