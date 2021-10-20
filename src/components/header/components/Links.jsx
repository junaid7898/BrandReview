import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Links({client}) {

    const [showManaingBrandsList, setShowManagingBrandsList] = useState(false)

    
    if(client.type.includes("user")){
        return(
            <>
            {
                client.user.role.includes("user") &&
                <li>
                    <Link to={`/user/${client.user.id}`}>Profile</Link>
                </li>
            }
            {
                    client.user.role.includes("brandAdmin") &&
                    <li>
                        <Link to={`/user/${client.user.id}?option=brands`}>Managing Brands</Link>
                    </li>
                    
            }
            {
                (client.user.role.includes("subAdmin") || client.user.role.includes("admin")) &&
                <li>
                    <Link to="/admin">Admin Panel</Link>
                </li>
            }


            </>
        )

    }
    else if(client.type.includes("brand")){
        return(
            <>
                <li>
                    <Link to={`/brand/${client.brand.id}`}>Brand Page</Link>
                </li>
                <li>
                    <Link to={`/brand/panel/${client.brand.id}`}>Brand Panel</Link>
                </li>
            </>
        )
    }
}

export default Links
