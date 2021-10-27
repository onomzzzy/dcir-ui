
import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomTable}                                    from "../../../shared/components/custom-table/custom-table";
import {SERVICES}                                       from "../../../core/services/services";
import {CustomLoader}                                   from "../../../shared/components/custom-loader/custom-loader";
import {CustomModal}                                    from "../../../shared/components/custom-modal/custom-modal";
import {DetailsBreakDown}                               from "../../../shared/components/details-break-down/details-break-down";
import {Toast}                                          from "primereact/toast";
import {MainContext}                                    from "../../../../App";
import {HELPER}                                         from "../../../shared/helper/helper";
import {AccessDenied}                                   from "../../access-denied/access-denied";
import {BulkTransactionBreakDown}                       from "./bulk-transaction-break-down";


export function BulkTransactions (props){
    const toast = useRef(null);
    const op = useRef(null);
    const mainContext = useContext(MainContext);
    const [loading,setLoading] = useState(true)
    const [visible,setVisible] = useState(false)
    const [currentIndex,setCurrentIndex] = useState(0);
    const [error,setError] = useState('');
    const [search,setSearch] = useState(false);
    const [modalLoading,setModalLoading] = useState(false);
    const [modalLoadingText,setModalLoadingText] = useState('');
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
        console.log('...action.... ',action)
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
        // setBreakDownTitle('FrontOfficeTransaction')
        setIsMobileTransaction(isMobile);
        console.log('arr... ',arr)
        setCurrentIndex(3);
        // openModal(2,isMobile)
    }


    function getTransactions(){
        setTransactions([]);
        let params = {
            page:0,
            size:10
        }
        params = HELPER.TO_URL_STRING(params);
        SERVICES.GET_BULK_SETTLEMENT_TRANSACTION(params,props.bulkSettlementKey )
            .then(data=>{
                const result = data?.result?.content;
                if(!result.length){
                    setEmptyText('No transaction yet ...')
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
                return ''
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
                        <CustomLoader loadingText="loading charge models..."/>
                    </div>
                )
            case 1:
                return <CustomTable isReload={true} totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}
                        emptyText={emptyText} search={search} reload={reload} error={error} items={transactions} headers={tableHeaders}/>
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
                      <BulkTransactionBreakDown details={details}/>
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
                return ''
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
            <div className={currentIndex !== 3?'dcir-show page-title-sm p-text-left':'dcir-hide'}>Transactions</div>
            <div className="p-mt-6">
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

