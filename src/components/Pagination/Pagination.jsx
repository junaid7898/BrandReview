import React, { useEffect, useState } from 'react'

function Pagination({totalPages, handlePageination, currentPage}) {
    return (
        <div className="pagination">
            {
              Array(Math.round(totalPages)).fill().map((_, index) =>
                <div key={index} onClick={ () => {handlePageination(index + 1)}} className={`pagination__item ${currentPage -1  === index && `pagination__item-selected`}`}>
                  <p>{ index + 1 }</p>
                </div>
              )
            }
          </div>
    )
}

export default Pagination
