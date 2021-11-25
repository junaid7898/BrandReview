import {default as axiosImport}  from "axios"

export const axios = axiosImport.create({
    baseURL:"https://sikayetbox.com/v1"
    // baseURL:"http://localhost:5000/v1"  
})