import {Icon} from "../../icons/icon";

export function CustomMessage (props){
    switch (props.messageType){
        case 'success':
            return(
                <div>
                  <Icon icon="success-message"/>
                </div>
            )
    }
}
