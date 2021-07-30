import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { lineChartConfig } from './chartConfiguration';


export const LineChart = (props: any) => {
  const [values, setChartValues] = useState<number[]>([]);
  const {title, chartValues} = props;

  useEffect(()=> {
    setChartValues([...chartValues]);
  }, [chartValues]);
  
  const chartOptions = {
    ...lineChartConfig,
    title: { ...lineChartConfig.title, text: title },
    series: values,
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  )
}
