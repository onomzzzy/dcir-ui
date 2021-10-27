import './transaction.css';
import {TabPanel, TabView}          from "primereact/tabview";
import React, {useEffect, useState} from "react";
import {CustomLoader}               from "../../../shared/components/custom-loader/custom-loader";
import {SERVICES}                   from "../../../core/services/services";
import {Icon}                       from "../../../shared/icons/icon";
import {SpecialLabelCases}          from "../../../shared/models/utilities";
import {CustomModal}                from "../../../shared/components/custom-modal/custom-modal";
import {NewDispute}                 from "../dispute/new-dispute";
import {CustomAccordion}            from "../../../shared/components/custom-accordion/custom-accordion";
import {useWindowSize}              from "../../../core/custom-hook/use-widows-resize";




export function TransactionBreakdown(props){
    const [currentIndex,setCurrentIndex] = useState(0);
    const [visible,setVisible] = useState(false);
    const windowSize = useWindowSize();
    const [currentModalIndex,setCurrentModalIndex] = useState(1);
    const [error,setError] = useState(null);
    const [detailsContent,setDetailsContent] = useState([]);
    const [disputeCodes,setDisputeCodes] = useState([]);


    useEffect(() => {
            let mounted = true
            if(mounted) {
                setDetailsContent(props.detials)
                getDisputeCodes();
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
                            <button className="primary-button">Reload</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function getDisputeCodes() {
        SERVICES.GET_DISPUTE_CODES()
            .then(data =>{
                setDisputeCodes(data.result);
            })
            .catch(error=>{
                console.log('Error getting dispute codes ',error);
            })
    }


    const showResolvedButton = () =>{
        if(!disputeCodes?.includes(props.responseCode)){
            return <div/>
        }
        else{
            return ( <button onClick={()=>openModal(1)} className="primary-button">Log Dispute</button>)
        }
    }

    function isTabMobile(){
        return windowSize.width <= 948
    }

    const disputeTabView = () =>{
        return(
            <div style={{backgroundColor:'#ffffff',paddingTop:'1em'}} className="p-shadow-1 p-pb-5">
                <div className="p-text-left p-ml-3 p-mt-2 p-pb-3">
                    <span onClick={props?.goBack} className="add-cursor"><span><Icon icon="go-back-icon"/></span></span>
                </div>
                <TabView>
                    <TabPanel header={isTabMobile()?'TS':'Transaction Summary'}>
                        <div className="p-text-left">
                            <div className="p-grid p-mt-2">
                                <div className="p-col-8"/>
                                <div className="p-col-4">
                                    <div style={{width:'135px',float:'right'}}>
                                        {showResolvedButton()}
                                    </div>
                                </div>

                            </div>
                            <div className="p-grid">
                            <div className="p-col-12">
                            <div>
                                <div>
                                    <CustomAccordion currentView={detailsView}  title="Transaction Details" open={true}/>
                                </div>
                            </div>
                            </div>

                                <div className="p-col-12">
                                    <div style={{marginTop:'-2.2em'}}>
                                        <div>
                                            {/*<CustomAccordion currentView={detailsView}  title="Additional Information" open={false}/>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={isTabMobile()?'TR':'Transaction Reversal Attempt(s)'}>
                        <p>Transaction Reversal Attempt!!!</p>
                    </TabPanel>
                    <TabPanel header={isTabMobile()?'POS':'POS Transaction status'}>
                        <p>POS Transaction status!!!</p>
                    </TabPanel>
                </TabView>
            </div>
        )
    }

    const disputeView =()=>{
        // eslint-disable-next-line default-case
        switch(currentIndex){
            case 0:
                return(
                    disputeTabView()
                )
            case 1:
                return (
                    <div className="p-mt-5">
                        <CustomLoader loadingText="loading transaction details ..."/>
                    </div>
                )
            case 2:
                return (
                    errorView()
                )
            case 3:
                return (
                    <div className="custom-mobile-table-card">
                      <NewDispute transactionSearchKey={props?.transactionSearchKey} closeDisputeModal={closeModal}/>
                    </div>
                )
        }
    }


    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <NewDispute transactionSearchKey={props?.transactionSearchKey} closeDisputeModal={closeModal} />;
        }
    }

    function onHide(){

    }

    function closeModal(reload?){
        if(props.mobile){
            setCurrentIndex(0);
        }
        else{
            setVisible(false);
        }
        if(reload){
            setCurrentIndex(0);
            getDisputeCodes();
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
