import './header.css';
import {Icon}                  from "../../shared/icons/icon";
import {useContext}            from "react";
import {MainContext}           from "../../../App";
import {useHistory}            from "react-router-dom";
import {LOCAL_STORAGE_SERVICE} from "../../core/services/storage-service";


export function Header () {
    const mainContext = useContext(MainContext);
    let history = useHistory();
    function logout(){
        mainContext.mainDispatch({ type: "LOG_OUT"});
        LOCAL_STORAGE_SERVICE.CLEAR_STORAGE();
        history.push("/login");
    }
    function openNav (e) {
        e.preventDefault();
        const width = document.getElementById("mySidenav").style.width;
        if(width && width === '250px'){
            document.getElementById("mySidenav").style.width = '0';
            document.getElementById("main").style.marginLeft = '0';
        }
        else{
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }
    }
   return(
       <div className="header">
         <div className="p-grid">
           <div className="p-col-4">
               <div onClick={openNav} className="header-icon add-cursor">
               <Icon icon="menu-icon"/>
               </div>
           </div>
             <div className="p-col-8">
             <div className="float-right">
             <div className="p-grid p-mr-2">
             <div className="p-col-6">
                 <div  className="log-out add-cursor">
                 <Icon icon="profile"/>
                 </div>
             </div>
             <div onClick={logout} className="p-col-6 log-out add-cursor">
               <Icon icon="log-out"/>
             </div>
                 </div>
             </div>
             </div>
         </div>
       </div>
   )
}
