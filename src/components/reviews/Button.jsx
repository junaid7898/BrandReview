import React from 'react'

function Button({children, client, type, ...rest}) {

    if(client){
        if(client.type.includes(type)){
            return (
                <div {...rest}>
                    {children}
                </div>
            )
        }
    }
    
    return null
        

}

export default Button
