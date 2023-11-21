const ctx1 = document.getElementById('cashInChart');
let chartData = [];

new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'],
    datasets: [{
      data: chartData,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Set to false to allow the chart to dynamically resize
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const ctx2 = document.getElementById('cashOutChart');
let chartData2 = [];

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'],
    datasets: [{
      data: chartData,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      borderWidth: 1,
    }]
  },
  options: {
    responsive: true, // Enable responsiveness
    maintainAspectRatio: false, // Set to false to allow the chart to dynamically resize
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
