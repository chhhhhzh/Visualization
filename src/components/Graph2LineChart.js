// src/components/Graph2LineChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { lineChartData } from '../data/lineChartData';
import './Graph2LineChart.css';

const Graph2LineChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const oneMinusAverageErrorData = lineChartData.map(item => ({
            ...item,
            OneMinusAverageError: 1 - item.AverageError
        }));
        
        const oneMinusAverageErrorValues = oneMinusAverageErrorData.map(item => item.OneMinusAverageError);
        const maxOneMinusAverageError = Math.max(...oneMinusAverageErrorValues);

        const option = {
            title: {
                text: '1 - Average Error Line Chart'
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
                        AverageError: ${data.AverageError.toFixed(2)}<br/>
                        1 - AverageError: ${data.value.toFixed(2)}
                    `;
                }
            },
            xAxis: {
                type: 'category',
                data: lineChartData.map((_, index) => index + 1)
            },
            yAxis: {
                type: 'value',
                min: 0.4,
                max: 1
            },
            series: [{
                data: oneMinusAverageErrorData.map(item => ({
                    value: item.OneMinusAverageError,
                    ...item
                })),
                type: 'line',
                markPoint: {
                    data: oneMinusAverageErrorData
                        .filter(item => item.OneMinusAverageError === maxOneMinusAverageError)
                        .map(item => ({
                            value: item.OneMinusAverageError,
                            xAxis: oneMinusAverageErrorData.indexOf(item),
                            yAxis: item.OneMinusAverageError
                        })),
                    label: {
                        formatter: 'Max: {c}'
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

export default Graph2LineChart;
