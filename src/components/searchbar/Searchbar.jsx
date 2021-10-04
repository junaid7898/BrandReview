import React from 'react'

function Searchbar(props,{sn = "sn"}) {


    console.log(sn)

    return (
        <div {...props}>
            search bar
        </div>
    )
}

export default Searchbar
