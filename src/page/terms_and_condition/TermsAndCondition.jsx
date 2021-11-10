import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import BackgroundContent from './components/BackgroundContent'
import Content from './components/Content'



const TermsAndCondition = () => {
    useEffect(() => {
        window.scrollTo(0,0)
  }, [useLocation().pathname])
    return (
        <div style = {{backgroundColor: '#fff'}}>
            <BackgroundContent/>
            <Content/>
        </div>
    )
}

export default TermsAndCondition
