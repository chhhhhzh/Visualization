// src/components/Graph1LineChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { lineChartData } from '../data/lineChartData';
import './Graph1LineChart.css';

const Graph1LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const averageErrorValues = lineChartData.map(item => item.AverageError);
        const averageErrorMean = (averageErrorValues.reduce((a, b) => a + b, 0) / averageErrorValues.length).toFixed(2);
        const averageErrorMedian = averageErrorValues.sort((a, b) => a - b)[Math.floor(averageErrorValues.length / 2)].toFixed(2);

        const option = {
            title: {
                text: 'Average Error Line Chart'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    const data = params[0].data;
                    return `
                        BarChartType: ${data.BarChartType}<br/>
                        ModelName: ${data.ModelName}<br/>
                        SamplingTarget: ${data.SamplingTarget}<br/>
                        SamplingMethod: ${data.SamplingMethod}<br/>
                        DownsamplingLevel: ${data.DownsamplingLevel}<br/>
                        RunIndex: ${data.RunIndex}<br/>
                        AverageError: ${data.value.toFixed(2)}
                    `;
                }
            },
            xAxis: {
                type: 'category',
                data: lineChartData.map((_, index) => index + 1)
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 1
            },
            series: [{
                data: lineChartData.map(item => ({
                    value: item.AverageError,
                    ...item
                })),
                type: 'line',
                markLine: {
                    data: [
                        { name: 'Average', yAxis: averageErrorMean },
                        { name: 'Median', yAxis: averageErrorMedian }
                    ],
                    label: {
                        formatter: '{b}: {c}'
                    }
                }
            }]
        };

        chart.setOption(option);

        window.addEventListener('resize', chart.resize);

        return () => {
            window.removeEventListener('resize', chart.resize);
            chart.dispose();
        };
    }, []);

    return (
        <div className="chart-container">
            <div ref={chartRef} className="chart"></div>
        </div>
    );
};

export default Graph1LineChart;
