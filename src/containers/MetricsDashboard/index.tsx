import React, { useEffect, useState } from 'react';
import {LineChart} from "./../../components/LineChart";
import {getCPUUsage, getGPUUsage, getRAMUsage} from "./../../services/apiRequests";
import "./index.scss";

export const MetricsDashboard = () => {
  const [CPUUsage, setCPUUsage] = useState<number[][]>([]);
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
    updateMetricsData(setCPUUsage, getCPUUsage);
    // (async function() {
    //   let CPUusage: number[][] = [];
    //   setUsage();

    //   const interval2 = setInterval(async ()=> {
    //     if (CPUusage.length > 20) {
    //       CPUusage.shift();
    //       // clearInterval(interval2);
    //     }
    //     setUsage();
    //   }, 5000);
    //   interval = interval2;

    //   async function setUsage() {
    //     const cpu:number = await getCPUUsage();
    //     CPUusage.push([new Date().getTime(), cpu]);
    //     setCPUUsage([...CPUusage]);
    //   }
    // })();
  }

  const updateGPUMetricsData = () => {
    updateMetricsData(setGPUUsage, getGPUUsage);
  }

  const updateRAMMetricsData = () => {
    updateMetricsData(setRAMUsage, getRAMUsage);
  }

  const updateMetricsData = async(setter: any, getter: any) => {
    (async function() {
      let usage: number[][] = [];
      setUsage();
      const interval2 = setInterval(async ()=> {
        if (usage.length > 5) {
          usage.shift();
          // clearInterval(interval2);
        }
        setUsage();
      }, 6000);
      interval = interval2;

      async function setUsage() {
        const res:number= await getter();
        usage.push([new Date().getTime(), res]);
        setter([...usage]);
      }
    })();
  }

  return (
    <div className="dashboard">
      <div className="line-chart"><LineChart title="CPU Usage(%)" chartValues={[{data: CPUUsage}]} /></div>
      <div className="line-chart"><LineChart title="GPU Usage(%)" chartValues={[{data: GPUUsage}]} /></div>
      <div className="line-chart"><LineChart title="RAM Usage(%)" chartValues={[{data: RAMUsage}]} /></div>
    </div>
  )
}
