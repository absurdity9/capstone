window.addEventListener("load", function () {
  var jsonData = JSON.parse(document.getElementById('financial_model_data').textContent);
  var data = JSON.parse(jsonData);
  const financialModelCount = Object.keys(data).length;
  let capitals = [];
  for (let i = 0; i < financialModelCount; i++) {   // Loop for each model
    const modelId = Object.keys(data)[i];     // Get the data for the current financial model
    const modelData = data[modelId];
    const incomeAfterTax = modelData.income_forms[0].income_after_tax;     // Income 
    const expensesForms = modelData.expenses_forms;
    const savingsInvestments = modelData.savings_investments;
    let totalCost = 0;
    for (let j = 0; j < expensesForms.length; j++) {     // Calculate total costs
      const expenseCost = expensesForms[j].cost_sh_bills;
      totalCost += expenseCost;
    }
    const cashLeft = incomeAfterTax - totalCost; // Calculate cash remaining
    const savingsAmt = modelData.savings_investments[0].savings_amt; // Get the data for the savings chart
    const etfAmt = modelData.savings_investments[0].etf_amt;
    const etfRate = modelData.savings_investments[0].etf_rate;
    const savingsRate = modelData.savings_investments[0].savings_rate;
    let savingsAccumulated = 0;
    let etfAccumulated = 0;
    let modelCapitals = []; // Array to store capital values 

    for (let year = 1; year <= 5; year++) {
      const savingsForYear = savingsAmt * savingsRate; // Calculate savings accumulated & ETF accumulated for the current year
      const etfForYear = etfAmt * etfRate;
      savingsAccumulated += savingsForYear;
      etfAccumulated += etfForYear;
      const capital = savingsAccumulated + etfAccumulated;
      modelCapitals.push(capital);
    }

    // Print the capitals for each year in the console
    console.log(`Model ID: ${modelId}`); console.log(`Capitals after each year:`, modelCapitals);

    const container = document.createElement('div');    // Create a container div for each chart and model information
    container.classList.add('chart-container');
    
    const modelName = modelData.model_info.model_name;     // Get the model name and date created
    const dateCreated = modelData.model_info.date_created;
    
    const columnDiv = document.createElement('div');    // Create a new div for the heading and paragraph
    columnDiv.classList.add('col-12');    // Add 'col-12' class for full width
    
    const modelNameHeading = document.createElement('h3');     // Create a heading element for the model name
    modelNameHeading.textContent = `${modelName}`;
    columnDiv.appendChild(modelNameHeading);
    
    const dateCreatedParagraph = document.createElement('p');     // Create a paragraph element for the date created
    dateCreatedParagraph.textContent = `Created on: ${dateCreated}`;
    columnDiv.appendChild(dateCreatedParagraph);
    
    container.appendChild(columnDiv);    // Append the column div to the container
    
    const chartDiv = document.createElement('div');    // Create a new div for the charts
    chartDiv.classList.add('chart-flex-container');    // Add a class for flex display
    chartDiv.style.display = 'flex';    // Add inline style for display:flex
    
    const incomeCanvas = document.createElement('canvas');     // Create a canvas element for the income chart
    incomeCanvas.id = `incomeChart${i}`;
    incomeCanvas.classList.add('mb-5');
    incomeCanvas.classList.add('mr-5');
    chartDiv.appendChild(incomeCanvas);
    
    const savingsCanvas = document.createElement('canvas');     // Create a canvas element for the savings chart
    savingsCanvas.id = `savingsChart${i}`;
    savingsCanvas.classList.add('mb-5');
    savingsCanvas.classList.add('mr-5');
    chartDiv.appendChild(savingsCanvas);
    
    container.appendChild(chartDiv);    // Append the chart div to the container
    
    document.getElementById('chartContainer').appendChild(container);     // Append the container to the chartContainer element
    // Destroy the previous chart instance if it exists (for the savings chart)
    if (window.savingsChartInstances && window.savingsChartInstances[i]) {
      window.savingsChartInstances[i].destroy();
    }

    // Create the income chart instance
    const incomeCtx = document.getElementById(`incomeChart${i}`).getContext('2d');
    const incomeChart = new Chart(incomeCtx, {
      type: 'bar',
      data: {
        labels: ['Cash In', 'Cash Out', 'Cash Left'],
        datasets: [{
          data: [incomeAfterTax, totalCost, cashLeft],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y:{
            beginAtZero: true
          }
        }
      }
    });

    // Store the income chart instance
    if (!window.incomeChartInstances) {
      window.incomeChartInstances = [];
    }
    window.incomeChartInstances[i] = incomeChart;

    // Destroy the previous chart instance if it exists (for the savings chart)
    if (window.savingsChartInstances && window.savingsChartInstances[i]) {
      window.savingsChartInstances[i].destroy();
    }

    // Create the savings chart instance
    const savingsCtx = document.getElementById(`savingsChart${i}`).getContext('2d');
    const savingsChart = new Chart(savingsCtx, {
      type: 'line',
      data: {
        labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        datasets: [{
          label: 'Savings Accumulated',
          data: modelCapitals,
          borderColor: '#FF6384',
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: '#FF6384',
          pointBorderColor: '#FF6384',
          pointHoverRadius: 10,
          pointHoverBackgroundColor: '#FF6384',
          pointHoverBorderColor: '#FF6384',
          borderWidth: 2
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Store the savings chart instance
    if (!window.savingsChartInstances) {
      window.savingsChartInstances = [];
    }
    window.savingsChartInstances[i] = savingsChart;
    capitals.push(modelCapitals); // Store the capital values for all models
  }

  console.log("All capitals:", capitals);

  if (localStorage) {
    // Retrieve data from localStorage
    const expensesData = localStorage.getItem("ExpensesData");
    const incomeData = localStorage.getItem("IncomeData");
    const savingsData = localStorage.getItem("SavingsInvestmentsData");
    const profileData = localStorage.getItem("UserProfileData");

    // Log the data to be sent
    console.log("Data to be sent:", {
      expenses: expensesData,
      income: incomeData,
      savings: savingsData,
    });

      // Send the data to the API endpoint
      if (expensesData || incomeData || savingsData || profileData) {
        fetch("http://127.0.0.1:8000/json_api", {
          method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenses: expensesData,
          income: incomeData,
          savings: savingsData,
          profile: profileData,
        }),
      })
        .then((response) => {
          if (response.ok) {
            showSuccessAlert();
            // Clear the data from localStorage
          localStorage.removeItem("ExpensesData");
          localStorage.removeItem("IncomeData");
          localStorage.removeItem("SavingsInvestmentsData");
          localStorage.removeItem("UserProfileData");
          console.log("Data cleared from localStorage.");
          } else {
            console.error("Failed to send data.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No data found in localStorage.");
    }
  }
})

function showSuccessAlert() {
  const alertBanner = document.createElement("div");
  alertBanner.classList.add("alert", "alert-success");
  alertBanner.textContent = "Your cashnomics chart has been saved!";

  const container = document.querySelector(".container");
  container.prepend(alertBanner);
}
