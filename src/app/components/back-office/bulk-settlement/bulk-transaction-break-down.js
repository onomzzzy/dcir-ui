import {SpecialLabelCases} from "../../../shared/models/utilities";
import {CustomAccordion}   from "../../../shared/components/custom-accordion/custom-accordion";

export function BulkTransactionBreakDown (props){

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

    return (
        <div>
        <CustomAccordion currentView={detailsView}  title="FrontOfficeTransaction Details" open={true}/>
        </div>
    )
}
