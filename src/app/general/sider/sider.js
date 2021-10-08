import './sider.css';
import React, {useContext, useState} from 'react';
import {Icon}                        from "../../shared/icons/icon";
import {Accordion, AccordionTab} from "primereact/accordion";
import {NavItems}                from "../../shared/models/nav-item";
import {Link, useHistory}        from "react-router-dom";
import {MainContext}             from "../../../App";

function Sider(){
    const mainContext = useContext(MainContext);
    let history = useHistory();
    const [tabIndex,setTabIndex] = useState(0);
    const [subMenuClicked,setSubMenuClicked] = useState('Dashboard');

    return(
        <div id="mySidenav" className="sidenav p-shadow-1">
          <div className="p-grid">
            <div className="p-col-12">
             <div className="logo">
                 <Icon icon="logo"/>
             </div>
            </div>
              <div className="p-col-12">
                  <div className="nav-profile-container">
                      <div className="p-grid">
                          <div className="p-col-2">
                           <Icon icon="nav-profile-icon"/>
                          </div>
                          <div className="p-col-10">
                          <div className="nav-profile-text-container">
                             <div>
                                 <span className="nav-profile-title">{mainContext?.mainState?.name}</span>
                             </div>
                              <div>
                                  <span className="nav-profile-subtitle">Back Office Admin</span>
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="p-col-12">
                  <div className="accordion-demo">
                  <Accordion onTabChange={(e)=>setTabIndex(e.index)} className="accordion-custom" activeIndex={tabIndex}>
                      {NavItems.map((nav, index) => {
                          return (
                              <AccordionTab key={index?.toString()} headerClassName="custom-header"
                                            header={<React.Fragment><span className="custom-tab-icon"><Icon
                                                color={tabIndex === nav.index?'#464DF2':'#6D8C98'} icon={nav.icon}/></span><span
                                                className="custom-tab-text custom-font-family">{nav.text}</span></React.Fragment>}>
                                  {nav.children.map((subNav, sIndex) => {
                                      return (
                                   <Link key={sIndex} to={`${subNav.route}`}>
                                  <div  onClick={()=>{
                                      setSubMenuClicked(subNav.text);
                                   }
                                  } className={subMenuClicked === subNav?.text?'custom-tab-content p-mt-1 custom-tab-active':'custom-tab-content'}>
                                      <span><span><i className={subNav.icon}/></span><span
                                          className="custom-font-family">{subNav?.text}</span></span>
                                  </div>
                                          </Link>
                                      );
                                  })}
                              </AccordionTab>
                          )
                      })};
                  </Accordion>
                  </div>
              </div>

          </div>
        </div>
    )
}
export default Sider;
