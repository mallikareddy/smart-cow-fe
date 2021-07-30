import {METRICS_API} from "./main.js"

export const getCPUUsage  = async() => {
    const response = await METRICS_API.get('/cpu/usage');
    return response.status === 200 ? response.data : []
}

export const getRAMUsage  = async() => {
  const response = await METRICS_API.get('/ram/usage');
  return response.status === 200 ? response.data : []
}

export const getGPUUsage  = async() => {
  const response = await METRICS_API.get('/gpu/usage');
  return response.status === 200 ? response.data : []
}
