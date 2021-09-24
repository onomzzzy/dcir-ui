import './main-app.css'
import {Header} from "../general/header/header";
import Sider    from "../general/sider/sider";

export const MainApp = () => {

 return(
     <div>
     <div>
        <Sider/>
     </div>

    <div id="main">
        <div>
            <Header/>
        </div>
        <div className="main-body">
            <p>Body ..... </p>
        </div>
    </div>

     </div>
 )
};
