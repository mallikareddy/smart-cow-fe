import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { lineChartConfig } from './chartConfiguration';


export const LineChart = (props: any) => {
  const {title, chartValues} = props;
  const chartOptions = {
    ...lineChartConfig,
    title: { ...lineChartConfig.title, text: title },
    series: chartValues,
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}
