// src/components/Graph9PieChart.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { pieChartData } from '../data/pieChartData';
import './Graph9PieChart.css';

const Graph9PieChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);

        const option = {
            title: {
                text: 'Weight Distribution by Category',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 'left'
            },
            series: [
                {
                    name: 'Category',
                    type: 'pie',
                    radius: '50%',
                    data: pieChartData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };

        chart.setOption(option);

        window.addEventListener('resize', chart.resize);

        return () => {
            window.removeEventListener('resize', chart.resize);
            chart.dispose();
        };
    }, []);

    return <div ref={chartRef} className="chart"></div>;
};

export default Graph9PieChart;
