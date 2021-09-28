import React from 'react'
import DetailTag from './DetailTag'
import './myDetails.css'

const MyDetails = () => {
    return (
        <section className = 'mydetails'>
                <DetailTag class1 = 'tag ' label = 'phone' value = '0123456'/>
                <DetailTag class1 = 'tag ' label = 'Birthday' value = 'Sep 15, 2003'/>
                <DetailTag class1 = 'tag tag__address' label = 'address' value = " a type specimen book. It has survived not only five centuries" />
                <DetailTag class1 = 'tag ' label = 'Country Code' value = '212123'/>
                <DetailTag class1 = 'tag ' label = 'Email' value = 'abc@gmail.com'/>   
                
        </section>
    )
}

export default MyDetails
