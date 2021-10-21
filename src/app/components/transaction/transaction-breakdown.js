import './transaction.css';
import {TabPanel, TabView}          from "primereact/tabview";
import React, {useEffect, useState} from "react";
import {CustomLoader}               from "../../shared/components/custom-loader/custom-loader";
import {SERVICES}                   from "../../core/services/services";
import {Icon}                       from "../../shared/icons/icon";
import {SpecialLabelCases}          from "../../shared/models/utilities";
import {CustomModal}                from "../../shared/components/custom-modal/custom-modal";
import {HELPER}                     from "../../shared/helper/helper";
import {NewDispute}                 from "../dispute/new-dispute";
import {NewTable}                   from "../../shared/components/custom-table/new-table";




export function TransactionBreakdown(props){
    const [currentIndex,setCurrentIndex] = useState(0);
    const [dispute,setDispute] = useState(null);
    const [visible,setVisible] = useState(false);
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

    function populateDetails(e){
        const arr = [];
        arr.push({label:'Log code',value:e?.logCode});
        arr.push({label:'Customer account name',value:e?.customerAccountName});
        arr.push({label:'Customer account no',value:e?.customerAccountNumber});
        arr.push({label:'Transaction amount',value:e?.transactionAmount,itemCase:'transactionAmount'})
        arr.push({label:'Response Code',value:e?.transactionResponseCode,itemCase:'responseCode'});
        arr.push({label:"Resolution Status",value:e?.resolutionStatus,itemCase:'resolutionStatus'});
        arr.push({label:"Status",value:e?.status,itemCase:'status'});
        arr.push({label:'Created date',value:e?.createdOn,itemCase:'createdOn'});
        setDetailsContent(arr);
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
        if(!disputeCodes?.includes(detailsContent[3]?.value)){
            return <div/>
        }
        else{
            return ( <button onClick={()=>openModal(1)} className="primary-button">Log Dispute</button>)
        }
    }

    const disputeTabView = () =>{
        return(
            <div style={{backgroundColor:'#ffffff',paddingTop:'1em'}} className="p-shadow-1 p-pb-5">
                <div className="p-text-left p-ml-3 p-mt-2 p-pb-3">
                    <span onClick={props?.goBack} className="add-cursor"><span><Icon icon="go-back-icon"/></span></span>
                </div>
                <TabView>
                    <TabPanel header={props?.mobile?'TS':'Transaction Summary'}>
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
                            <div className="p-col-12 p-lg-6">
                            <div>
                                <p className="dispute-title">Transaction Details</p>
                            </div>
                            <div style={{border:'solid 1px #E0E8F4',borderRadius:'4px'}}>
                                {detailsView()}
                            </div>
                            </div>

                                <div className="p-col-12 p-lg-6">
                                    <div>
                                        <p className="dispute-title">Additional Information</p>
                                    </div>
                                    <div style={{border:'solid 1px #E0E8F4',borderRadius:'4px'}}>
                                        {detailsView()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={props?.mobile?'TR':'Transaction Reversal Attempt(s)'}>
                        <p>Transaction Reversal Attempt!!!</p>
                    </TabPanel>
                    <TabPanel header={props?.mobile?'POS':'POS Transaction status'}>
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
            // getDispute();
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
