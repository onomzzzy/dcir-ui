import './custom-toast.css'
import {Icon} from "../../icons/icon";

export function CustomToast(props){

    switch (props.type){
        case 'error':
        return(
            <div className="error-toast-container">
             <div className="error-toast">
               <div className="p-grid">
                   <div className="p-col-2">
                     <div className="icon-container">
                         <Icon icon="circular-cancel"/>
                     </div>
                   </div>
                   <div className="p-col-8">
                    <div className="error-toast-text-container">
                        <p className="error-toast-text-title">{props.title}</p>
                        <p className="error-toast-text-note"  dangerouslySetInnerHTML={ {__html: props.description} }/>
                    </div>
                   </div>
                   <div className="p-col-2">
                       {props?.closable?
                           (
                           <div className="icon-container-cancel">
                               <Icon icon="cancel"/>
                           </div>
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
        )
        case 'success':
            return(
                <div className="error-toast-container">
                    <div className="success-toast">
                        <div className="p-grid">
                            <div className="p-col-2">
                                <div className="icon-container-success">
                                    <Icon icon="circular-success"/>
                                </div>
                            </div>
                            <div className="p-col-8">
                                <div className="error-toast-text-container">
                                    <p className="success-toast-text-title">{props.title}</p>
                                    <p className="error-toast-text-note">{props.description}</p>
                                </div>
                            </div>
                            <div className="p-col-2">
                                <div className="icon-container-cancel">
                                    <Icon icon="cancel-success" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }

}
