import React, { useEffect, useState } from 'react'

import TopBrands from '../../../components/top-brands/TopBrands'
function TopTenBrands() {
    return (
        <div className="topbrands">
            <TopBrands rank={true} length={10} />
        </div>
    )
}

export default TopTenBrands
