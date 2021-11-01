import { axios } from '../../../axios/axiosInstance';
import React, {useState, useEffect} from 'react'
import {Bar, Line} from 'react-chartjs-2'
import MultiDatePicker from '../../../components/multi_date_picker/MultiDatePicker';
import EmptyData from '../../../components/EmptyDataComponent/EmptyData';

const BrandChart = ({brandId}) => {
    const [date, setDate] = useState(null)
    var date1, date2, diff1, diff2, diff, x;
    if(date !== null){ 
        date.map((item, index) => {
            if(index === 0)
            {
                date1 = new Date(item)
                diff1 = item.dayOfYear
                // console.log('date1: ', date1, item.dayOfYear)
            }
            else if(index === 1){
                date2 = new Date(item)
                // console.log('date2: ',date2, item.dayOfYear);
                diff2 = item.dayOfYear
            }
        })
        diff = Math.abs(diff1 - diff2)
        // console.log('diff: ', diff);
        if(diff > 100){
            x = getArray(diff)
            // console.log('x1,100: ', x);
        }
        else if(diff < 5){
            x = getMinorArray(diff)
            // console.log('x1, 5: ', x);
        }
        else if (diff < 100){
            x = getMiniArray(diff)
            // console.log('x1, <100: ', x)
        }
    }
    
    var date1 = new Date('2021/4/25');
    var date2 = new Date(); 
    var difference = date1.getTime() - date2.getTime();
    var days = Math.ceil(difference / (1000 * 3600 * 24));

    function getArray (day){
        let x = []
        for(let y = 0; y < day; y = y + 10){   
            x.push(y)
        }
        
        return x;   
    }

    function getMiniArray (day){
        let x = []
        for(let y = 0; y < day; y = y + 5){   
            x.push(y)
        }
        
        return x;   
    }

    function getMinorArray (day){
        let x = []
        for(let y = 69; y <100; y = y + 1){   
            x.push(y+"gada")
        }
        
        return x;   
    }

    // const x1 = getArray(Math.abs(days));

    //TODO get data from api
    const data = [ 2.4 , 3 , 4 , 5 , 3.4 , 5 , 3 , 2 , 4 , 4.5 , 5 , 3.4, 5 , 3]
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
            <div className="brand__chart__container__date-picker">
                <MultiDatePicker date = {date} setDate = {setDate} />
            </div>
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
