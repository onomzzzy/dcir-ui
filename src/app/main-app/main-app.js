import './main-app.css'
import {Header}                                   from "../general/header/header";
import React, {useContext}   from "react";
import { Switch, Route }           from "react-router-dom";
import Sider                       from "../general/sider/sider";
import {ErrorComponent}            from "../components/error/error-component";
import {DashboardComponent}        from "../components/dashboard/dashboard-component";
import {MerchantTable}             from "../components/merchant/merchant-table";
import {ChargeTypeComponent}       from "../components/charge-type/charge-type";
import {SettlementComponent}       from "../components/settlement/settlement";
import {Transaction}               from "../components/transaction/transaction";
import {Dispute}                   from "../components/dispute/dispute";
import {MerchantUser}              from "../components/merchant-user/merchant-user";
import {BulkSettlement}            from "../components/bulk-settlement/bulk-settlement";
import {FrontOfficeBulkSettlement} from "../components/front-office/bulk-settlement/front-office-bulk-settlement";
import {FrontOfficeMerchantUser}   from "../components/front-office/merchant-user/front-office-merchant-user";

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
        <div className="main-body inner-content">
            <Switch>
                <Route exact path="/" component={DashboardComponent} />
                <Route exact path="/dashboard" component={DashboardComponent} />
                {/*<Route path="/dashboard/:id" component={DashboardComponent} />*/}
                <Route  path="/transactions" component={Transaction} />
                <Route  path="/bulk-settlement" component={BulkSettlement} />
                <Route  path="/front-office/bulk-settlement" component={FrontOfficeBulkSettlement} />
                <Route  path="/front-office/merchant-user" component={FrontOfficeMerchantUser} />
                <Route  path="/merchant" component={MerchantTable} />
                <Route  path="/disputes" component={Dispute} />
                <Route path="/merchant-user" component={MerchantUser} />
                <Route path="/charge-type" component={ChargeTypeComponent}/>
                <Route path="/settlement-participant" component={SettlementComponent}/>
                <Route path="**" component={ErrorComponent} />
            </Switch>
        </div>
    </div>
     </div>
 )
};
