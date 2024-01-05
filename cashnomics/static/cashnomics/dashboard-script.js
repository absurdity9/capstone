window.addEventListener("load", function () {
  // Access the data from API Jason
  var jsonData = JSON.parse(document.getElementById('financial_model_data').textContent);
  var data = JSON.parse(jsonData);
  const financialModelCount = Object.keys(data).length;
  console.log("No of models:",financialModelCount)

    for (let i = 0; i < financialModelCount; i++) {
      // Create a canvas element for each chart
      const canvas = document.createElement('canvas');
      canvas.id = `chart${i}`;
      document.getElementById('chartContainer').appendChild(canvas);
      // Get the data for the current financial model
      const modelId = Object.keys(data)[i];
      const modelData = data[modelId];

      // Extract the necessary data for the chart
      const incomeAfterTax = modelData.income_forms[0].income_after_tax;
      const expenseCostShBills = modelData.expenses_forms[0].cost_sh_bills;
      console.log("Income after tax for model", i+1, ":", incomeAfterTax);
      // Create the chart instance
      const ctx = document.getElementById(`chart${i}`).getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Income After Tax'],
          datasets: [{
            data: [incomeAfterTax],
            backgroundColor: '#FF6384',
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
