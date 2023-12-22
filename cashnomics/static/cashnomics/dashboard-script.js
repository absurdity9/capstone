window.addEventListener("load", function () {

  var jsonData = JSON.parse(document.getElementById('financial_model_data').textContent);

  var data = JSON.parse(jsonData);

  var incomeForms = data["2"]["income_forms"];

  // Output each item in the "income_forms" array
  incomeForms.forEach(function(form) {
    console.log(form);
  });
  
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
//var test = JSON.parse('{{ financial_model_data|escapejs|safe }}');
//console.log(test);
