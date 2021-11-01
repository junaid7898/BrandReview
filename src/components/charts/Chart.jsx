import {axios} from '../../axios/axiosInstance';
import React, {useState, useEffect} from 'react'
import {Bar, Line} from 'react-chartjs-2'
import MultiDatePicker from '../multi_date_picker/MultiDatePicker';
import EmptyData from '../EmptyDataComponent/EmptyData';

const Chart = ({date}) => {
    const [chartData, setChartData] = useState(null)
    const [chartData2, setChartData2] = useState(null)
    useEffect(() => {
        if(date){

            let newFilterReview = {
                createdAt: JSON.stringify({
                    $gt: new Date(date[0]),
                    $lt: new Date(date[1])
                })
            }
            const options = {
                limit: 100000,
            }


            axios.post('/review/query',{filters: newFilterReview, options})
            .then(({data}) => {
                let newObj = {}
                data.results.map( item => {
                    const g = new Date(item.createdAt).toDateString()
                    if(newObj[g]){
                        newObj[g]++
                    }
                    else {
                        newObj[g] = 1
                    }
                })
                setChartData({
                    label:Object.keys(newObj).reverse(),
                    value: Object.values(newObj).reverse()
                })
            })
            let newFilterBrand = {
                    createdAt: JSON.stringify({
                    $gte: new Date(date[0]),
                    $lte: new Date(date[1])
                })
            }
            axios.post('/brand/query',{filters: newFilterBrand, options})
            .then(({data}) => {
                console.log(data)
                let newObj = {}
                data.results.map( item => {
                    const g = new Date(item.createdAt).toDateString()
                    if(newObj[g]){
                        newObj[g]++
                    }
                    else {
                        newObj[g] = 1
                    }
                })
                console.log(newObj)
                setChartData2({
                    label:Object.keys(newObj).reverse(),
                    value: Object.values(newObj).reverse()
                })
            })
        }
    }, [date])

    return (
        <>
        {
            date ? 
            (
                <div className = 'chart__div'>
             
                    <div className="chart__div__first-chart">
                        <div className="chart__div__first-chart__intro">
                            <h3>Reviews</h3>
                        </div>
                        <div className = 'chart__div__first__chart__bar'>
                            <Bar
                                data = {{
                                    labels: chartData && chartData.label,
                                    datasets: [{  
                                        label:"Total Reviews",
                                        data: chartData && chartData.value,
                                        barPercentage: 0.5,
                                        barThickness: 15,
                                        maxBarThickness:20,
                                        minBarLength: 2,
                                        borderWidth: 2,   
                                    }]
                                }}
                                height = {300}
                                width = {500}
                                options = {{maintainAspectRatio: false, backgroundColor: '#357BCE', scales: {x: {beginAtZero: true}}}}
                            />
                        </div>
                    </div>
                    

                    <div className="chart__div__second-chart">
                        <div className="chart__div__second-chart__intro">
                                <h3>Brands Registered</h3>
                        </div>
                        <div className = 'chart__div__first__chart__bar'>
                            <Line
                                    data = {{
                                        labels: chartData2 && chartData2.label,
                                        datasets: [{  
                                            label: 'Total Brands',  
                                            data: chartData2 && chartData2.value,
                                            barPercentage: 0.5,
                                            barThickness: 6,
                                            maxBarThickness: 8,   
                                            minBarLength: 2,
                                            borderWidth: 2,
                                        }]
                                    }}
                                    height = {300}
                                    width = {500}
                                    options = {{maintainAspectRatio: true, backgroundColor: '#357BCE'}}
                                />
                            </div>
                    </div>
            
                </div>
            )
            :
            (
                <div className="no__data__warning">
                    <EmptyData value = 'Please select a date range from above to view charts'/>
                </div>
            )
        } 
        
        </>
    )
}

export default Chart
