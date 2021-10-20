import {Icon}   from "../../icons/icon";
import React    from "react";
import {Dialog} from "primereact/dialog";

export function CustomModal(props){

   const header = (
       <div className="log-icon-top-container-modal">
           <div className="login-icon-position">
               <Icon icon="logo"/>
           </div>
       </div>
    )
    return(
        <div>
            <Dialog header={header}  blockScroll={true} closable={false} position="top" showHeader={true} visible={props.visible} onHide={props.onHide()}
                    breakpoints={{'960px': '75vw', '640px': '100vw'}}>
                <div className="custom-modal-content">
                    <div className="custom-modal-item">
                    {props.modalContent()}
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
