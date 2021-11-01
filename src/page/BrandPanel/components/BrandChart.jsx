import { axios } from '../../../axios/axiosInstance';
import React, {useState, useEffect} from 'react'
import {Bar, Line} from 'react-chartjs-2'
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker';
import EmptyData from '../../../components/EmptyDataComponent/EmptyData';

const BrandChart = ({brandId, date}) => {
    const [chartData, setChartData] = useState(null)
    const [chartData2, setCharData2] = useState(null)
    useEffect(() => {
        if(date){

            let newFilter = {brand: brandId}
            
            newFilter = {
                ...newFilter,
                createdAt: JSON.stringify({
                    $gt: new Date(date[0]),
                    $lt: new Date(date[1])
                })
            }
            const options = {
                limit: 100000,
            }

            console.log(newFilter)
            axios.post('/review/query',{filters: newFilter, options})
            .then(({data}) => {
                console.log(data)
                let newObj = {}
                let ratingAvg = {}
                data.results.map( item => {
                    const g = new Date(item.createdAt).toDateString()
                    console.log(g)
                    if(newObj[g]){
                        newObj[g]++
                    }
                    else {
                        newObj[g] = 1
                    }


                    if(ratingAvg[g]){
                        ratingAvg[g].sum = ratingAvg[g].sum + item.ratingCount
                        ratingAvg[g].avg = ratingAvg[g].sum / newObj[g]
                    }
                    else {
                        ratingAvg[g] = {}
                        ratingAvg[g].sum = item.ratingCount
                        ratingAvg[g].avg = item.ratingCount
                    }
                    console.log(item.ratingCount);
                })
                const user = ["sadsa"];
                console.log(user)


                console.log(newObj)
                console.log(ratingAvg);
                setChartData({
                    label:Object.keys(newObj).reverse(),
                    value: Object.values(newObj).reverse()
                })
                const labelA = Object.keys(ratingAvg)
                const valueA = labelA.map(item => ratingAvg[item].avg)
                console.log(labelA);
                console.log(valueA);
                setCharData2({
                    label: labelA,
                    value: valueA
                })

            })
        }
    }, [date])


    





    return (
        <>
        <div className="brand__chart__container">
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
                                    <h3>Review Ratings</h3>
                            </div>
                            <div className = 'chart__div__first__chart__bar'>
                                <Line
                                        data = {{
                                            labels: chartData2 && chartData2.label,
                                            datasets: [{  
                                                label: 'total ratings',  
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
                    <EmptyData value = 'please select date range from above'/>
                )
            } 
            
        </div>
        </>
    )
}

export default BrandChart
