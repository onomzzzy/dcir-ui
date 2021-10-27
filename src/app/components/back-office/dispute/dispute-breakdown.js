import './dispute.css';
import {TabPanel, TabView}                      from "primereact/tabview";
import React, {useContext, useEffect, useState} from "react";
import {CustomLoader}                           from "../../../shared/components/custom-loader/custom-loader";
import {Icon}                                   from "../../../shared/icons/icon";
import {SpecialLabelCases}                      from "../../../shared/models/utilities";
import {UpdateDispute}                          from "./update-dispute";
import {CustomModal}                            from "../../../shared/components/custom-modal/custom-modal";
import {useWindowSize}                          from "../../../core/custom-hook/use-widows-resize";
import {CustomAccordion}                        from "../../../shared/components/custom-accordion/custom-accordion";
import {MainContext}                            from "../../../../App";




export function DisputeBreakdown(props){
    const mainContext = useContext(MainContext);
    const [currentIndex,setCurrentIndex] = useState(0);
    const [visible,setVisible] = useState(false);
    const [currentModalIndex,setCurrentModalIndex] = useState(1);
    const [error,setError] = useState(null);
    const [detailsContent,setDetailsContent] = useState([]);
    const [disputeStatus,setDisputeStatus] = useState()

    const widowSize = useWindowSize();

    function isTabMobile(){
        return widowSize.width <= 930;
    }


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getDispute();
            }
            return () => {
                mounted = false;
            }
        },[]
    );


    const transformView = (itemCase,value) =>{
        let result = value;
        if(itemCase) {
            SpecialLabelCases.forEach(e => {
                if (e.case === itemCase) {
                    result = e.action(value);
                }
            })
        }
        return result;
    }


    const detailsView = () => {
        return(
        detailsContent.map((details, index) =>
            <div key={index.toString()} className="p-grid dcir-row">
                <div className="p-col-3">
                    <p className="details-label">{details.label}:</p>
                </div>
                <div className="p-col-6">
                    <p className="details-value">{transformView(details.itemCase, details.value)}</p>
                </div>
            </div>
        )
    )
    }

    const errorView = () =>{

        return(
            <div>
                <div className="empty-container">
                    <Icon icon="error-message-icon"/>
                    <div>
                        <p className="empty-text">{error}</p>
                    </div>
                    <div className="p-mt-3">
                        <div style={{maxWidth:'200px'}}>
                        <button onClick={()=>getDispute()} className="primary-button">Reload</button>
                        </div>
                        </div>
                </div>
            </div>
        )
    }

    function getDispute(){
        setDisputeStatus(props.disputeStatus);
        setDetailsContent(props.disputeDetails);
        setCurrentIndex(1);
    }

    const showResolvedButton = () =>{
        if(disputeStatus === 'RESOLVED'){
            return <div/>
        }
        else{
            if(props.loggedBy === mainContext?.mainState?.username){
                return <div/>
            }
            else {
                return (<button onClick={() => openModal(1)} className="primary-button">Resolve</button>)
            }
            }
    }

    function resolvedSuccessful(){
        props.goBack()
    }

    const disputeTabView = () =>{
        return(
            <div style={{backgroundColor:'#ffffff',paddingTop:'1em'}} className="p-shadow-1 p-pb-5">
             <div className="p-text-left p-ml-3 p-mt-2 p-pb-3">
                 <span onClick={props.goBack} className="add-cursor"><span><Icon icon="go-back-icon"/></span></span>
             </div>
            <TabView>
                <TabPanel header={isTabMobile()?'D':'Details'}>
                    <div className="p-text-left">
                    <div className="p-grid p-mt-2">
                     <div className="p-col-8"/>
                      <div className="p-col-4">
                                <div style={{width:'135px',float:'right'}}>
                                    {showResolvedButton()}
                                </div>
                            </div>

                        </div>
                        <div>
                            <CustomAccordion currentView={detailsView} title="Dispute Details" open={true}/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header={isTabMobile()?'R':'Refund attempts'}>
                    <p>Refunds works!!!</p>
                </TabPanel>
                <TabPanel header={isTabMobile()?'TS':'Summary'}>
                    <p>Transaction Summary works!!!</p>
                </TabPanel>
                <TabPanel header={isTabMobile()?'RA':'Reversal attempts'}>
                    <p>Reversal works!!!</p>
                </TabPanel>
                <TabPanel header={isTabMobile()?'POS':'Pos status'}>
                    <p>Pos status!!!</p>
                </TabPanel>
            </TabView>
            </div>
        )
    }

    const disputeView =()=>{
        // eslint-disable-next-line default-case
        switch(currentIndex){
            case 1:
            return(
                disputeTabView()
            )
          case 0:
            return (
                <div className="p-mt-5">
                <CustomLoader loadingText="loading dispute details ..."/>
                </div>
            )
            case 2:
                return (
                    errorView()
                )
            case 3:
                console.log('props.logCode props.logCode ',props.logCode)
                return (
                    <div className="custom-mobile-table-card">
                    <UpdateDispute resolvedSuccessful={resolvedSuccessful} logCode={props.logCode} closeModal={closeModal}/>
                    </div>
                )
        }
    }


    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <UpdateDispute resolvedSuccessful={resolvedSuccessful} logCode={props.logCode} closeModal={closeModal}/>
        }
    }

    function onHide(){

    }

    function closeModal(reload?){
       if(props.mobile){
           setCurrentIndex(1);
       }
       else{
           setVisible(false);
       }
       if(reload){
           setCurrentIndex(0);
           getDispute();
       }
    }

    function openModal(index){
     if(props.mobile){
         setCurrentIndex(3);
     }
     else{
         setCurrentModalIndex(index);
         setVisible(true);
     }
    }

    return(
        <div>
         <div>
             <CustomModal onHide={onHide} visible={visible} modalContent={modalContent}/>
         </div>
         {disputeView()}
        </div>
    )
}
