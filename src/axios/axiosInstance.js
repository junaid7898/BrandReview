import {default as axiosImport}  from "axios"

export const axios = axiosImport.create({
    baseURL:"https://sikayetbox.com/backend"
})