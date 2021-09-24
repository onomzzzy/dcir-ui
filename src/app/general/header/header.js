import './header.css';
import {Icon} from "../../shared/icons/icon";


export function Header () {
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
             <div className="log-out add-cursor">
               <Icon icon="log-out"/>
             </div>
             </div>
             </div>
         </div>
       </div>
   )
}
