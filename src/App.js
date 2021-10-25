
import './App.css';
import PrimeReact                               from 'primereact/api';
import React, {useReducer}                      from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login}                                  from "./app/components/login/login";
import {MainApp}                                from "./app/main-app/main-app"
import {reducer}                                from "./app/core/redux/reducer/reducer";
import {initialState}                           from "./app/core/redux/state/state";
import {LOCAL_STORAGE_SERVICE}                  from "./app/core/services/storage-service";

export const MainContext = React.createContext();
PrimeReact.ripple = true;
PrimeReact.zIndex = {
  modal: 1100,    // dialog, sidebar
  overlay: 1000,  // dropdown, overlaypanel
  menu: 1000,     // overlay menus
  tooltip: 1100 ,  // tooltip
  toast: 1200     // toast
}
PrimeReact.autoZIndex = true;
PrimeReact.appendTo = 'self'; // Default value is null(document.body).

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  function checkIfAuthenticated(){
   let isAuthenticated = state.isAuthenticated;
  if(!isAuthenticated){
    isAuthenticated = LOCAL_STORAGE_SERVICE.IS_LOGIN();
    if(isAuthenticated){
      const credentials = LOCAL_STORAGE_SERVICE.GET_USER_CREDENTIALS();
      console.log('credentials  ,,.....',credentials)
      dispatch({type:'PERSIST_LOGIN_DATA',loginData:credentials});
    }
  }
  return isAuthenticated;

  }
  return (
    <div className="App">
      <Router>
        <div>
          <MainContext.Provider
              value={{mainState: state, mainDispatch: dispatch}}>
            <Switch>
              <Route exact path="/login"  component={Login} />
                <Route  path="/" render={()=>checkIfAuthenticated()?<MainApp/>:<Login/>}/>
            </Switch>
          </MainContext.Provider>
        </div>
      </Router>
    </div>
  )
}

export default App;
