const ctx1 = document.getElementById('cashInChart');

new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
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

const ctx2 = document.getElementById('cashOutChart');

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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