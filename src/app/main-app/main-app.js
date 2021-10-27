import './main-app.css'
import {Header}                    from "../general/header/header";
import React                       from "react";
import {Route, Switch}             from "react-router-dom";
import Sider                       from "../general/sider/sider";
import {ErrorComponent}            from "../components/error/error-component";
import {DashboardComponent}        from "../components/dashboard/dashboard-component";
import {MerchantTable}             from "../components/back-office/merchant/merchant-table";
import {ChargeTypeComponent}       from "../components/back-office/charge-type/charge-type";
import {SettlementComponent}       from "../components/back-office/settlement/settlement";
import {Transaction}               from "../components/back-office/transaction/transaction";
import {Dispute}                   from "../components/back-office/dispute/dispute";
import {MerchantUser}              from "../components/back-office/merchant-user/merchant-user";
import {BulkSettlement}            from "../components/back-office/bulk-settlement/bulk-settlement";
import {FrontOfficeBulkSettlement} from "../components/front-office/bulk-settlement/front-office-bulk-settlement";
import {FrontOfficeMerchantUser}   from "../components/front-office/merchant-user/front-office-merchant-user";
import {FrontOfficeTransaction}    from "../components/front-office/transaction/front-office-transaction";

export const MainApp = () => {

    return (
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
                        <Route exact path="/" component={DashboardComponent}/>
                        <Route exact path="/dashboard" component={DashboardComponent}/>
                        {/*<Route path="/dashboard/:id" component={DashboardComponent} />*/}
                        <Route path="/back-office/transactions" component={Transaction}/>
                        <Route path="/front-office/transactions" component={FrontOfficeTransaction}/>
                        <Route path="/back-office/bulk-settlement" component={BulkSettlement}/>
                        <Route path="/front-office/bulk-settlement" component={FrontOfficeBulkSettlement}/>
                        <Route path="/front-office/merchant-user" component={FrontOfficeMerchantUser}/>
                        <Route path="/back-office/merchant" component={MerchantTable}/>
                        <Route path="/back-office/disputes" component={Dispute}/>
                        <Route path="/back-office/merchant-user" component={MerchantUser}/>
                        <Route path="/back-office/charge-type" component={ChargeTypeComponent}/>
                        <Route path="/back-office/settlement-participant" component={SettlementComponent}/>
                        <Route path="**" component={ErrorComponent}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
};
