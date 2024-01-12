window.addEventListener("load", function () {
  var jsonData = JSON.parse(document.getElementById('financial_model_data').textContent);
  var data = JSON.parse(jsonData);
  const financialModelCount = Object.keys(data).length;
  let capitals = [];

  for (let i = 0; i < financialModelCount; i++) {   // Loop for each model
    const modelId = Object.keys(data)[i];     // Get the data for the current financial model
    const modelData = data[modelId];
    console.log(modelData);
    const incomeAfterTax = modelData.income_forms[0].income_after_tax;     // Income 
    const expensesForms = modelData.expenses_forms;
    let totalCost = 0;
      for (let j = 0; j < expensesForms.length; j++) {     // Calculate total costs
        const expenseCost = expensesForms[j].cost_sh_bills;
        totalCost += expenseCost;
      }
    const cashLeft = incomeAfterTax - totalCost; // Calculate cash remaining

    const savingsAmt = modelData.savings_investments[0].savings_amt; // Get initial amounts
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

    const container = document.createElement('div');
    container.classList.add('chart-container'); // Create chart container
    const modelName = modelData.model_info.model_name;
    const dateCreated = modelData.model_info.date_created;
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('col-12', 'd-flex', 'flex-column'); // Add 'flex-column' class
    const modelNameEditDiv = document.createElement('div'); // Create a div to hold the model name and edit button
    modelNameEditDiv.classList.add('d-flex');
    const modelNameHeading = document.createElement('h3');
    modelNameHeading.textContent = `${modelName}`;
    modelNameEditDiv.appendChild(modelNameHeading);
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-secondary', 'ml-2');
    editButton.textContent = 'Edit Model';

    const salary = modelData.income_forms[0].salary;     
    const cost_sh_bills = modelData.expenses_forms[0].cost_sh_bills;     
    const cost_travel = modelData.expenses_forms[0].cost_travel;     
    const cost_groceries = modelData.expenses_forms[0].cost_groceries;     
    const cost_other = modelData.expenses_forms[0].cost_other;   

    editButton.addEventListener('click', function() {editModel(modelId,modelName,salary,cost_sh_bills,cost_travel,cost_groceries,cost_other, savingsAmt,etfAmt, etfRate,savingsRate); }); // Edit btn eventlistener
    
    modelNameEditDiv.appendChild(editButton);
    columnDiv.appendChild(modelNameEditDiv);
    const dateCreatedParagraph = document.createElement('p');
    dateCreatedParagraph.textContent = `Created on: ${dateCreated}`;
    columnDiv.appendChild(dateCreatedParagraph);
    container.appendChild(columnDiv);
    
    const chartDiv = document.createElement('div');
    chartDiv.classList.add('chart-flex-container');
    chartDiv.style.display = 'flex';
    const incomeCanvas = document.createElement('canvas'); // Create income chart canvas
    incomeCanvas.id = `incomeChart${i}`;
    incomeCanvas.classList.add('mb-5');
    incomeCanvas.classList.add('mr-5');
    chartDiv.appendChild(incomeCanvas);
  
    const savingsCanvas = document.createElement('canvas'); // Create savings chart canvas
    savingsCanvas.id = `savingsChart${i}`;
    savingsCanvas.classList.add('mb-5');
    savingsCanvas.classList.add('mr-5');
    chartDiv.appendChild(savingsCanvas);
    container.appendChild(chartDiv);
    document.getElementById('chartContainer').appendChild(container);
    
    // Destroy the previous chart instance if it exists (for the savings chart)
    if (window.savingsChartInstances && window.savingsChartInstances[i]) {
      window.savingsChartInstances[i].destroy();
    }

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

  if (localStorage) {
    // Retrieve data from localStorage
    const expensesData = localStorage.getItem("ExpensesData");
    const incomeData = localStorage.getItem("IncomeData");
    const savingsData = localStorage.getItem("SavingsInvestmentsData");
    const profileData = localStorage.getItem("UserProfileData");

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
            // Clear the data from localStorage
          localStorage.removeItem("ExpensesData");
          localStorage.removeItem("IncomeData");
          localStorage.removeItem("SavingsInvestmentsData");
          localStorage.removeItem("UserProfileData");
          location.reload();
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

function editModel(modelId,modelName,salary,cost_sh_bills,cost_travel,cost_groceries,cost_other, savingsAmt, etfAmt, etfRate, savingsRate) {
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.textContent = 'Edit Model - ' + modelId;

  // Set the values of the input fields
  document.getElementById('modelName').value = modelName;
  document.getElementById('Salary').value = salary;
  document.getElementById('cost_sh_bills').value = cost_sh_bills;
  document.getElementById('cost_travel').value = cost_travel;
  document.getElementById('cost_groceries').value = cost_groceries;
  document.getElementById('cost_other').value = cost_other;
  document.getElementById('amt_Savings').value = savingsAmt;
  document.getElementById('amt_Vanguard').value = etfAmt;
  document.getElementById('yield_Savings').value = savingsRate;
  document.getElementById('yield_Vanguard').value = etfRate;

  const modal = new bootstrap.Modal(document.getElementById('editModal'));
  modal.show();
}

function closeModal() {
  const modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
}

// Event listener for closing the modal when the "Close" button is clicked
const closeButton = document.getElementById('closeModalButton');
closeButton.addEventListener('click', closeModal);

// Event listener for closing the modal when the "x" button is clicked
const closeIcon = document.querySelector('.modal-header .close');
closeIcon.addEventListener('click', closeModal);