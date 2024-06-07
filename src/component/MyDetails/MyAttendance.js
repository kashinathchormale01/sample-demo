import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { green } from '@mui/material/colors';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const MyAttendance = () => {
  return (
    <>
     <Gauge
      height={200}
  value={75}
  startAngle={0}
  endAngle={360}
  innerRadius="80%"
  outerRadius="100%"
  text={
    ({ value, valueMax }) => `Attendance: ${value} %`
 }
 sx={(theme) => ({
  [`& .${gaugeClasses.valueText}`]: {
    fill: green,
  },
})} 
/>

<BarChart
      xAxis={[{ scaleType: 'band', data: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'] }]}
      series={[{ data: [25,21,30,22,11,28,26,12,0,0,23,27]}]}
      width={700}
      height={300}
    />
    
<PieChart
colors={['orange', '#02b2af']}
      series={[
        {
          data: [
            { id: 0, value: 10, color:'#02b2af', label: 'Total Present days' },
            { id: 1, value: 15, color:'orange', label: 'Total Absent days' },
          ],
        },
      ]}
      width={500}
      height={200}
    />
    </>
  )
}

export default MyAttendance