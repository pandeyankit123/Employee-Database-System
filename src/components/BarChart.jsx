import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto'

const BarChart = ({ data }) => {
  useEffect(() => {
    const canvas = document.getElementById('bar-chart');
    const context = canvas.getContext('2d');
    const chart = new Chart(context, {
      type: 'bar',
      data: data,
      options: {
        // your options here
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas id="bar-chart" />;
};

export default BarChart;
