import './details-break-down.css'
import {SpecialLabelCases}   from "../../models/utilities";
import {useEffect, useState} from "react";
import {NewDispute}          from "../../../components/dispute/new-dispute";
import {SERVICES}            from "../../../core/services/services";
import {ScrollPanel}         from "primereact/scrollpanel";
import {Icon}                from "../../icons/icon";
import {CustomLoader}        from "../custom-loader/custom-loader";


export function DetailsBreakDown(props){
    const [currentIndex,setCurrentIndex] = useState(0);
    const [disputeCodes,setDisputeCodes] = useState([]);
    const detailsContent = props.breakDown;


    const transformView = (itemCase,value) =>{
        let result = value;
        if(itemCase) {
            SpecialLabelCases.forEach(e => {
                if (e.case === itemCase) {
                    if(value) {
                        result = e.action(value);
                    }
                }
            })
        }
        return result?result:'___';
    }

    function getDisputeCodes() {
      SERVICES.GET_DISPUTE_CODES()
      .then(data =>{
          setDisputeCodes(data.result);
      })
       .catch(error=>{
          console.log('Error getting dispute codes ',error);
       })
    }

    useEffect(() => {
            let mounted = true
            if(mounted) {
                getDisputeCodes();
            }
            return () => {
                mounted = false;
            }
        },[]
    );

    const errorView = () =>{

        return(
            <div>
                <div style={{maxWidth:'400px'}} className="empty-container p-text-center">
                    <Icon icon="error-message-icon"/>
                    <div>
                        <p dangerouslySetInnerHTML={ {__html: props.error} } className="empty-text"/>
                    </div>
                    <div className="p-mt-6">
                        <div className="p-grid">
                            <div className="p-col-6">
                                <button onClick={()=>props.closeModal()} className="secondary-button">Close</button>
                            </div>
                            <div className="p-col-6">
                                <button onClick={()=>props.reload()} className="primary-button">Reload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const detailsView =
        detailsContent.map((details,index)=>
                <div key={index.toString()} className="p-grid dcir-row">
                    <div className="p-col-5">
                        <p className="details-label">{details.label}:</p>
                    </div>
                    <div className="p-col-7">
                        <p className="details-value">{transformView(details.itemCase,details.value)}</p>
                    </div>
                </div>
        );

    const scrollableDetails = () =>{
        if (props.mobile){
            return (
                <div>
                {detailsView}
                </div>
            )
        }
        else{
            return (
                <ScrollPanel style={{ width: '100%', height: '400px' }}>
                    {detailsView}
                </ScrollPanel>
            )
        }
    }

    const transformButton = () =>{
        if(disputeCodes.length){
            if(disputeCodes.includes(detailsContent[4].value)){
                return(
                    <div className="p-grid">
                      <div className="p-col-6">
                         <button onClick={props.closeModal} className="secondary-button">Close</button>
                      </div>
                        <div className="p-col-6">
                            <button onClick={()=>setCurrentIndex(1)} className="primary-button">Create</button>
                        </div>
                    </div>
                )
            }
            else{
                return(
                    <p className="close-modal add-cursor" onClick={props.closeModal}>Close</p>
                )
            }
        }
        else{
            return(
                <p className="close-modal add-cursor" onClick={props.closeModal}>Close</p>
            )
        }
    }

    const transformDetailsView = () => {
        if(props.loading){
            return(
            <div className="p-mt-3 p-pb-2">
            <div className="p-text-center">
              <CustomLoader loadingText="loading..."/>
             </div>
            </div>
            )
        }
        else {
            if (currentIndex) {
                return (
                    <NewDispute transactionSearchKey={props.transactionSearchKey} closeDisputeModal={props.closeModal}/>
                )
            }
            else {
                if (props.error) {
                    return (
                        <div>
                            {errorView()}
                        </div>
                    )
                }
                else {
                    return (
                        <>
                            <div>
                                <p className="details-title">{props.title} Data</p>
                            </div>
                            <div>
                                <p className="details-subtitle">{`Find more details about the ${props.title} below`} </p>
                            </div>
                            <div className="p-mt-3">
                                {scrollableDetails()}
                            </div>
                            <div className="p-mt-4 p-p-1 p-text-center">
                                {transformButton()}
                            </div>
                        </>
                    )
                }
            }
        }
    }



    return(
        <div className="details-container">
         {transformDetailsView()}
        </div>
    )
}
