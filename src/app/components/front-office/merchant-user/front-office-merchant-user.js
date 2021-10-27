import './merchant-user.css';
import React, {useContext, useEffect, useRef, useState} from "react";
import {Toast}                 from "primereact/toast";
import {OverlayPanel}          from "primereact/overlaypanel";
import {CreateMerchantUser}    from "./create-merchant-user";
import {MainContext}           from "../../../../App";
import {HELPER}                from "../../../shared/helper/helper";
import {SERVICES}              from "../../../core/services/services";
import {CustomChargeTypeModel} from "../../back-office/configuration/custom-charge-type-model";
import {DetailsBreakDown}      from "../../../shared/components/details-break-down/details-break-down";
import {CustomConfirmDialog}   from "../../../shared/components/custom-confirm-dialog/custom-confirm-dialog";
import {CustomLoader}          from "../../../shared/components/custom-loader/custom-loader";
import {CustomTable}           from "../../../shared/components/custom-table/custom-table";
import {CustomModal}           from "../../../shared/components/custom-modal/custom-modal";
import {CustomBreadcrumb}      from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";


export function FrontOfficeMerchantUser (){
    const toast = useRef(null);
    const op = useRef(null);
    const mainContext = useContext(MainContext);
    const [loading,setLoading] = useState(true)
    const [visible,setVisible] = useState(false)
    const [currentIndex,setCurrentIndex] = useState(0);
    const [error,setError] = useState('');
    const [search,setSearch] = useState(false);
    const [modalLoading,setModalLoading] = useState(false);
    const [confirmText,setConfirmText] = useState('')
    const [itemIdForDelete,setItemIdForDelete] = useState('');
    const [totalPages,setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [chargeTypeForEdit,setChargeTypeForEdit] = useState(null);

    const[detailsLoading,setDetailsLoading] = useState(false);
    const [detailsError,setDetailsError] = useState(null);
    const [detailsId,setDetailsId] = useState(null);
    const [detailsMobile,setDetailsMobile] = useState(false);

    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0)
    const [merchantId,setMerchantId] = useState(null);

    const tableHeaders = [
        {label:'Firstname',value:'firstname'},
        {label:'Lastname',value:'lastname'},
        {label:'Merchant',value:'merchant'},
        {label:'Status',value:'active'},
        {label:'Date',value:'createdAt'},
        {label:'',value:'actions'}
    ]

    const [details,setDetails] = useState([]);

    const [merchantUsers,setMerchantUsers] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getMerchantUsers();
            }
            return () => {
                mounted = false;
            }
        },[currentPage]
    );

    function deleteChargeType(e){

    }

    function reloadDetails(){
        viewMerchantUser(detailsId,detailsMobile);
    }

    function viewMerchantUser(e,isMobile){
        setDetailsError(null);
        setDetailsId(e);
        setDetailsMobile(isMobile);
        setDetailsLoading(true);
        let arr = [];
        const result = e;
        setDetails([]);
        arr.push({label: 'First name', value: result?.firstname});
        arr.push({label: 'Last name', value: result?.lastname});
        arr.push({label: 'Username', value: result?.username});
        arr.push({label: 'Email', value: result?.email});
        arr.push({label: 'Created Date', value: result?.createdAt,itemCase:"transactionTime"});
        arr.push({label: 'Merchant Name', value: result?.merchant?.merchantName});
        arr.push({label: 'Merchant Id', value: result?.merchant?.merchantId});
        arr.push({label: 'Merchant Email', value: result?.merchant?.mainEmail});
        arr.push({label: 'Merchant Phone No', value: result?.merchant?.phoneNumber});
        setDetails(arr);
        setBreakDownTitle('Merchant User')
        setDetailsLoading(false);
        openModal(2,isMobile)
    }

    function openAction(e,action,isMobile){
        // eslint-disable-next-line default-case
        switch (action) {
            case 'VIEW': {
                viewMerchantUser(e,isMobile);
                break;
            }
        }
    }


    function getMerchantUsers(){
        setMerchantUsers([]);
        const params = HELPER.TO_URL_STRING({
            page:0,
            size:10
        })
        SERVICES.GET_FRONT_OFFICE_MERCHANT_USERS(params)
            .then(data=>{
                const result = data.result.content;
                if(!result.length){
                    setEmptyText('No merchant user yet ...')
                }
                else{
                    let arr = [];
                    setTotalItems(data.result.totalElements);
                    setTotalPages(data.result.totalPages);
                    result.forEach(e=>{
                        if(e.username === mainContext?.mainState?.username){
                            setMerchantId(e?.merchantId);
                        }
                        arr.push({...e,merchant:e?.merchantName,
                            merchantId:e?.merchantId,
                            actions:'CR',detailsFunction:openAction});
                    })
                    setMerchantUsers(arr)
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
        getMerchantUsers();
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
            case 0:
                return <CreateMerchantUser merchantId={merchantId} closeModal={closeModal}/>
            case 1:
                return <CreateMerchantUser searchFunction={searchChargeType} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown reload={reloadDetails} error={detailsError} loading={detailsLoading} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
            }
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
                return <CustomTable totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={merchantUsers} headers={tableHeaders}/>
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

        }
    }

    function searchChargeType (e){
        setVisible(false);
        setLoading(true);
        setMerchantUsers([]);
        const params = HELPER.TO_URL_STRING(e);
        SERVICES.SEARCH_CHARGE_MODEL(params)
            .then(data=>{
                if(!data.length){
                    setEmptyText('No merchant user yet ...')
                    setSearch(true);
                    setLoading(false);
                }
                else{
                    let arr = [];
                    setTotalItems(data.length);//need adjustment
                    setTotalPages(1);//need adjustment
                    // data.forEach(e=>{
                    //     arr.push({...e,actions:'CRUD',detailsFunction:openAction});
                    // })
                    setMerchantUsers(arr)
                    setError(null);
                    setLoading(false)
                }
            })
            .catch(error=>{
                setError(HELPER.PROCESS_ERROR(error));
                setLoading(false)
            })

    }



    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 0:
                return <CreateMerchantUser merchantId={merchantId} closeModal={closeModal}/>
            case 1:
                return <CreateMerchantUser searchFunction={searchChargeType} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown reload={reloadDetails} error={detailsError} loading={detailsLoading} title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
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
            <div className="page-title p-text-left">Merchant Users</div>
            <div className="p-mt-2">
                <CustomBreadcrumb  page={'Manage Merchant users'}/>
            </div>
            <div className="floating-buttons desktop-screen">
                <div className="p-grid">
                    <div className="p-col-7">

                    </div>
                    <div className="p-col-5">
                        <div className="p-grid">
                            <div className="p-col-6">
                                {/*<button disabled={(loading||merchantUsers?.length === 0)} onClick={()=>openModal(1,false)} className="primary-button">*/}
                                {/*    <i className="pi pi-filter"/>*/}
                                {/*    <span className="hide-btn-text"> Filter</span>*/}
                                {/*</button>*/}
                            </div>
                            <div className="p-col-6">
                                <div  className={HELPER.HAS_AUTHORITY('dcir_create_merchants_admin')?'dcir-show':'dcir-hide'}>
                                <button disabled={loading || error} onClick={()=>openModal(0,false)} className="primary-button hide-btn-text">
                                    <i className="pi pi-plus"/>
                                    <span className="hide-btn-text"> New user </span>
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
                        <div className="floating-mobile-buttons add-cursor">
                            <div className={HELPER.HAS_AUTHORITY('dcir_create_merchants_admin')?'dcir-show':'dcir-hide'}>
                            <i onClick={(e) => op.current.toggle(e)} className="pi pi-ellipsis-v" style={{'fontSize': '1.5em','color':'#464DF2'}}/>
                            <OverlayPanel ref={op} id="overlay_panel" style={{width: '100px'}} className="overlaypanel-demo">

                                <div className="p-mb-3 p-ml-1"><span onClick={()=>openModal(0,true)} className="custom-over-flow-text"><i className="pi pi-plus"/> New</span></div>
                                {/*<div className="p-mb-2 p-ml-1"><span onClick={()=>openModal(1,true)} className="custom-over-flow-text"><i className="pi pi-filter"/> Filter</span></div>*/}
                            </OverlayPanel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {chargeTypeView()}
            </div>
        </div>
    )
}


