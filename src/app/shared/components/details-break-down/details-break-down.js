import './details-break-down.css'
import {SpecialLabelCases}   from "../../models/utilities";
import {useEffect, useState} from "react";
import {NewDispute}          from "../../../components/dispute/new-dispute";
import {SERVICES}            from "../../../core/services/services";


export function DetailsBreakDown(props){
    const [currentIndex,setCurrentIndex] = useState(0);
    const [disputeCodes,setDisputeCodes] = useState([]);
    const detailsContent = props.breakDown;


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

    function getDisputeCodes() {
      SERVICES.GET_DISPUTE_CODES()
      .then(data =>{
          setDisputeCodes(data);
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

    const transformDetailsView = () =>{
        if(currentIndex){
            return(
                <NewDispute transactionSearchKey={props.transactionSearchKey} closeDisputeModal={props.closeModal}/>
            )
        }
        else{
          return (
              <>
                  <div>
                      <p className="details-title">{props.title} Data</p>
                  </div>
                  <div>
                      <p className="details-subtitle">{`Find more details about the ${props.title} below`} </p>
                  </div>
                  <div className="p-mt-3">
                      {detailsView}
                  </div>
                  <div className="p-mt-3 p-text-center">
                      {transformButton()}
                  </div>
              </>
          )
        }
    }

    return(
        <div className="details-container">
         {transformDetailsView()}
        </div>
    )
}
