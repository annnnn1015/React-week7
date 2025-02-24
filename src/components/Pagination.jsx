function Pagination({
    pageInfo, handlePageChange
}){
    return(
        <div className="d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    {/* 4.判斷上一頁：如果是前一頁是false就不顯示 */}
                    {/* 助教寫法（短路運算）：${!pagiInfo.has_pre &&"disabled" } 當pagiInfo.has_pre為false時（!相反變true)，加上disabled*/}
                    <li className={`page-item ${pageInfo.has_pre? "" :"disabled" }`}>
                    <a className="page-link" href="#" onClick={()=>{handlePageChange(pageInfo.current_page-1)}}>
                        上一頁
                    </a>
                    </li>
                    {/* 3.可以透過陣列的方式把全部頁碼渲染出來 */}
                    {/* 用Array可以建立指定的陣列長度 */}
                    { Array.from({length: pageInfo.total_pages}).map((_,index)=>{
                    return(
                        // 4.判斷當前頁碼：如果是當前頁碼就顯示active
                    <li key={index} className={`page-item ${pageInfo.current_page === index+1 && "active"}`}>
                        {/* 5.根據頁碼渲染不同頁的資料*/}
                    <a className="page-link" href="#" onClick={()=>handlePageChange(index+1)}>
                        {index+1}
                        {/* 起始頁碼從0改1 */}
                    </a>
                    </li>)
                    })
                    }

                    <li className={`page-item  ${!pageInfo.has_next && "disabled"}`}>
                    <a className="page-link" href="#" onClick={()=>{handlePageChange(pageInfo.current_page+1)}}>
                        下一頁
                    </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination