import {useState} from "react";
import {Divider}  from "primereact/divider";

export function CustomAccordion(props){
    const [tabOpen,setTabOpen] = useState(props.open);

    function setCurrentTab(isOpen){
        setTabOpen(isOpen);
    }

    return (
    <div className="p-text-left">
        <div  className="p-grid">
            <div className="p-col-10">
                <p className="custom-accordion-title">{props.title}</p>
            </div>
            <div className="p-col-2">
                <div className="custom-tab-icon-position">
                    <span className={tabOpen?'dcir-hide':'dcir-show custom-tab-icon'} onClick={()=>setCurrentTab(true)}>Expand</span>
                    <span className={tabOpen?'dcir-show custom-tab-icon':'dcir-hide'} onClick={()=>setCurrentTab(false)}>Close</span>
                </div>
            </div>
            <div style={{marginTop:'-2.5em'}} className="p-col-12">
                <div>
                    <div className={tabOpen?'dcir-hide':'dcir-show'}>
                        <Divider/>
                    </div>
                </div>
            </div>

        </div>

        <div style={{bottom:tabOpen?'1em':'',position:'relative'}} className={tabOpen?'dcir-show':'dcir-hide'}>
            {props.currentView()}
        </div>
    </div>
    )
}
