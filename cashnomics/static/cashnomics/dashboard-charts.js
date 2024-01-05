// Create the chart instance
const cashChart = document.getElementById('cashChart');
let cashData = [];

const myChart = new Chart(cashChart, {
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'],
    datasets: [{
      data: cashData,
      backgroundColor: ['#FF6384'],
      borderWidth: 1,
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Set to false to allow the chart to dynamically resize
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

function updateChart() {
    myChart.data.datasets[0].data = cashData;
    myChart.update();
  }