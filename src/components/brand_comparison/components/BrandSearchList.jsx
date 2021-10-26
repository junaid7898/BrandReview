import React from 'react'

const BrandSearchList = ({ data, showlist, setValue, setSelectedBrand}) => {

    

    return (
        <div className='comparison__list'>
                {data.map((item, index) => {
                    return(
                        <div key={index} className = 'comparison__list__item' onClick = {() => {
                            setValue(item.name)
                            showlist(false)
                            setSelectedBrand(item)
                        }}>
                            <img src = {item.logo} alt={`brand ${item.name} logo`}/>
                            <h3>{item.name}</h3>
                        </div>
                    )
                })}
            </div>
    )
}

export default BrandSearchList
