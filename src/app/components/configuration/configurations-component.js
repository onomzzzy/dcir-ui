import {BreadCrumb}                       from "primereact/breadcrumb";
import {Divider}                          from "primereact/divider";
import {Icon}                             from "../../shared/icons/icon";
import './charge-type.css';
import {chargeTypeMenus}                  from "../../shared/models/utilities";
import {useEffect, useState}              from "react";
import {CustomChargeTypeModel}            from "./custom-charge-type-model";
import {CustomSettlementParticipantModel} from "./custom-settlement-participant-model";
import {CustomBreadcrumb}                 from "../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {ConfigureSettlement}              from "./configure-settlement";


export function ConfigurationsComponent(){

    const [currentIndex,setCurrentIndex] = useState(0);
    const [subTitle,setSubTitle] = useState('Charge Type')

    useEffect(() => {
        let mounted = true
        if(mounted) {
            setTile();
        }
        return () => {
            mounted = false;
        }
    },[currentIndex]
    );

    const lastIndex  = chargeTypeMenus.length - 1;

    function changeMenu(index){
        setCurrentIndex(index);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function setTile(){
        // eslint-disable-next-line default-case
        switch (currentIndex){
            case 0:
             setSubTitle('Charge Type');
             break;
            case 1:
            setSubTitle('Settlement Participant');
             break;
        }
    }


    const renderView = () => {
        // eslint-disable-next-line default-case
      switch (currentIndex){
          case 0:
              return<CustomChargeTypeModel/>
          case 1:
              return <CustomSettlementParticipantModel/>
          case 2:
              return <ConfigureSettlement/>
      }
    }

    return (
        <div>
            <div className="page-title p-text-left">Configurations</div>
            <div className="p-mt-2">
                <CustomBreadcrumb page={subTitle}/>
            </div>
            <div>
                <div className="quick-action-card">

                    <div className="p-grid">
                        <div className="p-col-4">
                            <div className="quick-action-card-menu-container">
                                <div>
                                    {chargeTypeMenus.map((chargeTypeMenu, index) => {
                                        return (
                                    <>
                                <div key={index.toString()} onClick={()=>changeMenu(chargeTypeMenu.index)} >
                                <span><span className="custom-menu-icon"><Icon color="#464DF2" icon="oval"/></span>
                               <span><span className={currentIndex === chargeTypeMenu.index ?'quick-action-card-menu-text-active':'quick-action-card-menu-text'}>{chargeTypeMenu.menu}</span></span>
                               </span>
                                </div>
                                <div className="p-mt-4">
                                    {index < lastIndex?
                                        (
                                        <Divider/>
                                        )
                                        :
                                        (
                                            <div/>
                                        )
                                    }
                                </div>
                                    </>
                                            )}
                                    )}
                            </div>
                            </div>
                        </div>
                        <div className="p-col-1">
                            <Divider layout="vertical"/>
                        </div>
                        <div className="p-col-7">
                          <div className="quick-action-card-view-container">
                              {renderView()}
                          </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
