// src/components/Graph5SamplingTarget.js
import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { samplingTargetData } from '../data/samplingTargetData';
import './Graph5SamplingTarget.css';

const Graph5SamplingTarget = () => {
    const chartRef = useRef(null);
    const [sortedData, setSortedData] = useState(samplingTargetData);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: 'Average Aerror by SamplingTarget'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    const data = params[0].data;
                    return `
                        SamplingTarget: ${data.SamplingTarget}<br/>
                        Average Aerror: ${data.value.toFixed(2)}
                    `;
                }
            },
            xAxis: {
                type: 'category',
                data: sortedData.map(item => item.SamplingTarget),
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

export default Graph5SamplingTarget;