
import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomBreadcrumb}                               from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {CustomTable}                                    from "../../../shared/components/custom-table/custom-table";
import {SERVICES}                                       from "../../../core/services/services";
import './merchant.css'
import {CustomLoader}                                   from "../../../shared/components/custom-loader/custom-loader";
import {CustomModal}                                    from "../../../shared/components/custom-modal/custom-modal";
import {DetailsBreakDown}                               from "../../../shared/components/details-break-down/details-break-down";
import {CustomConfirmDialog}                            from "../../../shared/components/custom-confirm-dialog/custom-confirm-dialog";
import {Toast}                                          from "primereact/toast";
import {MainContext}                                    from "../../../../App";
import {CUSTOM_VALIDATION}                              from "../../../shared/validation/validation";
import {OverlayPanel}                                   from "primereact/overlaypanel";
import {CreateMerchantComponent}                        from "./create-merchant-component";
import {HELPER}                                         from "../../../shared/helper/helper";
import {AccessDenied}                                   from "../../access-denied/access-denied";

export function MerchantTable (){
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
    const [confirmText,setConfirmText] = useState('')
    const [itemIdForDelete,setItemIdForDelete] = useState('');
    const [itemIdForDeactivation,setItemIdForDeactivation] = useState('');
    const [totalPages,setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [confirmModalError,setConfirmModalError] = useState(null);
    const [confirmModalSuccess,setConfirmModalSuccess] = useState(null);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [merchantForEdit,setMerchantForEdit] = useState(null);

    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0)

    const tableHeaders = [
         {label:'Merchant Id',value:'merchantId'},
         {label:'Merchant Name',value:'merchantName'},
         {label:'Email',value:'mainEmail'},
         {label:'phone Number',value:'phoneNumber'},
         {label:'Support Email',value:'supportEmail'},
        {label:'Actions',value:'actions'}
     ]

    const merchantAuthorities = [
        {label:'UPDATE',value:'dcir_update_merchants'},
        {label:'DEACTIVATE',value:'dcir_deactivate_merchants'},
    ]

    const [details,setDetails] = useState([]);

    const [participants,setParticipants] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getMerchants();
            }
            return () => {
                mounted = false;
            }
        },[currentPage]
    );

    function deleteChargeType(e){
        setModalLoading(true);
        SERVICES.DELETE_MERCHANT(e)
            .then(data=>{
                setVisible(false);
                setModalLoading(false);
                toast.current.show({severity:'success', summary: 'Success', detail:'Merchant deleted successfully', life: 3000});
                reload();
            })
            .catch(error =>{
                setModalLoading(false);
                setModalLoading(false);
                toast.current.show({severity:'error', summary: 'Failed', detail:'Something went wrong ...', life: 3000});
            });

    }

     function deactivateUser(e){
         setModalLoading(true);
         setConfirmModalError(null);
         setConfirmModalSuccess(null);
        const params = {
             id: e,
             status: false
        }
        SERVICES.DEACTIVATE_MERCHANT(params)
            .then(data=>{
                setConfirmModalSuccess('Merchant deactivated successfully');
                setModalLoading(false);
            })
            .catch(error=>{
                setConfirmModalError(HELPER.PROCESS_ERROR(error));
                setModalLoading(false);
            })

     }



    function openAction(e,action,isMobile){
        // eslint-disable-next-line default-case
        switch (action) {
            case 'VIEW': {
                getMerchantDetails(e?.merchantId,isMobile);
                }
                break;
            case 'UPDATE':
                getMerchantForEdit(e?.merchantId,isMobile)
                break;
            case 'DEACTIVATE':
                deactivateMerchant(e,isMobile);
                break;

        }
    }

    function deactivateMerchant(e,isMobile){
     setConfirmModalError(null);
     setConfirmModalSuccess(null);
      setModalLoading(true);
      openModal(5,isMobile)
      setItemIdForDeactivation(e?.merchantId)
      setConfirmText(`Are you sure you want to deactivate ${e.merchantName}`);
      setModalLoading(false);
    }

    function getMerchantForEdit(id,isMobile){
        SERVICES.GET_MERCHANT(id)
            .then(data=> {
                const e = data.result
                const updateData ={
                    disputeEmail: e?.disputeEmail,
                    mainEmail: e?.mainEmail,
                    merchantId: e?.merchantId,
                    merchantName: e?.merchantName,
                    phoneNumber: e?.phoneNumber,
                    settlementEmail: e?.settlementEmail,
                    supportEmail: e.supportEmail
                }
                setMerchantForEdit(updateData);
                openModal(4,isMobile)
            })
            .catch(error =>{

            })
    }

    function getMerchantDetails(id,isMobile){
        let arr = [];
        setDetails([]);
        SERVICES.GET_MERCHANT(id)
            .then(data=>{
                const e = data.result;
                arr.push({label: 'Merchant Name', value: e?.merchantName});
                arr.push({label: 'email', value: e?.mainEmail});
                arr.push({label: 'Phone number', value: e?.phoneNumber});
                arr.push({label: 'Card acceptor id', value: e?.cardAcceptorId});
                arr.push({label: 'Other number', value: e?.alternatePhoneNumber});
                arr.push({label: 'Support email', value: e?.supportEmail});
                arr.push({label: 'Settlement email', value: e?.settlementEmail});
                arr.push({label: 'Dispute email', value: e?.disputeEmail});

                arr.push({label: 'Account name', value: e?.accountName});
                arr.push({label: 'Account number', value: e?.accountNumber});
                arr.push({label: 'Charge type', value: e?.chargeType?.code});
                arr.push({label: 'Settlement type', value: e?.settlementType?.code});

                setDetails(arr);
                setBreakDownTitle('Merchant')
                openModal(2,isMobile)
            })
            .catch(data=>{

            })
    }


    function getMerchants(){
        setParticipants([]);
       let params ={
            page:0,
            size:10
        }
        params = HELPER.TO_URL_STRING(params);
        SERVICES.GET_MERCHANTS(params)
            .then(data=>{
                const result = data?.result.content
                if(!result.length){
                    setEmptyText('No merchant yet ...')
                }
                else{
                    let arr = [];
                    setTotalItems(data?.result?.totalElements);
                    setTotalPages(data?.result.totalPages);
                    result.forEach(e=>{
                        arr.push({...e,actions:'CRUDE',detailsFunction:openAction});
                    })
                    setParticipants(arr)
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
        getMerchants();
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
                return <CreateMerchantComponent closeModal={closeModal}/>
            case 1:
                return <CreateMerchantComponent searchFunction={searchParticipant} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
            case 4:
                return <CreateMerchantComponent editMerchant={merchantForEdit} isUpdate={true}  closeModal={closeModal}/>
            case 5:
                return <CustomConfirmDialog success={confirmModalSuccess} toastError={confirmModalError} itemId={itemIdForDeactivation} confirmText={confirmText} loading={modalLoading} loadingText="Deactivating merchant..." fn={deactivateUser} closeModal={closeModal}/>
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
                return <CustomTable authorities={merchantAuthorities} totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={participants} headers={tableHeaders}/>
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

    function searchParticipant (e){
        setVisible(false);
        setLoading(true);
        setParticipants([]);
        const params = HELPER.TO_URL_STRING(e);
        SERVICES.SEARCH_PARTICIPANT(params)
            .then(data=>{
                if(!data.length){
                    setEmptyText('No charge type model yet ...')
                    setSearch(true);
                    setLoading(false);
                }
                else{
                    let arr = [];
                    setTotalItems(data.length);//need adjustment
                    setTotalPages(1);//need adjustment
                    data.forEach(e=>{
                        arr.push({...e,actions:'CRU',detailsFunction:openAction});
                    })
                    setParticipants(arr)
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
                return <CreateMerchantComponent closeModal={closeModal}/>
            case 1:
                return <CreateMerchantComponent searchFunction={searchParticipant} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
            case 4:
                return <CreateMerchantComponent editMerchant={merchantForEdit} isUpdate={true}  closeModal={closeModal}/>
            case 5:
                return <CustomConfirmDialog success={confirmModalSuccess} toastError={confirmModalError} itemId={itemIdForDeactivation} confirmText={confirmText} loading={modalLoading} loadingText="Deactivating merchant..." fn={deactivateUser} closeModal={closeModal}/>
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
            <div className="page-title p-text-left">Merchant</div>
            <div className="p-mt-2">
                <CustomBreadcrumb  page="Manage merchants"/>
            </div>
            <div className="floating-buttons desktop-screen">
                <div className="p-grid">
                    <div className="p-col-7">

                    </div>
                    <div className="p-col-5">
                        <div className="p-grid">
                            <div className="p-col-6">
                                {/*<button disabled={(loading||participants?.length === 0)} onClick={()=>openModal(1,false)} className="primary-button">*/}
                                {/*    <i className="pi pi-filter"/>*/}
                                {/*    <span className="hide-btn-text"> Filter</span>*/}
                                {/*</button>*/}
                            </div>
                            <div className="p-col-6">
                                <div className={HELPER.HAS_AUTHORITY('dcir_create_merchants')?'dcir-show':'dcir-hide'}>
                                <button disabled={loading} onClick={()=>openModal(0,false)} className="primary-button hide-btn-text">
                                    <i className="pi pi-plus"/>
                                    <span className="hide-btn-text"> New merchant</span>
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
                        <div className={HELPER.HAS_AUTHORITY('dcir_create_merchants')?'dcir-show':'dcir-hide'}>
                        <div className="floating-mobile-buttons add-cursor">

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
            <div className={HELPER.HAS_AUTHORITY('dcir_view_merchants')?'dcir-show p-mt-2':'dcir-hide'}>
                {chargeTypeView()}
            </div>
            <div className={HELPER.HAS_AUTHORITY('dcir_view_merchants')?'dcir-hide p-mt-2':'dcir-show'}>
                <AccessDenied/>
            </div>
        </div>
    )
}
