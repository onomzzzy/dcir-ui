import './custom-pagination.css';
import {Icon}                            from "../../icons/icon";
import {useContext, useEffect, useState} from "react";
import {MainContext}                     from "../../../../App";

export function CustomPagination(props){
const mainContext = useContext(MainContext);
const [itemPerPage,setItemPerPage] = useState(10);
const [totalItems,setTotalItems] = useState(0);
const [range,setRange] = useState(5);
const [currentPage,setCurrentPage] = useState(1);
const [totalPages,setTotalPages] = useState(props?.totalPages?props?.totalPages:0);
const [rangeArray,setRangeArray] = useState([]);
    useEffect(() => {
            let mounted = true
            if(mounted) {
             initialize();
            }
            return () => {
                mounted = false;
            }
        },[]
    );

   function initialize(){
       if(props.itemPerPage){
           setItemPerPage(props.itemPerPage)
       }
      setTotalItems(props?.totalItems);
      setRange(props?.range);
       if(props?.totalPages === 0){
           setTotalPages(getTotalPages());
       }
      setCurrentPage(props?.currentPage);
      fillRangeArray(currentPage);
    }

    function fillRangeArray(currentPg){
       let arr = [];
       let i = 0;
       for( i; i< range; i++){
           const pBtn = i + currentPg;
          if(pBtn <= totalPages) {
              arr.push(pBtn);
          }
       }

       setCurrentPage(currentPg);
       mainContext.mainDispatch({ type: "ON_PAGE_CHANGE", currentPage: currentPg });
       setRangeArray(arr);
    }

    function getTotalPages(){
       let pageReminder = totalItems % itemPerPage;
       pageReminder = pageReminder?1:0;
        return Math.floor(totalItems / itemPerPage) + pageReminder;
    }

    function previousPage(){
       const prev = currentPage - 1;
       if(prev > 0){
           fillRangeArray(prev);
       }
    }

    function firstPage(){
        fillRangeArray(1);
    }

    function lastPage(){
        fillRangeArray(totalPages);
    }

    function nextPage(){
        const nxt = currentPage + 1;
        if(nxt <= totalPages){
            fillRangeArray(nxt);
        }
    }

    const pageButton = rangeArray.map((item) =>
        <span key={item.toString()} onClick={()=>fillRangeArray(item)} className={item === currentPage?'p-ml-3 pagination-active-nav':'p-ml-3 pagination-inactive-nav'}>{item}</span>
    );

    return(
    <div>
       <div className="p-mt-3">
       <span>
       <span onClick={firstPage} className="pagination-nav-position"><Icon icon="pagination-strong-left"/></span>
       <span onClick={previousPage} className="p-ml-2 pagination-nav-position"><Icon icon="pagination-left"/></span>
       {pageButton}
       <span onClick={nextPage} className="p-ml-3 pagination-nav-position"><Icon icon="pagination-right"/></span>
       <span onClick={lastPage} className="p-ml-2 pagination-nav-position"><Icon icon="pagination-strong-right"/></span>
       </span>
        </div>
    </div>
    )
}


