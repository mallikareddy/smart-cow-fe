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

      const interval2 = setInterval(async ()=> {
        console.log(CPUusage.length, "*******")
        if (CPUusage.length > 20) {
          clearInterval(interval2);
        }
        setUsage();
      }, 1000);
      interval = interval2;

      async function setUsage() {
        const cpu:number = await getCPUUsage();
        CPUusage.push(cpu);
        setCPUUsage([...CPUusage]);
      }
    })();
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
