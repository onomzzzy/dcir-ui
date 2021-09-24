import {useState} from 'react';
import './custom-collapse.css';
import {Icon}     from "../../icons/icon";
import {NavItems} from "../../models/nav-item";

export function CustomCollapse (props){
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [iconColor, setIconColor] = useState('#6D8C98');

    function onHoverCollapse(){
        setIconColor('#464DF2');
    }
    function mouseLeave(){
        if(!isCollapsed){
            setIconColor('#6D8C98');
        }
    }
    function collapse(){
        setIsCollapsed(!isCollapsed)
        if(isCollapsed){
            setIconColor('#6D8C98')
        }
        else{
            setIconColor('#464DF2')
        }
    }

    return(
        <div className="p-grid">
            <div className="p-col-12">
                <div>
                    {NavItems.map((nav, index) => {
                        return (
                            <div>
                                <div>
                                    <p className="sider-inactive-title">{nav.text}</p>
                                </div>
                                {nav.children.map((subNav, sIndex) => {
                                    return (

                                         <div onMouseOver={onHoverCollapse} onMouseLeave={mouseLeave} onClick={collapse}
                                              className="p-grid collapsible sub-menu-position">
                                                        <div className="p-col-2">
                                                            <div className="sider-icon">
                                                                <Icon color={iconColor} icon={subNav.icon}/>
                                                             </div>
                                                         </div>
                                                      <div className="p-col-10">
                                                           <p>{subNav.text}</p>
                                                        </div>
                                        </div>

                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
