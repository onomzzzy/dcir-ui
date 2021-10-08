import './main-app.css'
import {Header}                                   from "../general/header/header";
import React, {useContext, useEffect}             from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sider                                      from "../general/sider/sider";
import {ErrorComponent}                           from "../components/error/error-component";
import {CreateMerchantComponent}                  from "../components/merchant/create-merchant-component"
import {ConfigurationsComponent}                  from "../components/configuration/configurations-component";
import {DashboardComponent}                       from "../components/dashboard/dashboard-component";
import {MerchantTable}                            from "../components/merchant/merchant-table";
import {ChargeTypeComponent}                      from "../components/charge-type/charge-type";
import {SettlementComponent}                      from "../components/settlement/settlement";
import {Transaction}                              from "../components/transaction/transaction";
import {Dispute}                                  from "../components/dispute/dispute";
export const MainContext = React.createContext();

export const MainApp = () => {

 const mainContext = useContext(MainContext);

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
                <Route  path="/merchant" component={MerchantTable} />
                <Route  path="/disputes" component={Dispute} />
                <Route path="/charge-type" component={ChargeTypeComponent}/>
                <Route path="/settlement-participant" component={SettlementComponent}/>
                <Route path="**" component={ErrorComponent} />
            </Switch>
        </div>
    </div>
     </div>
 )
};
