import './new-table.css'
import './custom-table.css'
import {useEffect}         from "react";
import {CustomPagination}  from "../custom-pagination/custom-pagination";
import {Icon}              from "../../icons/icon";
import {SpecialLabelCases} from "../../models/utilities";
import {HELPER}            from "../../helper/helper";




export function NewTable(props) {

    useEffect(() => {
            let mounted = true
            if (mounted) {
                if (props?.columns !== 5) {
                    reDivideColumns();
                }
            }
            return () => {
                mounted = false;
            }
        }, []
    );

    const tableAction = (actions,item) => {
        // eslint-disable-next-line default-case
        switch (actions){
            case 'CRUD':
             return (
                 <span className="dcir-tb-action-position">
                  <span className={HELPER.CAN_PERFORM_ACTION(props?.authorities,'DELETE')?'dcir-show table-action-icon-delete':'dcir-hide'}>
                      <span onClick={()=>item?.detailsFunction(item,'DELETE',props.isMobile)} className="add-cursor"><i className="pi pi-trash"/></span></span>
                      <span className={HELPER.CAN_PERFORM_ACTION(props?.authorities,'UPDATE')?'dcir-show table-action-icon':'dcir-hide'}>
                          <span onClick={()=>item?.detailsFunction(item,'UPDATE',props.isMobile)} className="p-ml-4 add-cursor"><i className="pi pi-pencil"/></span></span>
                 <span onClick={()=>item?.detailsFunction(item,'VIEW',props.isMobile)} className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-eye"/></span>
                 </span>
             )
            case 'CRD':
                return (
                    <span className="dcir-tb-action-position">
                         <span className={HELPER.CAN_PERFORM_ACTION(props?.authorities,'DELETE')?'dcir-show table-action-icon-delete':'dcir-hide'}>
                             <span onClick={()=>item?.detailsFunction(item,'DELETE',props.isMobile)} className="add-cursor"><i className="pi pi-trash"/></span></span>
                 <span onClick={()=>item?.detailsFunction(item,'VIEW',props.isMobile)} className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-eye"/></span>
                 </span>
                )
            case 'CRU':
                return (
                    <span className="dcir-tb-action-position">
                         <span className={HELPER.CAN_PERFORM_ACTION(props?.authorities,'UPDATE')?'dcir-show':'dcir-hide'}>
                             <span onClick={()=>item?.detailsFunction(item,'UPDATE',props.isMobile)} className="add-cursor table-action-icon"><i className="pi pi-pencil"/></span></span>
                 <span onClick={()=>item?.detailsFunction(item,'VIEW',props.isMobile)} className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-eye"/></span>
                 </span>
                )
            case 'CR':
                return (
                    <span onClick={()=>item?.detailsFunction(item,'VIEW',props.isMobile)} className="mobile-table-icon add-cursor">
                    <Icon icon="back"/>
                    </span>
                )
            default:
             return <span/>
        }
    }

    const headers = () => {
        return (
            props.headers.map((item, index) => {
                return (
                    <div key={index.toString()}>
                    <>
                        <div className="dcir-column">
                            <p>{item.label}</p>
                        </div>
                    </>
                    </div>

                )
            })
        )
    }

    const transformView = (itemCase,value) =>{
        let result = value;
        if(itemCase) {
            SpecialLabelCases.forEach(e => {
                if (e.case === itemCase) {
                    result = e.action(value);
                }
            })
        }
        return result?result:'___';
    }

    const tableContent = (item, label) => {
        if(label === 'actions'){
            return(
                <div key={(`${item.id} ${label}`)} className="dcir-column">
                    {tableAction(item[label],item)}
                </div>
            )
        }
        else {
            return (
                <div className="dcir-column">
                    <p>{transformView(label,item[label])}</p>
                </div>
            )
        }
    }

    const tableValues = () => {
        return (
            props.items.map((item, index) => {
                    return (
                        <div key={index.toString()} className="dcir-row table-body-text">
                            <>
                                {props.headers.map((headerContent, index) => {
                                    return (
                                        <div key={index.toString()}>
                                            {tableContent(item, headerContent.value)}
                                        </div>
                                    )
                                })}
                            </>
                        </div>
                    )
                }
            )
        );
    }


    function reDivideColumns(){
        let i;
        const newColumnSize = 100/ props.columns;
        let elements = document.getElementsByClassName("dcir-column");
        for (i = 0; i < elements.length; i++) {
            elements[i].style.width = `${newColumnSize}%`;
        }
    }

    return(
        <div style={{position:'relative'}}>
        <div style={{display:props?.isReload?'block':'none'}} onClick={()=>props?.reload()} className="custom-table-refresh">
            <span>
                <i className="pi pi-refresh p-px-1"/>
                <span className="p-px-1">Reset</span>
            </span>
            </div>
       <div className="table-container">
       <div style={{marginTop:props.isReload?'1.4em':'0'}} className="table-card">
           <div className="dcir-row table-header">
               {headers()}
           </div>
           {tableValues()}
       </div>
    </div>
    <div className="custom-page-card">
        <CustomPagination totalPages={props.totalPages} totalItems={props.totalItems} currentPage={props.currentPage} range={props.range} />
    </div>
        </div>
    )
}
