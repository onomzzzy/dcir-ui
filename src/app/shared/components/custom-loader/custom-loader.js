import './custom-loader.css'
import {ProgressSpinner} from "primereact/progressspinner";
import React             from "react";

export function CustomLoader(props){
   return(
       <div>
           <ProgressSpinner style={{width: '35px', height: '35px'}} strokeWidth="4"/>
           <p>{props.loadingText}</p>
       </div>
   )
}
