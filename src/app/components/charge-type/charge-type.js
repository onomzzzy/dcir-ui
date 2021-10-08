import React, {useContext, useEffect, useRef, useState} from "react";
import {CustomBreadcrumb}      from "../../shared/components/custom-breadcrumb/custom-breadcrumb";
import {CustomTable}           from "../../shared/components/custom-table/custom-table";
import {SERVICES}              from "../../core/services/services";
import './charge-type-component.css'
import {CustomLoader}          from "../../shared/components/custom-loader/custom-loader";
import {CustomModal}           from "../../shared/components/custom-modal/custom-modal";
import {CustomChargeTypeModel} from "../configuration/custom-charge-type-model";
import {DetailsBreakDown}      from "../../shared/components/details-break-down/details-break-down";
import {CustomConfirmDialog}   from "../../shared/components/custom-confirm-dialog/custom-confirm-dialog";
import {Toast}                 from "primereact/toast";
import {MainContext}           from "../../../App";
import {CUSTOM_VALIDATION}     from "../../shared/validation/validation";
import {OverlayPanel}          from "primereact/overlaypanel";

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
    const [currentPage,setCurrentPage] = useState(mainContext?.mainState?.currentPage);
    const [range,setRange] = useState(5);
    const [breakDownTitle,setBreakDownTitle] = useState('')
    const [chargeTypeForEdit,setChargeTypeForEdit] = useState(null);

    const [emptyText,setEmptyText] = useState('');
    const [currentModalIndex,setCurrentModalIndex] = useState(0)
    const tableHeaders = [
        {label:'Charge Type',value:'chargeType'},
        {label:'Min Cap',value:'minCap'},
        {label:'Max Cap',value:'maxCap'},
        {label:'Percent',value:'percent'},
        {label:'Actions',value:'actions'}
    ]

    const [details,setDetails] = useState([]);

    const [chargeTypes,setChargeTypes] = useState([])


    useEffect(() => {
            let mounted = true
            if(mounted) {
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
              setVisible(false);
              setModalLoading(false);
               toast.current.show({severity:'success', summary: 'Success', detail:'Charge type deleted successfully', life: 3000});
               reload();
           })
           .catch(error =>{
               setModalLoading(false);
               setModalLoading(false);
               toast.current.show({severity:'error', summary: 'Failed', detail:'Something went wrong ...', life: 3000});
           });

   }

    function openAction(e,action,isMobile){
        // eslint-disable-next-line default-case
      switch (action) {
          case 'VIEW': {
              let arr = [];
              setDetails([]);
              arr.push({label: 'Name', value: e?.chargeName});
              arr.push({label: 'Code', value: e?.chargeCode});
              arr.push({label: 'Description', value: e?.chargeTypeDesc});
              arr.push({label: 'Charge Type', value: e?.chargeType});
              arr.push({label: 'Min Cap', value: e?.minCap});
              arr.push({label: 'Max Cap', value: e?.maxCap});
              arr.push({label: 'Percent', value: e?.percent});
              setDetails(arr);
              setBreakDownTitle('Charge Type')
              openModal(2,isMobile)
              break;
          }
          case 'DELETE':
          setModalLoadingText('Deleting charge type...');
          setItemIdForDelete(e?.id);//remember to change to chargeCode
          setConfirmText(`Are you sure you want to delete ${e?.chargeName}?`);
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
             if(!data.length){
                setEmptyText('No charge type model yet ...')
             }
             else{
                 let arr = [];
                 setTotalItems(data.length);//need adjustment
                 setTotalPages(1);//need adjustment
                 data.forEach(e=>{
                    arr.push({...e,actions:'CRUD',detailsFunction:openAction});
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
                return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
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
               return <CustomTable totalPages={totalPages} totalItems={totalItems} currentPage={currentPage} range={range}  emptyText={emptyText} search={search} reload={reload} error={error} items={chargeTypes} headers={tableHeaders}/>
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
      const params = CUSTOM_VALIDATION.TO_URL_STRING(e);
       SERVICES.SEARCH_CHARGE_MODEL(params)
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
                   arr.push({...e,actions:'CRUD',detailsFunction:openAction});
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
           return <CustomConfirmDialog itemId={itemIdForDelete} confirmText={confirmText} loading={modalLoading} loadingText="Deleting charge type..." fn={deleteChargeType} closeModal={closeModal}/>
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
                <CustomBreadcrumb  page={'Manage Charge Types'}/>
            </div>
            <div className="floating-buttons desktop-screen">
                <div className="p-grid">
                    <div className="p-col-7">

                    </div>
                    <div className="p-col-5">
                        <div className="p-grid">
                            <div className="p-col-6">
                                <button disabled={loading} onClick={()=>openModal(0,false)} className="primary-button hide-btn-text">
                                   <i className="pi pi-plus"/>
                                    <span className="hide-btn-text"> New charge type </span>
                                </button>
                            </div>
                            <div className="p-col-6">
                                <button disabled={(loading||chargeTypes?.length === 0)} onClick={()=>openModal(1,false)} className="primary-button">
                                     <i className="pi pi-filter"/>
                                    <span className="hide-btn-text"> Filter</span>
                                </button>
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

                        <i onClick={(e) => op.current.toggle(e)} className="pi pi-ellipsis-v" style={{'fontSize': '1.5em','color':'#464DF2'}}/>
                            <OverlayPanel ref={op} id="overlay_panel" style={{width: '100px'}} className="overlaypanel-demo">

                           <div className="p-mb-3 p-ml-1"><span onClick={()=>openModal(0,true)} className="custom-over-flow-text"><i className="pi pi-plus"/> New</span></div>
                            <div className="p-mb-2 p-ml-1"><span onClick={()=>openModal(1,true)} className="custom-over-flow-text"><i className="pi pi-filter"/> Filter</span></div>
                            </OverlayPanel>
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
