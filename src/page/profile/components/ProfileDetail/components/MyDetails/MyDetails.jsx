import React from 'react'
import DetailTag from './components/DetailTag'
const MyDetails = ({user}) => {


    return (
        <section className = 'mydetails'>
                
                {
                    user ?
                        <>
                            <DetailTag class1 = 'tag ' label = 'phone' value = {user.phoneNumber}/>
                            <DetailTag class1 = 'tag ' label = 'Birthday' value = {user.dateOfBirth}/>
                            <DetailTag class1 = 'tag tag__address' label = 'address' value = {user.address} />
                            <DetailTag class1 = 'tag ' label = 'Country Code' value = {user.countryCode}/>
                            <DetailTag class1 = 'tag ' label = 'Email' value = {user.email}/>
                        </>
                    :
                        null
                }
                
        </section>
    )
}

export default MyDetails
