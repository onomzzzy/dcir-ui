import './sider.css';
import {Icon}           from "../../shared/icons/icon";
import {CustomCollapse} from "../../shared/components/collapse/custom-collapse";

function Sider(){
    return(
        <div id="mySidenav" className="sidenav ">
          <div className="p-grid">
            <div className="p-col-12">
             <div className="logo">
                 <Icon icon="logo"/>
             </div>
            </div>
              <div className="p-col-12">
               <CustomCollapse/>
              </div>

          </div>
        </div>
    )
}
export default Sider;
