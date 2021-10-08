import './custom-table.css';
import {Icon}              from "../../icons/icon";
import {Divider}           from "primereact/divider";
import {NewTable}          from "./new-table";
import {CustomPagination}  from "../custom-pagination/custom-pagination";
import {SpecialLabelCases} from "../../models/utilities";

export function CustomTable(props) {


    const tableView = () =>{
       if(props.items.length){
          return(
              <div>
                  <div className="raiseTable desktop-screen">
                      <NewTable isMobile={false} totalPages={props.totalPages} totalItems={props.totalItems} currentPage={props.currentPage} range={props.range} items={props.items} headers={props.headers} columns={props?.headers?.length}/>
                  </div>
                  <div className="mobile-screen">
                      <div className="custom-mobile-table-card mobile-table p-shadow-1">
                          {mobileTable()}
                          <div className="p-text-center">
                              <CustomPagination totalPages={props.totalPages} totalItems={props.totalItems} currentPage={props.currentPage} range={props.range} />
                          </div>
                      </div>
                  </div>
              </div>
          )
       }
       else{
           if(props.error){
               return(
               <div>
               {errorView()}
               </div>
               )
           }
           else{
               return (
                       <div>
                           {emptyView()}
                       </div>
               )
           }
       }
    }

    const errorView = () =>{

        return(
            <div>
                <div className="empty-container">
                    <Icon icon="error-message-icon"/>
                    <div>
                        <p className="empty-text">{props.error}</p>
                    </div>
                    <div className="p-mt-3">
                        <button onClick={()=>props.reload()} className="primary-button">Reload</button>
                    </div>
                </div>
            </div>
        )
    }

    const emptyView = () =>{
        if(props.search){
            return(
                <div>
                    <div className="empty-container">
                        <div className="adjust-empty-icon">
                            <Icon icon="no-item"/>
                        </div>
                    <div>
                    <p className="empty-text-two">{props.emptyText}</p>
                    </div>
                    <div className="p-mt-3">
                       <button onClick={()=>props.reload()} className="primary-button">Reset</button>
                    </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    <div className="empty-container">
                        <div className="adjust-empty-icon">
                            <Icon icon="no-item"/>
                        </div>
                        <div>
                            <p className="empty-text-two">{props.emptyText}</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const mobileTable = () =>{
       return( props.items.map((item, index) => {
               return  <div key={index.toString()}>{mobileTableContent(item)}<div>
                                   <Divider/></div></div>
        })
       )
    }

    const onlyIndex = (index,item,e) =>{
        if(index === 0){
          return (
          <span onClick={()=>item?.detailsFunction(item,'VIEW',true)} className="mobile-table-icon add-cursor">
          <Icon icon="back"/>
          </span>
           )
        }
        else{
            return <span/>
        }
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

    const checkIfAction = (item,e,label?) =>{
        switch (e) {
            case 'CRUD' :
                return (
                    <span className="dcir-tb-action-position">
                 <span onClick={() => item?.detailsFunction(item, 'DELETE', true)}
                       className="add-cursor table-action-icon-delete"><i className="pi pi-trash"/></span>
                 <span onClick={() => item?.detailsFunction(item, 'UPDATE', true)}
                       className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-pencil"/></span>
                 </span>
                )
            case  'CRU':
                    return (
                        <span className="dcir-tb-action-position">
                 <span onClick={() => item?.detailsFunction(item, 'UPDATE', true)}
                       className="p-ml-4 add-cursor table-action-icon"><i className="pi pi-pencil"/></span>
                 </span>
                    )
            case 'CR':
                    return (
                        <span/>
                    )

            default:
                    return (
                        <span className="mobile-table-value">{transformView(label, e)}</span>
                    )

        }
    }

    const labeView = (label) =>{
        if(label){
            return(
                <span className="mobile-table-label">{label}:</span>
            )
        }
        else{
            return <span/>
        }
    }

    const mobileTableContent = (item) => {

        return (
            props.headers.map((header, index) => {
                    return (
                        <div key={index.toString()} className="p-grid">
                            <div className="p-col-12">
                                  <span className="p-grid">
                                  <span className="p-col-4">
                                   {labeView(header.label)}
                                  </span>
                                  <span className="p-col-6">
                                  {checkIfAction(item,item[header.value],header.value)}
                                  </span>
                                  <span className="p-col-2">
                                  {onlyIndex(index,item,item[header.value])}
                                  </span>
                                  </span>
                            </div>
                        </div>
                    )
                }
            )
        )
    }

    return (
        <div>
            {tableView()}
        </div>
    )
}
