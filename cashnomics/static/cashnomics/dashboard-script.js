window.addEventListener("load", function () {
  // Access the financial models from API Jason
  var jsonData = JSON.parse(document.getElementById('financial_model_data').textContent);
  var data = JSON.parse(jsonData);
  // Access the information inside the data object
  for (var modelId in data) {
    var modelData = data[modelId];
    var incomeForms = modelData.income_forms;
    var expensesForms = modelData.expenses_forms;
    var savingsInvestments = modelData.savings_investments;

    var incomeAfterTax = incomeForms[0].income_after_tax;
    var expensesFormData = expensesForms[0];
    var savingsInvestmentsData = savingsInvestments[0];

    var expenseCostShBills = expensesFormData.cost_sh_bills;
    var expenseCostTravel = expensesFormData.cost_travel;
    var expenseCostGroceries = expensesFormData.cost_groceries;
    var expenseCostOther = expensesFormData.cost_other;
    var expenseMoneyAfterCosts = expensesFormData.money_aftercosts;

    var savingsAmount = savingsInvestmentsData.savings_amt;
    var savingsRate = savingsInvestmentsData.savings_rate;
    var etfAmount = savingsInvestmentsData.etf_amt;
    var etfRate = savingsInvestmentsData.etf_rate;

    console.log('Model ID:', modelId);
    console.log('Income After Tax:', incomeAfterTax);
    console.log('Expense Cost - Sh Bills:', expenseCostShBills);
    console.log('Expense Cost - Travel:', expenseCostTravel);
    console.log('Expense Cost - Groceries:', expenseCostGroceries);
    console.log('Expense Cost - Other:', expenseCostOther);
    console.log('Expense Money After Costs:', expenseMoneyAfterCosts);
    console.log('Savings Amount:', savingsAmount);
    console.log('Savings Rate:', savingsRate);
    console.log('ETF Amount:', etfAmount);
    console.log('ETF Rate:', etfRate);
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

  // Parse the JSON data
