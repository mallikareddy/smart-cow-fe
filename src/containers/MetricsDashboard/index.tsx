import React, { useEffect, useState } from 'react';
import {LineChart} from "./../../components/LineChart";
import {getCPUUsage, getGPUUsage, getRAMUsage} from "./../../services/apiRequests";
import "./index.scss";

export const MetricsDashboard = () => {
  const [CPUUsage, setCPUUsage] = useState<number[]>([]);
  const [GPUUsage, setGPUUsage] = useState<number[]>([]);
  const [RAMUsage, setRAMUsage] = useState<number[]>([]);
  let interval:any = undefined;
  
  useEffect(() => {
    updateCPUMetricsData();
    updateGPUMetricsData();
    updateRAMMetricsData();
    return () => clearInterval(interval);
  }, []);

  const updateCPUMetricsData = async() => {
    (async function() {
      let CPUusage: number[] = [];
      setUsage();

      interval = setInterval(async ()=> {
        setUsage();
      }, 5000);

      async function setUsage() {
        const cpu:number = await getCPUUsage();
        CPUusage.push(cpu);
        setCPUUsage([...CPUusage]);
      }

      if(CPUusage.length > 20){ 
        //currently setting length to 20 so that it doesn't run continuously
        clearMetricsInterval(interval);
      }
    })();
  }

  const clearMetricsInterval = (interval: any) => {
    return () => clearInterval(interval);
  }

  const updateGPUMetricsData = async() => {
    const gpu:number[]= await getGPUUsage();
    setGPUUsage([...gpu]);
  }

  const updateRAMMetricsData = async() => {
    const ram:number[] = await getRAMUsage();
    setRAMUsage([...ram]);
  }

  return (
    <div className="dashboard">
      <div className="line-chart"><LineChart title="CPU Usage(%)" chartValues={[{data: CPUUsage}]} /></div>
      <div className="line-chart"><LineChart title="GPU Usage(%)" chartValues={[{data: GPUUsage}]} /></div>
      <div className="line-chart"><LineChart title="RAM Usage(%)" chartValues={[{data: RAMUsage}]} /></div>
    </div>
  )
}
