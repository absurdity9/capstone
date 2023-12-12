window.addEventListener("load", function () {

  if (localStorage) {
    // Retrieve data from localStorage
    const expensesData = localStorage.getItem("ExpensesFormData");
    const incomeData = localStorage.getItem("IncomeFormData");
    const savingsData = localStorage.getItem("SavingsInvestmentsData");
      // Send the data to the API endpoint
      fetch("http://127.0.0.1:8000/json_api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenses: expensesData,
          income: incomeData,
          savings: savingsData,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Data sent successfully!");
            showSuccessAlert();
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
);

function showSuccessAlert() {
  const alertBanner = document.createElement("div");
  alertBanner.classList.add("alert", "alert-success");
  alertBanner.textContent = "Your cashnomics chart has been saved!";

  const container = document.querySelector(".container");
  container.prepend(alertBanner);
}
