
import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomBreadcrumb}                               from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {CustomTable}                                    from "../../../shared/components/custom-table/custom-table";
import {SERVICES}                                       from "../../../core/services/services";
import './settlement.css'
import {CustomLoader}                                   from "../../../shared/components/custom-loader/custom-loader";
import {CustomModal}                                    from "../../../shared/components/custom-modal/custom-modal";
import {DetailsBreakDown}                               from "../../../shared/components/details-break-down/details-break-down";
import {CustomConfirmDialog}                            from "../../../shared/components/custom-confirm-dialog/custom-confirm-dialog";
import {Toast}                                          from "primereact/toast";
import {MainContext}                                    from "../../../../App";
import {CUSTOM_VALIDATION}                              from "../../../shared/validation/validation";
import {OverlayPanel}                     from "primereact/overlaypanel";
import {CustomSettlementParticipantModel} from "./custom-settlement-participant-model";
import {HELPER}                           from "../../../shared/helper/helper";


export function SettlementComponent (){
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
    const [totalPages,setTotalPages] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [participantForEdit,setParticipantForEdit] = useState(null);

    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0)

    const tableHeaders = [
        {label:'Name',value:'name'},
        {label:'Bank code',value:'bankCode'},
        {label:'Bank name',value:'bankName'},
        {label:'Account number',value:'accountNumber'},
        {label:'Account name',value:'accountName'},
        {label:'Charge type',value:'chargeType'},
        {label:'Global',value:'global'},
        {label:'Actions',value:'actions'}
    ]

    const participantAuthorities = [
        {label:'UPDATE',value:'dcir_configure_participant'},
        {label:'DELETE',value:'dcir_configure_participant'},
    ]

    const [details,setDetails] = useState([]);

    const [participants,setParticipants] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
                getParticipants();
            }
            return () => {
                mounted = false;
            }
        },[currentPage]
    );

    function deleteChargeType(e){
        setModalLoading(true);
        SERVICES.DELETE_PARTICIPANT(e)
            .then(data=>{
                setVisible(false);
                setModalLoading(false);
                toast.current.show({severity:'success', summary: 'Success', detail:'Participant deleted successfully', life: 3000});
                reload();
            })
            .catch(error =>{
                setModalLoading(false);
                setModalLoading(false);
                toast.current.show({severity:'error', summary: 'Failed', detail:'Something went wrong ...', life: 3000});
            });

    }

    function viewParticipant(id,isMobile){
        SERVICES.VIEW_PARTICIPANT(id)
            .then(data => {
                const e = data?.result;
                let arr = [];
                setDetails([]);
                arr.push({label: 'Participant id', value: e?.participantId});
                arr.push({label: 'Name', value: e?.name});
                arr.push({label: 'Account name', value: e?.accountName});
                arr.push({label: 'Account number', value: e?.accountNumber});
                arr.push({label: 'Bank code', value: e?.bankCode});
                arr.push({label: 'Bank name', value: e?.bankName});
                arr.push({label: 'Charge type code', value: e?.chargeType?.code});
                arr.push({label: 'Charge type', value: e?.chargeType.chargeType.code});
                arr.push({label: 'Flat', value: e?.chargeType?.flat});
                arr.push({label: 'Minimum Cap', value: e?.chargeType?.minimumCap});
                arr.push({label: 'Maximum Cap', value: e?.chargeType?.maximumCap});
                arr.push({label: 'Percentage', value: e?.chargeType?.percentage});
                arr.push({label: 'Description', value: e?.description});
                arr.push({label: 'Global', value: e?.globalCharge?'GLOBAL':'NON GLOBAL'});
                setDetails(arr);
                setBreakDownTitle('Participant')
                openModal(2,isMobile)
            })
            .catch(error=>{

            })
    }

       function openAction(e,action,isMobile){
        // eslint-disable-next-line default-case
         switch (action) {
            case 'VIEW': {
                viewParticipant(e.participantId,isMobile);
                break;
            }
            case 'DELETE':
                setModalLoadingText('Deleting participant...');
                setItemIdForDelete(e?.participantId);//remember to change to chargeCode
                setConfirmText(`Are you sure you want to delete ${e?.name}?`);
                openModal(3,isMobile)
                break;
            case 'UPDATE':
                const participantModel ={
                    name:e?.name,
                    accountName:e?.accountName,
                    accountNumber:e?.accountNumber,
                    chargeType:e?.chargeType,
                    description:e?.description,
                    global:e?.globalCharge,
                    id:e?.participantId
                }
                setParticipantForEdit(participantModel);
                openModal(4,isMobile)
        }
    }


    function getParticipants(){
        setParticipants([]);
        let params ={
            page:0,
            size:10,
            global:true
        }
        params = HELPER.TO_URL_STRING(params);
        SERVICES.GET_PARTICIPANTS(params)
            .then(data=>{
                const result = data?.result?.content
                if(!result?.length){
                    setEmptyText('No settlement participant yet ...')
                }
                else{
                    let arr = [];
                    setTotalItems(data?.result?.totalElements);
                    setTotalPages(data?.result?.totalPages);
                    result?.forEach(e=>{
                        arr.push({...e,global:e.global?'GLOBAL':'NON GLOBAL',chargeType:e.chargeType?.chargeTypeName,actions:'CRUD',detailsFunction:openAction});
                    })
                    setParticipants(arr)
                }
                setError(null);
                setCurrentIndex(1);
                setLoading(false)
            })
            .catch(error=>{
                setError('Unable to get request');
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
        getParticipants();
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
                return <CustomSettlementParticipantModel closeModal={closeModal}/>
            case 1:
                return <CustomSettlementParticipantModel searchFunction={searchParticipant} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
            case 4:
                return <CustomSettlementParticipantModel editChargeType={participantForEdit} isUpdate={true}  closeModal={closeModal}/>
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
                return <CustomTable authorities={participantAuthorities} totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={participants} headers={tableHeaders}/>
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
                const result = data?.result?.content;
                if(!result.length){
                    setEmptyText('No charge type model yet ...')
                    setSearch(true);
                    setLoading(false);
                }
                else{
                    let arr = [];
                    setTotalItems(data.result?.totalElements);
                    setTotalPages(data.result?.totalPages);
                    result?.forEach(e=>{
                        arr.push({...e,global:e.global?'GLOBAL':'NON GLOBAL',chargeType:e.chargeType.code,actions:'CRUD',detailsFunction:openAction});
                    })
                    setParticipants(arr)
                    setError(null);
                    setCurrentIndex(1);
                    setLoading(false)
                }
            })
            .catch(error=>{
                setError('Unable to get request');
                setCurrentIndex(1);
                setLoading(false)
            })

    }

    const modalContent = () =>{
        // eslint-disable-next-line default-case
        switch (currentModalIndex){
            case 0:
                return <CustomSettlementParticipantModel closeModal={closeModal}/>
            case 1:
                return <CustomSettlementParticipantModel searchFunction={searchParticipant} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
            case 4:
                return <CustomSettlementParticipantModel editParticipant={participantForEdit} isUpdate={true}  closeModal={closeModal}/>
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
            <div className="page-title p-text-left">Settlement Participants</div>
            <div className="p-mt-2">
                <CustomBreadcrumb  page="Manage Settlement Participants"/>
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
                                <div className={HELPER.HAS_AUTHORITY('dcir_configure_participant')?'dcir-show':'dcir-hide'}>
                                <button disabled={loading} onClick={()=>openModal(0,false)} className="primary-button hide-btn-text">
                                    <i className="pi pi-plus"/>
                                    <span className="hide-btn-text"> New participant</span>
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
                            <div className={HELPER.HAS_AUTHORITY('dcir_configure_participant')?'dcir-show':'dcir-hide'}>
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
