import './sider.css';
import React, {useContext, useEffect, useState} from 'react';
import {Icon}                                   from "../../shared/icons/icon";
import {Accordion, AccordionTab}                from "primereact/accordion";
import {NavItems}                               from "../../shared/models/nav-item";
import {Link, useHistory}                       from "react-router-dom";
import {MainContext}                            from "../../../App";
import {HELPER}                                 from "../../shared/helper/helper";
import {LOCAL_STORAGE_SERVICE}                  from "../../core/services/storage-service";

function Sider(){
    const mainContext = useContext(MainContext);
    let history = useHistory();
    const [tabIndex,setTabIndex] = useState(0);
    const [colorIndex,setColorIndex] = useState(0);
    const [color,setColor] = useState('#6D8C98');
    const defaultColor = '#6D8C98';
    const defaultActiveColor = '#464DF2';
    const [menuClicked,setMenuClicked] = useState(mainContext?.mainState?.selectedSideNav);
    const [subMenuClicked,setSubMenuClicked] = useState('Dashboard');
    const role = HELPER.GET_ROLE();


    useEffect(() => {
            let mounted = true
            if(mounted) {
              const sideNav = LOCAL_STORAGE_SERVICE.GET_CURRENT_NAV();
               setMenuClicked(sideNav.selectedSideNav);
               setColorIndex(sideNav.selectedSideNavIndex);
               setColor('#464DF2')
            }
            return () => {
                mounted = false;
            }
        },[]
    );

    function setNavColorOnMouseEnter(index,menuName){
       if(menuName !== menuClicked) {
           setColorIndex(index);
           setColor('#464DF2')
       }
    }

    function setNavColorOnMouseLeave(index,menuName){
        if(menuName !== menuClicked) {
            setColorIndex(mainContext?.mainState?.selectedSideNavIndex);
            setColor('#6D8C98')
        }
    }

    function setNavColorOnClicked(index,clickedMenu,route){
       setMenuClicked(clickedMenu);
        mainContext.mainDispatch({ type: "CLICKED_SIDE_NAV", selectedSideNav: clickedMenu, selectedSideNavIndex:index });
        LOCAL_STORAGE_SERVICE.STORE_CURRENT_PAGE(clickedMenu,index);
        history.push(route);
    }

    const sideMenuItems = () =>{
         return(
        NavItems.map((navItem,index) =>{
           if(navItem.children.length === 0){
               const hasAuthority = navItem.authority === 'all' ? true: (HELPER.HAS_AUTHORITY(navItem.authority) && HELPER.HAS_ROLE(navItem.roles));
              return(
                  <div key={navItem.uniqueId.toString()} className={hasAuthority?'dcir-show':'dcir-hide'}>
                  <div onClick={()=>setNavColorOnClicked(navItem.uniqueId,navItem.text,navItem.route)} onMouseLeave={()=>setNavColorOnMouseLeave(navItem.uniqueId,navItem.text)} onMouseEnter={()=>setNavColorOnMouseEnter(navItem.uniqueId,navItem.text)} className={menuClicked === navItem.text?'singleNavContainer singleNavContainer-active':'singleNavContainer'}>
                      <div className="p-grid p-text-left">
                        <div className="p-col-2"><div className="singleNavContainer-icon"><Icon color={(menuClicked === navItem.text)? defaultActiveColor:(colorIndex === navItem.uniqueId? defaultActiveColor:defaultColor)} icon={navItem.icon}/></div></div>
                        <div className="p-col-10"><span style={{color:(menuClicked === navItem.text)? defaultActiveColor:(colorIndex === navItem.uniqueId? defaultActiveColor:defaultColor)}} className="singleNavContainer-text adjust-single-nav">{navItem.text}</span></div>
                      </div>
                  </div>
                  </div>
              )
           }
           else{
             return (
                 <Accordion key={navItem.toString()}>
                     <AccordionTab header={<React.Fragment><span className="custom-tab-icon singleNavContainer-icon"><Icon
                         color={(tabIndex + 20) === navItem.index?defaultActiveColor:defaultColor} icon={navItem.icon}/></span><span
                         className="custom-tab-text custom-font-family" style={{color:(tabIndex + 20) === navItem.index?defaultActiveColor:defaultColor}}>{navItem.text}</span></React.Fragment>}>
                         {navItem.children.map((subNav, sIndex) => {
                                                 return (
                                                     <Link key={sIndex} to={`${subNav.route}`}>
                                                         <div onClick={()=>setNavColorOnClicked(subNav.index,subNav.text,subNav.route)}
                                                         className={menuClicked === subNav?.text?'custom-tab-content p-mt-1 custom-tab-active':'custom-tab-content'}>
                                                  <span><span
                                                      className="custom-font-family custom-tab-title">{subNav?.text}</span></span>
                                                         </div>
                                                     </Link>
                                                 );
                                             })}
                     </AccordionTab>
                     }
                 </Accordion>
             )
           }
        })
         );
    }

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
                                  <span className="nav-profile-subtitle">{role}</span>
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="p-col-12">
                  <div>
                      {sideMenuItems()}
                  </div>
              </div>

          </div>
        </div>
    )
}
export default Sider;
