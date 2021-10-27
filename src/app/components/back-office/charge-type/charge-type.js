import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomBreadcrumb}                               from "../../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {CustomTable}                                    from "../../../shared/components/custom-table/custom-table";
import {SERVICES}                                       from "../../../core/services/services";
import './charge-type-component.css'
import {CustomLoader}                                   from "../../../shared/components/custom-loader/custom-loader";
import {CustomModal}           from "../../../shared/components/custom-modal/custom-modal";
import {CustomChargeTypeModel} from "../configuration/custom-charge-type-model";
import {DetailsBreakDown}      from "../../../shared/components/details-break-down/details-break-down";
import {CustomConfirmDialog}                            from "../../../shared/components/custom-confirm-dialog/custom-confirm-dialog";
import {Toast}                                          from "primereact/toast";
import {MainContext}                                    from "../../../../App";
import {CUSTOM_VALIDATION}                              from "../../../shared/validation/validation";
import {OverlayPanel}                                   from "primereact/overlaypanel";
import {HELPER}                                         from "../../../shared/helper/helper";

export function ChargeTypeComponent (){
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
    const [currentPage,setCurrentPage] = useState(1);
    const [range,setRange] = useState(5);
    const [toastError,setToastError] = useState(null);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [successMessage,setSuccessMessage] = useState(null);
    const [chargeTypeForEdit,setChargeTypeForEdit] = useState(null);

    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0)
    const tableHeaders = [
        {label:'Charge Type',value:'chargeType'},
        {label:'Flat',value:'flat'},
        {label:'Min Cap',value:'minimumCap'},
        {label:'Max Cap',value:'maximumCap'},
        {label:'Percent',value:'percentage'},
        {label:'Actions',value:'actions'}
    ]

    const chargeTypeAuthorities = [
        {label:'UPDATE',value:'dcir_configure_charges'},
        {label:'DELETE',value:'dcir_configure_charges'},
    ]

    const [details,setDetails] = useState([]);

    const [chargeTypes,setChargeTypes] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
               setCurrentPage(mainContext?.mainState?.currentPage)
               getChargeType();
            }
            return () => {
                mounted = false;
            }
        },[currentPage]
    );

   function deleteChargeType(e){
       setModalLoading(true);
       SERVICES.DELETE_CHARGE_MODEL(e)
           .then(data=>{
              console.log('Charge type deleted successfully',data);
              setSuccessMessage('Charge type deleted successfully')
              setModalLoading(false);
              // reload();
           })
           .catch(error =>{
               setModalLoading(false);
               setToastError(HELPER.PROCESS_ERROR(error))
           });

   }

   function viewChargeType(code,isMobile){
       setDetails([]);
       SERVICES.VIEW_CHARGE_MODEL(code)
           .then(data=>{
               const e = data.result;
               let arr = [];
               arr.push({label: 'Name', value: e?.chargeTypeName});
               arr.push({label: 'Code', value: e?.code});
               arr.push({label: 'Description', value: e?.chargeTypeDesc});
               arr.push({label: 'flat', value: e?.flat});
               arr.push({label: 'Charge Type', value: e?.chargeType?.code});
               arr.push({label: 'Min Cap', value: e?.minimumCap});
               arr.push({label: 'Max Cap', value: e?.maximumCap});
               arr.push({label: 'Percent', value: e?.percentage});
               setDetails(arr);
               setBreakDownTitle('Charge Type')
               openModal(2,isMobile)
           })
           .catch(error=>{

           })
   }

    function openAction(e,action,isMobile){
        // eslint-disable-next-line default-case
      switch (action) {
          case 'VIEW': {
              viewChargeType(e?.code,isMobile)
              break;
          }
          case 'DELETE':
          setModalLoadingText('Deleting charge type...');
          setItemIdForDelete(e?.code);//remember to change to chargeCode
          setConfirmText(`Are you sure you want to delete ${e?.chargeTypeName}?`);
          openModal(3,isMobile)
          break;
          case 'UPDATE':
          const chargeModel ={
          chargeType:e?.chargeType,
          minCap:e?.minCap,
          maxCap:e?.maxCap,
          percent:e?.percent,
          flat:e?.flat,
          chargeName:e?.chargeName,
          chargeCode:e?.chargeCode,
          chargeTypeDesc:e?.chargeTypeDesc,
          id:e?.id
          }
          setChargeTypeForEdit(chargeModel);
          openModal(4,isMobile)
      }
    }


    function getChargeType(){
       setChargeTypes([]);
        SERVICES.GET_CHARGE_MODELS()
            .then(data=>{
             if(!data.result.length){
                setEmptyText('No charge type model yet ...')
             }
             else{
                 let arr = [];
                 setTotalItems(data?.result?.length);//need adjustment
                 setTotalPages(1);//need adjustment
                 data?.result?.forEach(e=>{
                    arr.push({...e,chargeType:e.chargeType.code,actions:'CRD',detailsFunction:openAction});
                 })
                 setChargeTypes(arr)
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
        getChargeType();
    }

    function closeModal(isReload?){

        setToastError(null);

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
                return <CustomChargeTypeModel closeModal={closeModal}/>
            case 1:
                return <CustomChargeTypeModel searchFunction={searchChargeType} isSearch={true} closeModal={closeModal}/>
            case 2:
                return <DetailsBreakDown title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
            case 3:
                return <CustomConfirmDialog success={successMessage} toastError={toastError} itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
            case 4:
                return <CustomChargeTypeModel editChargeType={chargeTypeForEdit} isUpdate={true}  closeModal={closeModal}/>
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
               return <CustomTable authorities={chargeTypeAuthorities} totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={chargeTypes} headers={tableHeaders}/>
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
       setChargeTypes([]);
      const params = HELPER.TO_URL_STRING(e);
       SERVICES.SEARCH_CHARGE_MODEL(params)
       .then(data=>{
           if(!data.result.length){
               setEmptyText('No charge type model yet ...')
               setSearch(true);
               setLoading(false);
           }
           else{
               let arr = [];
               setTotalItems(data.result.length);//need adjustment
               setTotalPages(1);//need adjustment
               data.result.forEach(e=>{
                   arr.push({...e,actions:'CRD',detailsFunction:openAction});
               })
               setChargeTypes(arr)
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
           case 0:
           return <CustomChargeTypeModel closeModal={closeModal}/>
           case 1:
           return <CustomChargeTypeModel searchFunction={searchChargeType} isSearch={true} closeModal={closeModal}/>
           case 2:
           return <DetailsBreakDown title={breakDownTitle} breakDown={details} closeModal={closeModal}/>
           case 3:
           return <CustomConfirmDialog  success={successMessage} toastError={toastError} itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
           case 4:
           return <CustomChargeTypeModel editChargeType={chargeTypeForEdit} isUpdate={true}  closeModal={closeModal}/>
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
            <div className="page-title p-text-left">Charge Type</div>
            <div className="p-mt-2">
                <CustomBreadcrumb page={'Manage Charge Types'}/>
            </div>
            <div className="floating-buttons desktop-screen">
                <div className="p-grid">
                    <div className="p-col-7">

                    </div>
                    <div className="p-col-5">
                        <div className="p-grid">
                            <div className="p-col-6">
                                {/*<button disabled={(loading||chargeTypes?.length === 0)} onClick={()=>openModal(1,false)} className="primary-button">*/}
                                {/*     <i className="pi pi-filter"/>*/}
                                {/*    <span className="hide-btn-text"> Filter</span>*/}
                                {/*</button>*/}
                            </div>
                            <div className="p-col-6">
                                <div className={HELPER.HAS_AUTHORITY('dcir_configure_charges')?'dcir-show':'dcir-hide'}>
                                <button disabled={loading} onClick={()=>openModal(0,false)} className="primary-button hide-btn-text">
                                   <i className="pi pi-plus"/>
                                    <span className="hide-btn-text"> New charge type </span>
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
                            <div className={HELPER.HAS_AUTHORITY('dcir_configure_charges')?'dcir-show':'dcir-hide'}>
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
