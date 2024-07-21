// src/components/Graph6SamplingMethod.js
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { samplingMethodData } from '../data/samplingMethodData';
import './Graph6SamplingMethod.css';

const Graph6SamplingMethod = () => {
    const chartRef = useRef(null);
    const [sortedData, setSortedData] = useState(samplingMethodData);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: 'Average Aerror by Sampling Method'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    const data = params[0].data;
                    return `
                        SamplingMethod: ${data.SamplingMethod}<br/>
                        Average Aerror: ${data.value.toFixed(2)}
                    `;
                }
            },
            xAxis: {
                type: 'category',
                data: sortedData.map(item => item.SamplingMethod),
                axisLabel: {
                    rotate: 45
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 1
            },
            series: [{
                data: sortedData.map(item => ({
                    value: item.AverageAerror,
                    ...item
                })),
                type: 'bar',
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                }
            }]
        };

        chart.setOption(option);

        window.addEventListener('resize', chart.resize);

        return () => {
            window.removeEventListener('resize', chart.resize);
            chart.dispose();
        };
    }, [sortedData]);

    const handleSort = () => {
        const sorted = [...sortedData].sort((a, b) => a.AverageAerror - b.AverageAerror);
        setSortedData(sorted);
    };

    return (
        <div className="chart-container">
            <button onClick={handleSort}>Sort by Average Aerror</button>
            <div ref={chartRef} className="chart"></div>
        </div>
    );
};

export default Graph6SamplingMethod;
