import {Icon} from "../../icons/icon";

export function CustomMessage (props){

    switch (props.messageType){
        case 'success':
            return(
                <div>
                  <div className="p-mt-2">
                  <Icon icon="success-message"/>
                  </div>
                    <div className="p-mt-2 p-pb-1" style={{display:props.message?'block':'none'}}>
                        <p className="success-message-text">{props?.message}</p>
                    </div>
                    <div style={{display:props.close?'block':'none'}} className="p-mt-2 p-pb-1">
                        <p onClick={()=>props.closeModal(true)} className="close-modal add-cursor">Close</p>
                    </div>
                </div>
            )
    }
}
