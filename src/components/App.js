// 本文件是界面UI的根目录

import React from 'react';

import AssistView from './AssistView';
import ControlPanel from './ControlPanel';
import Overview from './Overview';
import DetailView from './DetailView';

import Graph1LineChart from './Graph1LineChart';
import Graph2LineChart from './Graph2LineChart';
import Graph3BarCharttype from './Graph3BarCharttype';
import Graph4ModelName from './Graph4ModelName';
import Graph5SamplingTarget from './Graph5SamplingTarget';
import Graph6SamplingMethod from './Graph6SamplingMethod';
import Graph7DownsamplingLevel from './Graph7DownsamplingLevel';
import Graph8RunIndex from './Graph8RunIndex';
import Graph9PieChart from './Graph9PieChart';

import '../css/App.css'

// App组件
function App() {

    return <div className='root'>
        <div className='controlPanel'>
          <ControlPanel/>
        </div>
        <div className='mainPanel'>
          <div className='overview'><Overview/></div>
          <div className='otherview'>
            <div className='assistView'><AssistView/></div>
            <div className='detailView'><DetailView/></div>
          </div>
        </div>
    </div>;
}

export default App;
