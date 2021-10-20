import './custom-breadcrumb.css'
import {Icon}       from "../../icons/icon";
import {Link}       from "react-router-dom";
import {BreadCrumb} from "primereact/breadcrumb";

export function CustomBreadcrumb(props){

    const items = [
        { label: props.page },
    ];

    const home = { icon: 'pi pi-home', url: '/dashboard' }

    return(
        <BreadCrumb model={items} home={home}/>
        // // <div className="p-text-left custom-breadcrumb-container">
        //     {/*<div className="p-grid">*/}
        //     {/*<div className="p-col-3"><Link to={`/dashboard`}><div className="custom-breadcrumb-text">Dashboard</div></Link></div>*/}
        //     {/* <div className="p-col-1">*/}
        //     {/* <div className="breadcrumb-position">*/}
        //     {/* <Icon icon="breadcrumb-icon"/>*/}
        //     {/* </div>*/}
        //     {/* </div>*/}
        //     {/*    <div className="p-col-8"><div className="custom-breadcrumb-text-active">{props.page}</div></div>*/}
        //     {/*</div>*/}
        // // </div>
    )
}
