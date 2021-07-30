import React, { useEffect, useState } from 'react';
import {LineChart} from "./../../components/LineChart"
import {getCPUUsage, getGPUUsage, getRAMUsage} from "./../../services/apiRequests"

export const MetricsDashboard = () => {
  const [CPUUsage, setCPUUsage] = useState<number[]>([]);
  const [GPUUsage, setGPUUsage] = useState<number[]>([]);
  const [RAMUsage, setRAMUsage] = useState<number[]>([]);
  
  useEffect(() => {
    updateCPUMetricsData();
    updateGPUMetricsData();
    updateRAMMetricsData();
  }, []);

  const updateCPUMetricsData = async() => {
    const cpu:number[] = await getCPUUsage();
    setCPUUsage([...cpu]);
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
    <div>
      <LineChart title="CPU Usage(%)" chartValues={[{data: CPUUsage}]} />
      <LineChart title="GPU Usage(%)" chartValues={[{data: GPUUsage}]} />
      <LineChart title="RAM Usage(%)" chartValues={[{data: RAMUsage}]} />
    </div>
  )
}
