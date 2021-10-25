import './dispute.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomBreadcrumb}  from "../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {CustomTable}       from "../../shared/components/custom-table/custom-table";
import {SERVICES}          from "../../core/services/services";
import {CustomLoader}      from "../../shared/components/custom-loader/custom-loader";
import {CustomModal}       from "../../shared/components/custom-modal/custom-modal";
import {DetailsBreakDown}  from "../../shared/components/details-break-down/details-break-down";
import {Toast}             from "primereact/toast";
import {MainContext}       from "../../../App";
import {OverlayPanel}      from "primereact/overlaypanel";
import {DisputeBreakdown}  from "./dispute-breakdown";
import {DisputeSearch}     from "./dispute-search";
import {HELPER}            from "../../shared/helper/helper";

export function Dispute (){
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
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [emptyText,setEmptyText] = useState('');
    const [mobile,setMobile] = useState(false);
    const [logCode,setLogCode] = useState(null);
    const [currentModalIndex,setCurrentModalIndex] = useState(0);
    const [transactionSearchKey,setTransactionSearchKey] = useState('');


    const tableHeaders = [
        {label:'Log code',value:'logCode'},
        {label:'Customer Name',value:'customerName'},
        {label:'Account no',value:'customerAccountNumber'},
        {label:'Amount',value:'transactionAmount'},
        {label:'Date',value:'transactionDate'},
        {label:'Resolution status',value:'resolutionStatus'},
        {label:'Status',value:'status'},
        {label: '',value: 'actions'}

    ]

    const [details,setDetails] = useState([]);

    const [disputes,setDisputes] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getDisputes();
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
        setLogCode(e.logCode);
        setMobile(!!isMobile);
        setCurrentIndex(3)
    }


    function getDisputes(){
        setDisputes([]);
        const params = HELPER.TO_URL_STRING({
            status:'PENDING',
            page:0,
            size:10
        });
        SERVICES.GET_DISPUTE(params)
            .then(data=>{
                const result = data.result.content;
                if(!result.length){
                    setEmptyText('No dispute yet ...')
                }
                else{
                    let arr = [];
                    setTotalItems(data?.result?.totalElements);
                    setTotalPages(data?.result?.totalPages);
                    result.forEach(e=>{
                        arr.push({
                            logCode:e.logCode,
                            customerName:e.customerAccountName,
                            customerAccountNumber:e.customerAccountNumber,
                            transactionAmount:e.transactionAmount,
                            transactionDate:e.transactionTime,
                            resolutionStatus:e.resolutionStatus,
                            status:e.status,
                            actions:'CR',detailsFunction:openAction
                        })
                    })
                    setDisputes(arr)
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
        getDisputes();
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
                return <DisputeSearch searchFunction={searchTransaction} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown transactionSearchKey={transactionSearchKey} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
        }
    }

    const chargeTypeView = () =>{
        // eslint-disable-next-line default-case
        switch (currentIndex){
            case 0:
                return (
                    <div className="loading-container">
                        <CustomLoader  loadingText="loading dispute..."/>
                    </div>
                )
            case 1:
                return <CustomTable totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={disputes} headers={tableHeaders}/>
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
                 <DisputeBreakdown goBack={goBack} mobile={mobile} logCode={logCode}/>
             )

        }
    }

    function searchTransaction (e){
        setVisible(false);
        setLoading(true);
        setDisputes([]);
        const params = HELPER.TO_URL_STRING(e);
        SERVICES.SEARCH_TRANSACTIONS(params)
            .then(data=>{
                if(!data.length){
                    setEmptyText('No Dispute yet ...')
                    setSearch(true);
                    setLoading(false);
                }
                else{
                    let arr = [];
                    setTotalItems(data.content.length);//need adjustment
                    setTotalPages(1);//need adjustment
                    data.content.forEach(e=>{
                        arr.push({...e,actions:'CR',detailsFunction:openAction});
                    })
                    setDisputes(arr)
                    setError(null);
                    // setCurrentIndex(1);
                    setLoading(false)
                }
            })
            .catch(error=>{
                setError('Unable to get request');
                // setCurrentIndex(1);
                setLoading(false)
            })

    }

    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <DisputeSearch searchFunction={searchTransaction} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown transactionSearchKey={transactionSearchKey} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
        }
    }

    function onHide(){

    }

  const filterView = () =>{
        if(currentIndex === 1){
            return(
                <button disabled={(loading||disputes?.length === 0)} onClick={()=>openModal(1,false)} className="primary-button">
                    <i className="pi pi-filter"/>
                    <span className="hide-btn-text"> Filter</span>
                </button>
            )
        }
        else{
            return <div/>
        }
  }

  const viewMobileFilter = () =>{
        if(currentIndex === 1){
            return(
                <div className="floating-mobile-buttons add-cursor">
                    <i onClick={(e) => op.current.toggle(e)} className="pi pi-ellipsis-v" style={{'fontSize': '1.5em','color':'#464DF2'}}/>
                    <OverlayPanel ref={op} id="overlay_panel" style={{width: '100px'}} className="overlaypanel-demo">
                        <div className="p-mb-2 p-ml-1"><span onClick={()=>openModal(1,true)} className="custom-over-flow-text"><i className="pi pi-filter"/> Filter</span></div>
                    </OverlayPanel>
                </div>
            )
        }
        else{
            return <div/>
        }
  }

  function goBack(){
        setCurrentIndex(1);
  }

    return(
        <div>
            <Toast ref={toast} />
            <div>
                <CustomModal onHide={onHide} visible={visible} modalContent={modalContent}/>
            </div>
            <div className="page-title p-text-left">Disputes</div>
            <div className="p-mt-2">
                <CustomBreadcrumb  page="Manage Disputes"/>
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
                                {filterView()}
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
                        {viewMobileFilter()}
                    </div>
                </div>
            </div>
            <div>
                {chargeTypeView()}
            </div>
        </div>
    )
}

