import React, {useState, useEffect} from 'react'
import {Bar, Line} from 'react-chartjs-2'
import MultiDatePicker from '../multi_date_picker/MultiDatePicker';

const Chart = () => {
    const [fromDate, setFromDate] = useState(null)
    var date1, date2, diff1, diff2, diff, x;
    if(fromDate !== null){ 
        fromDate.map((item, index) => {
            if(index === 0)
            {
                date1 = new Date(item)
                diff1 = item.dayOfYear
                console.log('date1: ', date1, item.dayOfYear)
            }
            else if(index === 1){
                date2 = new Date(item)
                console.log('date2: ',date2, item.dayOfYear);
                diff2 = item.dayOfYear
            }
        })
        diff = Math.abs(diff1 - diff2)
        console.log('diff: ', diff);
        if(diff > 100){
            x = getArray(diff)
            console.log('x1,100: ', x);
        }
        else if(diff < 5){
            x = getMinorArray(diff)
            console.log('x1, 5: ', x);
        }
        else if (diff < 100){
            x = getMiniArray(diff)
            console.log('x1, <100: ', x)
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
        for(let y = 0; y < day; y = y + 1){   
            x.push(y)
        }
        
        return x;   
    }

    // const x1 = getArray(Math.abs(days));

    //TODO get data from api
    const data = [ 2.4 , 3 , 4 , 5 , 3.4 , 5 , 3 , 2 , 4 , 4.5 , 5 , 3.4, 5 , 3]
    
    return (
        <>
        <div className="chart__div__date-picker">
                <MultiDatePicker date = {fromDate} setDate = {setFromDate} />
        </div>
        {
            fromDate ? 
            (
                <div className = 'chart__div'>
             
                    <div className="chart__div__first-chart">
                        <div className="chart__div__first-chart__intro">
                            <h3>Reviews</h3>
                            <h4>1.5</h4>
                        </div>
                        <div className = 'chart__div__first__chart__bar'>
                            <Bar
                                data = {{
                                    labels: x,
                                    datasets: [{  
                                        data: [10, 20, 30, 40, 50, 60, 70, 80, 20, 10, 20, 30, 40, 50, 5, 10, 20, 30 , 40 , 50, 20, 10, 45],
                                        barPercentage: 0.5,
                                        barThickness: 15,
                                        maxBarThickness:20,
                                        minBarLength: 2,
                                        borderWidth: 2,   
                                    }]
                                }}
                                height = {300}
                                width = {500}
                                options = {{maintainAspectRatio: false, backgroundColor: 'red', scales: {x: {beginAtZero: true}}}}
                            />
                        </div>
                    </div>
                    

                    <div className="chart__div__second-chart">
                        <div className="chart__div__second-chart__intro">
                                <h3>Ratings</h3>
                                <h4>1.5</h4>
                        </div>
                        <div className = 'chart__div__first__chart__bar'>
                            <Line
                                    data = {{
                                        labels: x,
                                        datasets: [{    
                                            data: data,
                                            barPercentage: 0.5,
                                            barThickness: 6,
                                            maxBarThickness: 8,   
                                            minBarLength: 2,
                                            borderWidth: 2,
                                        }]
                                    }}
                                    height = {300}
                                    width = {500}
                                    options = {{maintainAspectRatio: true, backgroundColor: 'red'}}
                                />
                            </div>
                    </div>
            
                </div>
            )
            :
            (
                <h1>select date range to view charts</h1>
            )
        } 
        
        </>
    )
}

export default Chart
