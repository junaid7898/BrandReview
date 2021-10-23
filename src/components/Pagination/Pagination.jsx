import React, { useState } from 'react'

function Pagination({totalPages, handlePageination}) {
    const [selectedPage, setSelectedPage] = useState(1)
    return (
        <div className="pagination">
            {
              Array(Math.round(totalPages)).fill().map((_, index) =>
                <div key={index} onClick={ () => {handlePageination(index + 1); setSelectedPage(index)}} className={`pagination__item ${selectedPage === index && `pagination__item-selected`}`}>
                  <p>{ index + 1 }</p>
                </div>
              )
            }
          </div>
    )
}

export default Pagination
