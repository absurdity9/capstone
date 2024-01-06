window.addEventListener("load", function () {
  // Access the data from API Jason
  var jsonData = JSON.parse(document.getElementById('financial_model_data').textContent);
  var data = JSON.parse(jsonData);
  const financialModelCount = Object.keys(data).length;
  console.log("No of models:",financialModelCount)

for (let i = 0; i < financialModelCount; i++) {
  // Get the data for the current financial model
  const modelId = Object.keys(data)[i];
  const modelData = data[modelId];

  // Extract the necessary data for the chart
  const incomeAfterTax = modelData.income_forms[0].income_after_tax;
  const expensesForms = modelData.expenses_forms;
  const savingsInvestments = modelData.savings_investments;

  let totalCost = 0;

  for (let j = 0; j < expensesForms.length; j++) {
    const expenseCost = expensesForms[j].cost_sh_bills;
    totalCost += expenseCost;
  }

  const cashLeft = incomeAfterTax - totalCost;

  // Extract savings and ETF data
  const savingsAmt = modelData.savings_investments[0].savings_amt;
  const etfAmt = modelData.savings_investments[0].etf_amt;
  const etfRate = modelData.savings_investments[0].etf_rate;
  const savingsRate = modelData.savings_investments[0].savings_rate;

  let savingsAccumulated = 0;
  let etfAccumulated = 0;
  let capitals = []; // Array to store capital values

  for (let year = 1; year <= 5; year++) {
    // Calculate savings accumulated and ETF accumulated for the current year
    const savingsForYear = savingsAmt * savingsRate;
    const etfForYear = etfAmt * etfRate;

    // Add the savings accumulated and ETF accumulated to the respective arrays
    savingsAccumulated += savingsForYear;
    etfAccumulated += etfForYear;

    // Calculate the capital for the current year
    const capital = savingsAccumulated + etfAccumulated;

    // Store the capital value for the current year
    capitals.push(capital);
  }

  // Print the capitals for each year in the console
  console.log(`Model ID: ${modelId}`);
  console.log(`Capitals after each year:`, capitals);

  // Create a container div for each chart and model information
  const container = document.createElement('div');
  container.classList.add('chart-container');

  // Create a canvas element for each chart
  const canvas = document.createElement('canvas');
  canvas.id = `chart${i}`;
  canvas.classList.add('mb-5');
  container.appendChild(canvas);

  // Get the model name and date created
  const modelName = modelData.model_info.model_name;
  const dateCreated = modelData.model_info.date_created;

  // Create a heading element for the model name
  const modelNameHeading = document.createElement('h3');
  modelNameHeading.textContent = `${modelName}`;
  container.insertBefore(modelNameHeading, canvas);

  // Create a paragraph element for the date created
  const dateCreatedParagraph = document.createElement('p');
  dateCreatedParagraph.textContent = `Created on: ${dateCreated}`;
  container.insertBefore(dateCreatedParagraph, canvas);

  // Append the container to the chartContainer element
  document.getElementById('chartContainer').appendChild(container);

      // Create the chart instance
      const ctx = document.getElementById(`chart${i}`).getContext('2d');
      const chart = new Chart(ctx, {
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
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }

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
