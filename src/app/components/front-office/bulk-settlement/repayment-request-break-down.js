import {SpecialLabelCases} from "../../../shared/models/utilities";
import {CustomAccordion}   from "../../../shared/components/custom-accordion/custom-accordion";

export function RepaymentRequestBreakDown (props){

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

    const detailsView = () => {
        return(
            props.details.map((details, index) =>
                <div key={index.toString()} className="p-grid dcir-row">
                    <div className="p-col-3">
                        <p className="details-label">{details.label}:</p>
                    </div>
                    <div className="p-col-6">
                        <p className="details-value">{transformView(details.itemCase, details.value)}</p>
                    </div>
                </div>
            )
        )
    }

    const participantDetailsView = () => {
        return(
            props.participantDetails.map((details, index) =>
                <div key={index.toString()} className="p-grid dcir-row">
                    <div className="p-col-3">
                        <p className="details-label">{details.label}:</p>
                    </div>
                    <div className="p-col-6">
                        <p className="details-value">{transformView(details.itemCase, details.value)}</p>
                    </div>
                </div>
            )
        )
    }

    const chargeTypeDetailsView = () => {
        return(
            props.chargeTypeDetails.map((details, index) =>
                <div key={index.toString()} className="p-grid dcir-row">
                    <div className="p-col-3">
                        <p className="details-label">{details.label}:</p>
                    </div>
                    <div className="p-col-6">
                        <p className="details-value">{transformView(details.itemCase, details.value)}</p>
                    </div>
                </div>
            )
        )
    }

    return (
        <div>
            <div>
            <CustomAccordion currentView={detailsView}  title="Repayment Details" open={true}/>
            </div>
            <div style={{marginTop:'-1.5em'}}>
                <CustomAccordion currentView={participantDetailsView}  title="Participant Details" open={false}/>
            </div>
            <div style={{marginTop:'-1.5em'}}>
                <CustomAccordion currentView={chargeTypeDetailsView}  title="Charge Type Details" open={false}/>
            </div>

            </div>
    )
}
