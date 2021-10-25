import './bulk-settlement.css';
import React, {useContext, useEffect, useRef, useState} from "react";
import {Toast}                   from "primereact/toast";
import {OverlayPanel}            from "primereact/overlaypanel";
import {BulkSettlementSearch}    from "./bulk-settlement-search";
import {BulkSettlementBreakDown} from "./bulk-settlement-break-down";
import {HELPER}                  from "../../../shared/helper/helper";
import {SERVICES}                from "../../../core/services/services";
import {DetailsBreakDown}        from "../../../shared/components/details-break-down/details-break-down";
import {CustomTable}             from "../../../shared/components/custom-table/custom-table";
import {CustomModal}             from "../../../shared/components/custom-modal/custom-modal";
import {CustomBreadcrumb}        from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {AccessDenied}            from "../../access-denied/access-denied";
import {CustomLoader}            from "../../../shared/components/custom-loader/custom-loader";
import {MainContext}             from "../../../../App";



export function FrontOfficeBulkSettlement(){
    const toast = useRef(null);
    const op = useRef(null);
    const mainContext = useContext(MainContext);
    const [loading,setLoading] = useState(true)
    const [visible,setVisible] = useState(false)
    const [currentIndex,setCurrentIndex] = useState(0);
    const [error,setError] = useState('');
    const [search,setSearch] = useState(false);
    const [totalPages,setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [isMobileTransaction,setIsMobileTransaction] = useState(false);
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0);
    const [bulkSettlementKey,setBulkSettlementKey] = useState('');
    const [merchantDetails,setMerchantDetails] = useState([]);
    const [details,setDetails] = useState([]);
    const [transactions,setTransactions] = useState([])

    const tableHeaders = [
        {label:'Merchant Account',value:'merchantAccount'},
        {label:'Transaction Amount',value:'transactionMerchantAmount'},
        {label:'Settlement Type',value:'settlementType'},
        {label:'Status',value:'status'},
        {label:'Created On',value:'createdAt'},
        {label:'Completed On',value:'completedAt'},
        {label: '',value: 'actions'}

    ]


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getBulkSettlement();
            }
            return () => {
                mounted = false;
            }
        },[currentPage]
    );

    function openAction(e,action,isMobile){
        // eslint-disable-next-line default-case
        switch (action) {
            case 'VIEW': {
                getSettlementDetails(e,isMobile);
                break;
            }
        }
    }


    function getSettlementDetails(e,isMobile){
        let arr = [];
        setMerchantDetails([]);
        setDetails([]);
        console.log('e?.bulkSettlementKey)',e?.bulkSettlementKey)
        setBulkSettlementKey(e?.bulkSettlementKey);
        arr.push({label:'Bulk Settlement Key',value:e?.bulkSettlementKey});
        arr.push({label:'Merchant Account',value:e?.merchantAccount});
        arr.push({label:'Payment Request Attempt',value:e?.paymentRequestAttempt});
        arr.push({label:'Report Generation Attempt',value:e?.reportGenerationAttempt});
        arr.push({label:'Report Status',value:e?.reportStatus,itemCase:'status'});
        arr.push({label:'Settlement Type',value:e?.settlementType});
        arr.push({label:'Status',value:e?.status,itemCase:'status'});
        arr.push({label:'Transaction Charge Amount',value:e?.transactionChargeAmount,itemCase:"transactionAmount"});
        arr.push({label:'Transaction Count',value:e?.transactionCount});
        arr.push({label:'Merchant Transaction Amount',value:e?.transactionMerchantAmount,itemCase:'transactionMerchantAmount'});
        arr.push({label:'Transaction Total Amount',value:e?.transactionTotalAmount,itemCase:'transactionAmount'});
        arr.push({label:'Start Date',value:e?.transactionTimeBegin,itemCase:"transactionTime"});
        arr.push({label:'End Date',value:e?.transactionTimeEnd,itemCase:"transactionTime"});

        setDetails(arr);
        setMerchantDetails(fillMerchantDetails(e?.merchant))
        setIsMobileTransaction(isMobile);
        setCurrentIndex(3);

    }

    function fillMerchantDetails(e){
        console.log('e,e',e)
      let arr = [];
        arr.push({label:'Merchant Name',value:e?.merchantName});
        arr.push({label:'Card Acceptor Id',value:e?.cardAcceptorId});
        arr.push({label:'Phone Number',value:e?.phoneNumber});
        arr.push({label:'mainEmail',value:e?.mainEmail});
        arr.push({label:'disputeEmail',value:e?.disputeEmail});
        arr.push({label:'merchantId',value:e?.merchantId});
        arr.push({label:'Settlement Email',value:e?.settlementEmail});
        arr.push({label:'Date Created',value:e?.createdTime,itemCase:'transactionTime'});
        console.log('arrrr',arr);
        return arr;
    }


    function getBulkSettlement(){
        setTransactions([]);
        let params = {
            page:0,
            size:10,
            startDate:'',
            endDate:'',
            status:''
        }
        params = HELPER.TO_URL_STRING(params);
        SERVICES.GET_FRONT_OFFICE_BULK_SETTLEMENT( params )
            .then(data=>{
                const result = data?.result?.content;
                if(!result.length){
                    setEmptyText('No item yet ...')
                }
                else{
                    let arr = [];
                    setTotalItems(data?.result.totalElements);//need adjustment
                    setTotalPages(data?.result.totalPages);//need adjustment
                    result.forEach(e=>{
                        arr.push({...e,actions:'CR',detailsFunction:openAction});
                    })
                    setTransactions(arr)
                }
                setError(null);
                setCurrentIndex(1);
                setLoading(false)
            })
            .catch(error=>{
                setError(HELPER.PROCESS_ERROR(error));
                setCurrentIndex(1);
                setLoading(false)
            })
    }

    function onHide(){

    }

    function openModal(index,isMobile?){
        setCurrentModalIndex(index);
        if(isMobile){
            setCurrentIndex(2);
        }
        else {
            setVisible(true);
        }
    }

    function reload(){
        setLoading(true);
        setSearch(false);
        setCurrentIndex(0);
        getBulkSettlement();
    }

    function closeModal(isReload?){
        if(visible){
            setVisible(false);
        }
        if(currentIndex === 2){
            setCurrentIndex(1)
        }

        if(isReload){
            reload();
        }
    }

    const mobileModal = () => {
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <BulkSettlementSearch searchFunction={searchTransaction} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown merchantDetails={merchantDetails} mobile={true} bulkSettlementKey={bulkSettlementKey} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
        }
    }

    function goBack(){
        setCurrentIndex(1);
    }

    const chargeTypeView = () =>{
        // eslint-disable-next-line default-case
        switch (currentIndex){
            case 0:
                return (
                    <div className="loading-container">
                        <CustomLoader  loadingText="loading charge models..."/>
                    </div>
                )
            case 1:
                return <CustomTable isReload={true} totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={transactions} headers={tableHeaders}/>
            case 2:
                return(
                    <div className="mobile-modal-container">
                        <div className="custom-card">
                            <div className="mobile-card-position">
                                {mobileModal()}
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="p-mt-2">
                        <BulkSettlementBreakDown merchantDetails={merchantDetails} bulkSettlementKey={bulkSettlementKey} goBack={goBack} detials={details} mobile={isMobileTransaction}/>
                    </div>
                )

        }
    }

    function searchTransaction (e){
        setVisible(false);
        setLoading(true);
        setTransactions([]);
        const params = e;
        const pageParam = HELPER.TO_URL_STRING( {
            page: 0,
            status: e?.status || '',
            startDate : e?.startDate || '',
            endDate: e?.endDate || '',
            cardAcceptorId: e?.cardAcceptorId || '',
            size:1
        });
        SERVICES.SEARCH_TRANSACTIONS(params,pageParam)
            .then(data=>{
                const result = data.result.content;
                if(!result.length){
                    setEmptyText('No charge type model yet ...')
                    setSearch(true);
                    setLoading(false);
                }
                else{
                    let arr = [];
                    setTotalItems(data.result.totalItems);
                    setTotalPages(data.result.totalPages);
                    result.forEach(e=>{
                        arr.push({...e,actions:'CR',detailsFunction:openAction});
                    })
                    setTransactions(arr)
                    setError(null);
                    // setCurrentIndex(1);
                    setLoading(false)
                }
            })
            .catch(error=>{
                setError(HELPER.PROCESS_ERROR(error));
                // setCurrentIndex(1);
                setLoading(false)
            })

    }



    function modalFooter(footer){

    }


    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <BulkSettlementSearch searchFunction={searchTransaction} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown footer={modalFooter} transactionSearchKey={bulkSettlementKey} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
        }
    }

    function onHide(){

    }



    return(
        <div>
            <Toast ref={toast} />
            <div>
                <CustomModal onHide={onHide} visible={visible} modalContent={modalContent}/>
            </div>
            <div className="page-title p-text-left">Bulk Settlement</div>
            <div className="p-mt-2">
                <CustomBreadcrumb  page="Manage Bulk Settlement"/>
            </div>
            <div className="floating-buttons desktop-screen">
                <div className="p-grid">
                    <div className="p-col-7">

                    </div>
                    <div className="p-col-5">
                        <div className="p-grid">
                            <div className="p-col-6">
                                {/*<button disabled={loading} onClick={()=>openModal(0,false)} className="primary-button hide-btn-text">*/}
                                {/*    <i className="pi pi-plus"/>*/}
                                {/*    <span className="hide-btn-text"> New model</span>*/}
                                {/*</button>*/}
                            </div>
                            <div className="p-col-6">
                                <div className={HELPER.HAS_AUTHORITY('dcir_view_transactions') && currentIndex === 1?'dcir-show':'dcir-hide'}>
                                    <button disabled={(loading||transactions?.length === 0)} onClick={()=>openModal(1,false)} className="primary-button">
                                        <i className="pi pi-filter"/>
                                        <span className="hide-btn-text"> Filter</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-screen">
                <div className="p-grid">
                    <div className="p-col-9">

                    </div>
                    <div className="p-col-3">
                        <div  className="floating-mobile-buttons add-cursor">
                            <div className={HELPER.HAS_AUTHORITY('dcir_view_transactions') && currentIndex === 1?'dcir-show':'dcir-hide'}>
                                <i onClick={(e) => op.current.toggle(e)} className="pi pi-ellipsis-v" style={{'fontSize': '1.5em','color':'#464DF2'}}/>
                                <OverlayPanel ref={op} id="overlay_panel" style={{width: '100px'}} className="overlaypanel-demo">

                                    {/*<div className="p-mb-3 p-ml-1"><span onClick={()=>openModal(0,true)} className="custom-over-flow-text"><i className="pi pi-plus"/> New</span></div>*/}
                                    <div className="p-mb-2 p-ml-1"><span onClick={()=>openModal(1,true)} className="custom-over-flow-text"><i className="pi pi-filter"/> Filter</span></div>
                                </OverlayPanel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={HELPER.HAS_AUTHORITY('dcir_view_transactions')?'dcir-show':'dcir-hide'}>
                {chargeTypeView()}
            </div>
            <div className={HELPER.HAS_AUTHORITY('dcir_view_transactions')?'dcir-hide':'dcir-show'}>
                <AccessDenied/>
            </div>
        </div>
    )
}

