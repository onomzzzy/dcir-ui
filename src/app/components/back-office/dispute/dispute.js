import './dispute.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomBreadcrumb}                               from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {CustomTable}                                    from "../../../shared/components/custom-table/custom-table";
import {SERVICES}                                       from "../../../core/services/services";
import {CustomLoader}                                   from "../../../shared/components/custom-loader/custom-loader";
import {CustomModal}                                    from "../../../shared/components/custom-modal/custom-modal";
import {Toast}                                          from "primereact/toast";
import {MainContext}                                    from "../../../../App";
import {OverlayPanel}                                   from "primereact/overlaypanel";
import {DisputeBreakdown}                               from "./dispute-breakdown";
import {DisputeSearch}                                  from "./dispute-search";
import {HELPER}                                         from "../../../shared/helper/helper";


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
    const [emptyText,setEmptyText] = useState('');
    const [mobile,setMobile] = useState(false);
    const [logCode,setLogCode] = useState(null);
    const [currentModalIndex,setCurrentModalIndex] = useState(0);
    const [disputeDetails,setDisputeDetails] = useState([])
    const [disputes,setDisputes] = useState([])
    const [ disputeExpiringDate, setDisputeExpiringDate] =useState(null)
    const [disputeStatus,setDisputeStatus] = useState(null)
    const [loggedBy,setLoggedBy] = useState(null)


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

    function populateDetails(e){
        const arr = [];
        setLogCode(e.logCode);
        setLoggedBy(e.loggedBy);
        setDisputeStatus(e.status);
        setDisputeExpiringDate(e.tatExpiryDate);
        arr.push({label:'Log code',value:e.logCode});
        arr.push({label:'Logged by',value:e.loggedBy});
        arr.push({label:'Merchant id',value:e.merchantId});
        arr.push({label:'Merchant name',value:e.merchantName});
        arr.push({label:'Customer account name',value:e.customerAccountName});
        arr.push({label:'Customer account no',value:e.customerAccountNumber});
        arr.push({label:'Transaction search key',value:e.transactionSearchKey});
        arr.push({label:'Transaction amount',value:e.transactionAmount,itemCase:'transactionAmount'})
        arr.push({label:'Transaction time',value:e.transactionTime,itemCase:'createdOn'});
        arr.push({label:'Response code',value:e.transactionResponseCode,itemCase:'responseCode'});
        arr.push({label:"Resolution status",value:e.resolutionStatus,itemCase:'resolutionStatus'});
        arr.push({label:'Resolved by',value:e.resolvedBy||'___'});
        arr.push({label:"Status",value:e.status,itemCase:'status'});
        arr.push({label:'Created date',value:e.createdOn,itemCase:'createdOn'});
        setDisputeDetails(arr);
    }

    function getTransactionDetails(e,isMobile){
        populateDetails(e);
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
                            ...e,
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
                 <DisputeBreakdown loggedBy={loggedBy} disputeExpiringDate={disputeExpiringDate} disputeStatus={disputeStatus} logCode={logCode} disputeDetails={disputeDetails} goBack={goBack} mobile={mobile}/>
             )

        }
    }

    function searchTransaction (e){
        setVisible(false);
        setLoading(true);
        setDisputes([]);
        console.log('e',e);
        const params = HELPER.TO_URL_STRING({
            page:0,
            size:10,
            pending:e.resolutionStatus || '',
            status:e.status || '',
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
                            ...e,
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

    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 1:
                return <DisputeSearch searchFunction={searchTransaction} closeModal={closeModal}/>
        }
    }

    function onHide(){

    }

  const filterView = () =>{
        if(currentIndex === 1){
            return(
                <button disabled={loading} onClick={()=>openModal(1,false)} className="primary-button">
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

