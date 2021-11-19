import React, { useEffect, useState } from 'react'
import { axios } from '../../axios/axiosInstance'
import {ImCross} from 'react-icons/im'
import LoadingIndicator from '../loadingIndicator/LoadingIndicator'
import { useDispatch } from 'react-redux'
import { statusAction } from '../../Redux/statusSlice'
const DeleteCategories = () => {
    const [categories, setCategories] = useState(null)
    const [isDeletingCategory, setIsDeletingCategory] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get('/category').then(res => {
            setCategories(res.data)
        })
    }, [])

    const deleteCategory = (id) => {
        setIsDeletingCategory(true)
        dispatch(statusAction.setNotification({
            message: "Deleting Category",
            type: "loading"
          }))
        axios.delete(`/category/${id}`)
        .then( res => {
            dispatch(statusAction.setNotification({
                message: "Category Deleted....",
                type: "success"
              }))
            setCategories(categories.filter(item => item.id !== id))
            setIsDeletingCategory(false)
        }
        ).catch(err => {
            dispatch(statusAction.setNotification({
                message: err.response.data.message,
                type: "error"
              }))
            setIsDeletingCategory(false)
        })
    }
    return (
        <div className = 'delete__category'>
            {/* <div className = 'delete__category__mask'></div> */}
            { categories ?
                <div className = 'delete__category__list'>
                    {
                        categories &&
                        categories.map(item => {
                            return(
                                <div className = 'delete__category__list__item' id = {item.id}>
                                    <h3>{item.category} {isDeletingCategory && <LoadingIndicator/>}</h3>
                                    <div className = 'delete__category__list__item__cross' onClick = {() => deleteCategory(item.id)}>
                                        <ImCross className = 'delete__category__list__item__cross__icon'/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <LoadingIndicator/>
            }
        </div>
    )
}

export default DeleteCategories
