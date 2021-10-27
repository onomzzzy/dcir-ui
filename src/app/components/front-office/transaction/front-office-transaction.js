import './transaction.css';
import React, {useContext, useEffect, useRef, useState} from "react";
import {Toast}                from "primereact/toast";
import {OverlayPanel}         from "primereact/overlaypanel";
import {SearchTransaction}    from "./search-transaction";
import {TransactionBreakdown} from "./transaction-breakdown";
import {MainContext}          from "../../../../App";
import {HELPER}               from "../../../shared/helper/helper";
import {SERVICES}             from "../../../core/services/services";
import {DetailsBreakDown}     from "../../../shared/components/details-break-down/details-break-down";
import {CustomLoader}         from "../../../shared/components/custom-loader/custom-loader";
import {CustomTable}          from "../../../shared/components/custom-table/custom-table";
import {CustomModal}          from "../../../shared/components/custom-modal/custom-modal";
import {CustomBreadcrumb}     from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {AccessDenied}         from "../../access-denied/access-denied";

export function FrontOfficeTransaction (){
    const toast = useRef(null);
    const op = useRef(null);
    const mainContext = useContext(MainContext);
    const [loading,setLoading] = useState(true)
    const [visible,setVisible] = useState(false)
    const [currentIndex,setCurrentIndex] = useState(0);
    const [error,setError] = useState('');
    const [search,setSearch] = useState(false);
    // const [modalLoading,setModalLoading] = useState(false);
    // const [modalLoadingText,setModalLoadingText] = useState('');
    const [totalPages,setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [isMobileTransaction,setIsMobileTransaction] = useState(false);
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0);
    const [transactionSearchKey,setTransactionSearchKey] = useState('');

    const tableHeaders = [
        {label:'Time',value:'transactionTime'},
        {label:'Masked pan',value:'maskedPan'},
        {label:'Rrn',value:'rrn'},
        {label:'Amount',value:'transactionAmount'},
        {label:'Terminal id',value:'terminalId'},
        {label:'Response code',value:'responseCode'},
        {label: '',value: 'actions'}

    ]

    const [details,setDetails] = useState([]);

    const [transactions,setTransactions] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getTransactions();
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
                getTransactionDetails(e,isMobile);
                break;
            }
        }
    }


    function getTransactionDetails(e,isMobile){
        let arr = [];
        setDetails([]);
        setTransactionSearchKey(e?.transactionSearchKey);
        arr.push({label:'Card acceptor id',value:e?.cardAcceptorId});
        arr.push({label:'Charge amount',value:e?.chargeAmount,itemCase:"chargeAmount"});
        arr.push({label:'Masked pan',value:e?.maskedPan});
        arr.push({label:'Response code',value:e?.responseCode,itemCase:"responseCode"});
        arr.push({label:'Rrn',value:e?.rrn});
        arr.push({label:'Stan',value:e?.stan});
        arr.push({label:'Terminal id',value:e?.terminalId});
        arr.push({label:'FrontOfficeTransaction amount',value:e?.transactionAmount,itemCase:"transactionAmount"});
        arr.push({label:'FrontOfficeTransaction time',value:e?.transactionTime,itemCase:"transactionTime"});

        setDetails(arr);
        setIsMobileTransaction(isMobile);
        setCurrentIndex(3);
    }


    function getTransactions(){
        setTransactions([]);
        let params = {
            page:0,
            size:10
        }
        params = HELPER.TO_URL_STRING(params);
        SERVICES.GET_FRONT_OFFICE_TRANSACTIONS( params )
            .then(data=>{
                const result = data?.result?.content;
                if(!result.length){
                    setEmptyText('No transaction yet ...')
                }
                else{
                    let arr = [];
                    setTotalItems(data?.result.totalItems);//need adjustment
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
        getTransactions();
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
                return <SearchTransaction searchFunction={searchTransaction} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown mobile={true} transactionSearchKey={transactionSearchKey} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
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
                    <TransactionBreakdown transactionSearchKey={transactionSearchKey} goBack={goBack} detials={details} mobile={isMobileTransaction}/>
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
            size:1
        });
        SERVICES.SEARCH_TRANSACTIONS(params,pageParam)
            .then(data=>{
                const result = data.result.content;
                if(!result.length){
                    setEmptyText('No transaction yet ...')
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
                    setLoading(false)
                }
            })
            .catch(error=>{
                setError(HELPER.PROCESS_ERROR(error));
                setLoading(false)
            })

    }



    function modalFooter(footer){

    }


    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <SearchTransaction searchFunction={searchTransaction} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown footer={modalFooter} transactionSearchKey={transactionSearchKey} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
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
            <div className="page-title p-text-left">Transactions</div>
            <div className="p-mt-2">
                <CustomBreadcrumb  page="Manage Transactions"/>
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

