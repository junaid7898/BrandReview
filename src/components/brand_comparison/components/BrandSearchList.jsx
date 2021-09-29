import React from 'react'

const BrandSearchList = ({ data, showlist, setValue}) => {

    

    return (
        <div className='comparison__list'>
                {data.map((item) => {
                    return(
                        <div className = 'comparison__list__item' onClick = {() => {
                            setValue(item.brandName)
                            showlist(false)
                        }}>
                            <img src = {item.brandIcon}/>
                            <h3>{item.brandName}</h3>
                        </div>
                    )
                })}
            </div>
    )
}

export default BrandSearchList
