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
    modelNameEditDiv.classList.add('d-flex','mb-1');
    const modelNameHeading = document.createElement('h3');
    modelNameHeading.classList.add('me-3', 'flexGrow');
    modelNameHeading.textContent = `${modelName}`;
    modelNameEditDiv.appendChild(modelNameHeading);
    
    const deleteButton = document.createElement('button'); //Delete btn
    deleteButton.classList.add('btn', 'btn-danger', 'me-3');
    deleteButton.textContent = 'Delete';
    modelNameEditDiv.appendChild(deleteButton);

    const editButton = document.createElement('button'); //Edit btn
    editButton.classList.add('btn', 'btn-secondary');
    editButton.textContent = 'Edit Model';
    modelNameEditDiv.appendChild(editButton);

    deleteButton.addEventListener('click', function() {
      deleteModel(modelName);
    });

    const salary = modelData.income_forms[0].salary;     
    const cost_sh_bills = modelData.expenses_forms[0].cost_sh_bills;     
    const cost_travel = modelData.expenses_forms[0].cost_travel;     
    const cost_groceries = modelData.expenses_forms[0].cost_groceries;     
    const cost_other = modelData.expenses_forms[0].cost_other;   

    editButton.addEventListener('click', function() {editModel(modelId,modelName,salary,cost_sh_bills,cost_travel,cost_groceries,cost_other, savingsAmt,etfAmt, etfRate,savingsRate); }); // Edit btn eventlistener
    
    columnDiv.appendChild(modelNameEditDiv);
    const dateCreatedParagraph = document.createElement('p');
    dateCreatedParagraph.classList.add('text-secondary');
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
          label: "Monthly Cashflows",
          data: [incomeAfterTax, totalCost, cashLeft],
          backgroundColor: ['#405858', '#407173', '#519294'],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: "#B3AEBD", // Set the x-axis label font color to ##B3AEBD
            },
          },
          y: {
            ticks: {
              color: "#B3AEBD", // Set the y-axis label font color to ##B3AEBD
            },
          },
        },
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
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
          label: "Household Assets",
          data: modelCapitals,
          borderColor: '#529C9E',
          backgroundColor: "#519294",

          fill: true,
          pointRadius: 2,
          pointBackgroundColor: '#529C9E',
          pointBorderColor: '#529C9E',
          pointHoverRadius: 10,
          pointHoverBackgroundColor: '#FF6384',
          pointHoverBorderColor: '#529C9E',
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
//Edit modal 
function editModel(modelId, modelName, salary, cost_sh_bills, cost_travel, cost_groceries, cost_other, savingsAmt, etfAmt, etfRate, savingsRate) {
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

  const form = document.querySelector('form');
  const saveButton = document.getElementById('saveEditsBtn');

  saveButton.addEventListener('click', () => {
    console.log("Save Edits Btn Clicked")
    const modelName = document.getElementById('modelName').value;
    const salary = parseFloat(document.getElementById('Salary').value);
    const costShBills = parseFloat(document.getElementById('cost_sh_bills').value);
    const costTravel = parseFloat(document.getElementById('cost_travel').value);
    const costGroceries = parseFloat(document.getElementById('cost_groceries').value);
    const costOther = parseFloat(document.getElementById('cost_other').value);
    const savingsAmt = parseFloat(document.getElementById('amt_Savings').value);
    const savingsRate = parseFloat(document.getElementById('yield_Savings').value);
    const etfAmt = parseFloat(document.getElementById('amt_Vanguard').value);
    const etfRate = parseFloat(document.getElementById('yield_Vanguard').value);

    const data = {
      model_name: modelName,
      income_data: JSON.stringify({ salary }),
      expenses_data: JSON.stringify({
        cost_sh_bills,
        cost_travel,
        cost_groceries,
        cost_other,
      }),
      savings_data: JSON.stringify({ savings_amt: savingsAmt, savings_rate: savingsRate, etf_amt: etfAmt, etf_rate: etfRate }),
    };

    console.log(data);

    fetch(`http://127.0.0.1:8000/update/${modelId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Success
          console.log('Data successfully posted.');
          closeModal();
          location.reload();

        } else {
          // Error
          console.log('Error posting data.');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  });
}

function deleteModel(modelId) {
  const modalTitle = document.getElementById('deleteModalLabel');
  modalTitle.textContent = 'Edit Model - ' + modelId;

  const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
  modal.show();
}

function closeModal() { // Close fx for edit modal
  const modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
}
const editCloseButton = document.getElementById('closeModalButton'); // Close fx for edit modal
editCloseButton.addEventListener('click', closeModal);

const editCloseIcon = document.querySelector('#closeIcon');
editCloseIcon.addEventListener('click', closeModal);

function closeDeleteModal() {
  const modal = bootstrap.Modal.getInstance(deleteModal);
  modal.hide();
}

const deleteCloseButton = document.getElementById('DeletecloseModalButton'); // Close fx for edit modal
deleteCloseButton.addEventListener('click', closeDeleteModal);

const deleteCloseIcon = document.querySelector('#deleteCloseIcon');
deleteCloseIcon.addEventListener('click', closeDeleteModal);