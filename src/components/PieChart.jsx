import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import randomColor from 'randomcolor';
import Chart from 'chart.js/auto'

const PieChart = ({ data }) => {
  const backgroundColors = randomColor({
    count: data.labels.length,
    luminosity: 'light',
  });

  useEffect(() => {
    const canvas = document.getElementById('pie-chart');
    const context = canvas.getContext('2d');
    const chart = new Chart(context, {
      type: 'pie',
      data: data,
      options: {
        // your options here
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas id="pie-chart" />;
};

export default PieChart;
