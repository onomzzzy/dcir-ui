import './custom-breadcrumb.css'
import {Icon}       from "../../icons/icon";
import {useHistory} from "react-router-dom";

export function CustomBreadcrumb(props){
    let history = useHistory();
    function navigate(){
        console.log('here n')
        history.push("/")
    }

    return(
        <div className="p-text-left custom-breadcrumb-container">
            <div className="p-grid">
             <div className="p-col-3" onClick={navigate}><div className="custom-breadcrumb-text">Dashboard</div></div>
             <div className="p-col-1">
             <div className="breadcrumb-position">
             <Icon icon="breadcrumb-icon"/>
             </div>
             </div>
                <div className="p-col-8"><div className="custom-breadcrumb-text-active">{props.page}</div></div>
            </div>
        </div>
    )
//         <div className="p-text-left">
//         <div className="p-grid custom-breadcrumb-text add-cursor">
//         <div className="p-col-4 add-cursor" onClick={navigate}><p>Dashboard</p> </div><div className="p-col-4 breadcrumb-position"><Icon icon="breadcrumb-icon"/></div>
//     <div className="p-col-4 custom-breadcrumb-text-active">  {props.page}</div></div>
// </div>
}
