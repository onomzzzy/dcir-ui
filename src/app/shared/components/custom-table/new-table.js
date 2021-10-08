import './new-table.css'
import {useEffect}         from "react";
import {CustomPagination}  from "../custom-pagination/custom-pagination";
import {Icon}              from "../../icons/icon";
import {SpecialLabelCases} from "../../models/utilities";




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
                 <span onClick={()=>item?.detailsFunction(item,'DELETE',props.isMobile)} className="add-cursor table-action-icon-delete"><i className="pi pi-trash"/></span>
                 <span onClick={()=>item?.detailsFunction(item,'UPDATE',props.isMobile)} className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-pencil"/></span>
                 <span onClick={()=>item?.detailsFunction(item,'VIEW',props.isMobile)} className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-eye"/></span>
                 </span>
             )
            case 'CRU':
                return (
                    <span className="dcir-tb-action-position">
                 <span onClick={()=>item?.detailsFunction(item,'UPDATE',props.isMobile)} className="add-cursor table-action-icon"><i className="pi pi-pencil"/></span>
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
                    <>
                        <div key={index.toString()} className="dcir-column">
                            <p>{item.label}</p>
                        </div>
                    </>

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
        return result;
    }

    const tableContent = (item, label) => {
        if(label === 'actions'){
            return(
                <div className="dcir-column">
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
                                        tableContent(item, headerContent.value)
                                    )
                                })}
                            </>
                        </div>
                    )
                }
            )
        )
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
        <div>
    <div className="table-container">
       <div className="table-card">
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
