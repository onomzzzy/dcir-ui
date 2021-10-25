import './bulk-settlement.css';
import {TabPanel, TabView}          from "primereact/tabview";
import React, {useEffect, useState} from "react";
import {CustomLoader}               from "../../shared/components/custom-loader/custom-loader";
import {SERVICES}                   from "../../core/services/services";
import {Icon}                       from "../../shared/icons/icon";
import {SpecialLabelCases}          from "../../shared/models/utilities";
import {CustomModal}                from "../../shared/components/custom-modal/custom-modal";
import {NewDispute}                 from "../dispute/new-dispute";
import {HELPER}                     from "../../shared/helper/helper";
import {Divider}                    from "primereact/divider";
import {BulkTransactions}           from "./bulk-transactions";
import {RepaymentRequest}           from "./repayment-request";




export function BulkSettlementBreakDown(props){
    const [currentIndex,setCurrentIndex] = useState(0);
    const [dispute,setDispute] = useState(null);
    const [visible,setVisible] = useState(false);
    const [currentModalIndex,setCurrentModalIndex] = useState(1);
    const [error,setError] = useState(null);
    const [detailsContent,setDetailsContent] = useState([]);
    const [merchantDetails,setMerchantDetails] = useState([]);
    const [disputeCodes,setDisputeCodes] = useState([]);
    const [summaryIndex,setSummaryIndex] = useState(1);
    const [merchantTabIndex,setMerchantTabIndex] = useState(0);


    useEffect(() => {
            let mounted = true
            if(mounted) {
                setDetailsContent(props?.detials)
                setMerchantDetails(props?.merchantDetails)
                getTransactionTiedToSettlement();
                getPaymentRequest();
            }
            return () => {
                mounted = false;
            }
        },[]
    );

    function setTabIndex(action,index){
        // eslint-disable-next-line default-case
        switch (action){
            case 'SUMMARY':
             setSummaryIndex(index);
             break;
            case 'MERCHANT':
             setMerchantTabIndex(index);
        }
    }


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

    const merchantView = () => {
        return(
            merchantDetails.map((details, index) =>
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

    function getTransactionTiedToSettlement() {
        const params = HELPER.TO_URL_STRING({
            page:0,
            size:10,
        })

        SERVICES.GET_BULK_SETTLEMENT_TRANSACTION(params,props.bulkSettlementKey)
            .then(data =>{

            })
            .catch(error=>{
                console.log('Error getting transaction tied to settlement codes ',error);
            })
    }

    function getPaymentRequest() {
        const params = HELPER.TO_URL_STRING({
            page:0,
            size:10,
        })

        SERVICES.GET_PAYMENT_REQUEST(params,props.bulkSettlementKey)
            .then(data =>{

            })
            .catch(error=>{
                console.log('Error getting transaction tied to settlement codes ',error);
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
                    <TabPanel header={props?.mobile?'BS':'Bulk Settlement Summary'}>
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
                                    <div className="p-grid">
                                        <div className="p-col-10">
                                        <p className="dispute-title">Settlement Details</p>
                                        </div>
                                        <div className="p-col-2">
                                            <div className="custom-tab-icon-position">
                                           <span className={summaryIndex?'dcir-hide':'dcir-show custom-tab-icon'} onClick={()=>setTabIndex('SUMMARY',1)}>Expand</span>
                                           <span className={summaryIndex?'dcir-show custom-tab-icon':'dcir-hide'} onClick={()=>setTabIndex('SUMMARY',0)}>Close</span>
                                            </div>
                                            </div>
                                    </div>
                                    <div className={summaryIndex?'dcir-show':'dcir-hide'}>
                                        {detailsView()}
                                    </div>
                                    <div className={summaryIndex?'dcir-hide':'dcir-show'}>
                                        <div style={{marginTop:'-2.2em'}}>
                                            <Divider/>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-12">
                                    <div style={{marginTop:summaryIndex? '0px':'-3.3em'}} className="p-grid">
                                        <div className="p-col-10">
                                            <p className="dispute-title">Merchant Information</p>
                                        </div>
                                        <div className="p-col-2">
                                            <div className="custom-tab-icon-position">
                                                <span className={merchantTabIndex?'dcir-hide':'dcir-show custom-tab-icon'} onClick={()=>setTabIndex('MERCHANT',1)}>Expand</span>
                                                <span className={merchantTabIndex?'dcir-show custom-tab-icon':'dcir-hide'} onClick={()=>setTabIndex('MERCHANT',0)}>Close</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={merchantTabIndex?'dcir-show':'dcir-hide'}>
                                        {merchantView()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header={props?.mobile?'TS':'Transaction Summary'}>
                        <div>
                            <BulkTransactions bulkSettlementKey={props.bulkSettlementKey} />
                        </div>
                    </TabPanel>
                    <TabPanel header={props?.mobile?'PR':'PaymentRequest'}>
                        <div>
                            <RepaymentRequest bulkSettlementKey={props.bulkSettlementKey} />
                        </div>
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
            getTransactionTiedToSettlement();
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
