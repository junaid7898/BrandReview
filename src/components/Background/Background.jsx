import React, { useRef, useState } from 'react'
import Vector1 from "../../assests/Vectors/Vector1"
import Vector2 from "../../assests/Vectors/Vector2"
import Vector3 from "../../assests/Vectors/Vector3"
import Vector4 from "../../assests/Vectors/Vector4"
function Background() {
    const g = document.getElementById('root').getBoundingClientRect()
    console.log(g)
    const randomNumberWidth = useRef()
    const randomNumberHeight = useRef()
    // const randomNumberWidth = Math.floor(Math.random() * g.width);
    // const randomNumberHeight = Math.floor(Math.random() * g.height);
    const totalNumber = Math.floor(Math.random() * 25);
    const [coordinated] = useState(g)
    let indexCount = 0
    return (
        coordinated &&
        Array(Math.round(28)).fill().map((_, i) => {
            randomNumberWidth.current = Math.floor(Math.random() * coordinated.width);
            randomNumberHeight.current = Math.floor(Math.random() * ( coordinated.height - 200 )) +200;
            console.log(randomNumberHeight, randomNumberWidth)
            if(indexCount > 4){
                indexCount = 0
            }
            indexCount++
            return <span style={{right:randomNumberWidth.current, top:randomNumberHeight.current}} className="background">
                {
                    indexCount === 1 
                    ?   <Vector1 /> :
                    indexCount === 2 ?
                    <Vector2 /> :
                    indexCount === 3 ?
                    <Vector3 /> :
                    indexCount === 4 ?
                    <Vector4 /> : null
                }
            </span>
        })
    )
}

export default Background
