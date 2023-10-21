import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  // Use a ref to keep track of the chart instance
  const chartRef = useRef(null);

  useEffect(() => {
    // Data for the pie chart
    const data = {
      labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      datasets: [
        {
          data: [10, 15, 7, 20, 25],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
          ],
        },
      ],
    };

    // Configuration options
    const options = {
      responsive: true,
    };

    // Get the canvas element
    const ctx = document.getElementById('pieChart').getContext('2d');

    // Check if a chart instance already exists and destroy it if it does
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create the pie chart and store it in the ref
    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options,
    });
  }, []);

  return <canvas id="pieChart" style={{ width: '100%' }} height="600"></canvas>;
};

export default PieChart;
