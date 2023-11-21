const ctx1 = document.getElementById('cashInChart');
let chartData = JSON.parse(localStorage.getItem('chartData')) || [];

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

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'],
    datasets: [{
      label: '# of Votes',
      data: [1, 1, 8, 10, 10, 8, 1],
      borderWidth: 1
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

const ctx3 = document.getElementById('moneyMapChart');

new Chart(ctx3, {
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'],
    datasets: [{
      label: '# of Votes',
      data: [1, 1, 8, 10, 10, 8, 1],
      borderWidth: 1
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