// Inputs for chart data
const salaryInput = document.getElementById('Salary');

// Inputs for user-data

// Get progress bar element
const progressBar = document.getElementById('progressBar');
// Get progress pills
const progressPills = document.querySelectorAll('.nav-pills .nav-link');

// Get buttons
const nextButton = document.getElementById('nextBtn');
const backButton = document.getElementById('prevBtn');

let currentStep = 0;

// Button click handlers
nextButton.addEventListener('click', nextStep);
backButton.addEventListener('click', prevStep);

// Next step
function nextStep() {
  updateStep(currentStep + 1);
}

// Previous step
function prevStep() {
  updateStep(currentStep - 1);
}

// Progress pill click handler
progressPills.forEach((pill, index) => {
  pill.addEventListener('click', () => {
    updateStep(index);
  });
});


// Update step
function updateStep(step) {
  // Hide current step
  formSteps[currentStep].classList.remove('show', 'active');
  progressPills[currentStep].classList.remove('active');

  // Update current step
  currentStep = step;

  // Show updated step
  formSteps[currentStep].classList.add('show', 'active');
  progressPills[currentStep].classList.add('active');

  // Update progress bar
  const progress = ((currentStep + 1) / formSteps.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.setAttribute('aria-valuenow', progress);

  // Enable/disable buttons based on current step
  if (currentStep === 0) {
    backButton.disabled = true;
  } else {
    backButton.disabled = false;
  }
    // Handling buttons
  if (currentStep === formSteps.length - 1) {
    nextButton.style.display = 'none';
    backButton.style.display = 'none';
  
    // Create new buttons
    const saveButton = document.createElement('a');
    saveButton.innerText = 'Save my moneymap';
    saveButton.href = '/accounts/signup/';
    saveButton.classList.add('btn', 'btn-success', 'mr-3');
  
    const exploreButton = document.createElement('a');
    exploreButton.innerText = 'Explore';
    exploreButton.href = '/accounts/signup/';
    exploreButton.classList.add('btn', 'btn-info');
  
    // Append new buttons to the container
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(exploreButton);
    }else {
      nextButton.innerText = 'Next';
      nextButton.classList.add('m-2');
    }

    // Saving Inputs Form 1 tab 1
    const salaryAmount = document.getElementById('salaryAmount'), salaryValue = parseInt(salaryInput.value);
    let age = document.getElementById('Age').value;
    let industry = document.getElementById('Industry').value;
    let netMonthlySalary = calculateNetSalary(salaryValue);
    let cashLeft;

    // Div for information container 1 tab 2
    if (currentStep === 1) {
      salaryAmount.textContent = salaryValue;
      netMonthlySalaryDisplay.textContent = netMonthlySalary.toFixed(2);
      chartData.push(netMonthlySalary);
      // Save to LS
      var formData = {
        salary: salaryValue,
        income_after_tax: netMonthlySalary,
      };
      var formData2 = {
        age: age,
        industry: industry
      };
    
    localStorage.setItem('IncomeData', JSON.stringify(formData));
    localStorage.setItem('UserProfileData', JSON.stringify(formData2));

    }
    // Saving Inputs for Form 2 in tab 3
    const cost_sh_bills = document.getElementById('cost_sh_bills').value;
    const cost_travel = document.getElementById('cost_travel').value;
    const cost_groceries = document.getElementById('cost_groceries').value;
    const cost_other = document.getElementById('cost_other').value;
    const totalCost = parseInt(cost_sh_bills) + parseInt(cost_travel) + parseInt(cost_groceries) + parseInt(cost_other);
    
    cashLeft = netMonthlySalary - totalCost;
    // Focus for forms
    if(currentStep===2){
      document.getElementById('cost_sh_bills').focus();
    }

    // Div for information container 2 tab 4
    if (currentStep === 3) {
      const totalCostdisplay = document.getElementById('totalCosts');
      totalCostdisplay.textContent = totalCost;
      cashLeft = netMonthlySalary - totalCost;
      document.getElementById('cashLeftDisplay1').textContent = cashLeft.toFixed(2);
      chartData2.push(netMonthlySalary, totalCost, cashLeft);
      // Save to LS
      var formData = {
        cost_sh_bills: cost_sh_bills,
        cost_travel: cost_travel,
        cost_groceries: cost_groceries,
        cost_other: cost_other,
        money_aftercosts: cashLeft
    };
    
    localStorage.setItem('ExpensesData', JSON.stringify(formData));

    }
    // Saving inputs for Form 3 tab 4
    let amtSavings = document.getElementById('amt_Savings').value;
    let yieldSavings = document.getElementById('yield_Savings').value;
    let amtVanguard = document.getElementById('amt_Vanguard').value;
    let yieldVanguard = document.getElementById('yield_Vanguard').value;

    // Convert monthly savings to yearly savings
    amtSavings *= 12;
    amtVanguard *= 12;

    // Div for Form 3 tab 4
    if (currentStep === 4) {
      document.getElementById('cashLeftDisplay2').textContent = cashLeft.toFixed(2);
      document.getElementById('amt_Savings').focus();
    }
    if (currentStep === 5) {
      console.log(amtSavings);
    
      // Math for capital growth
      const years = 5; // Number of years
      const savingsAmounts = [];
      const vanguardAmounts = [];
      const capitals = []; // Array to store capital values
    
      let capital = amtSavings + amtVanguard; // Initial capital
    
      for (let year = 1; year <= years; year++) {
        const savingsAfterYear = amtSavings * (1 + yieldSavings / 100);
        const vanguardAfterYear = amtVanguard * (1 + yieldVanguard / 100);
        savingsAmounts.push(savingsAfterYear.toFixed(2));
        vanguardAmounts.push(vanguardAfterYear.toFixed(2));
        capital = savingsAfterYear + vanguardAfterYear; // Calculate capital after each year
        capitals.push(capital.toFixed(2)); // Store capital value in the array
        amtSavings = savingsAfterYear;
        amtVanguard = vanguardAfterYear;
      }
      chartData3.push(...capitals); // Push capitals array into chartdata3
      // Save to LS
      var formData = {
        amountSavings: amtSavings,
        interestRate: yieldSavings,
        amountVanguard: amtVanguard,
        benchmarkReturn: yieldVanguard
    };
    
    localStorage.setItem('SavingsInvestmentsData', JSON.stringify(formData));
    
      document.getElementById('capital_Display').textContent = capitals[4];
    }
  }

// Get form steps
const formSteps = document.querySelectorAll('.tab-pane');

// Hide all steps
formSteps.forEach((step, index) => {
  if (index === 0) {
    step.classList.add('show', 'active');
  } else {
    step.classList.remove('show', 'active');
  }
});

// Set initial progress bar width
progressBar.style.width = '0%';

// Set click event on first progress pill
progressPills[0].addEventListener('click', () => {
  updateStep(0);
});

// Get the edit icon element
const edit = document.querySelector('.edit');
edit.addEventListener('click', function(event) {
  event.preventDefault();
  const modal = new bootstrap.Modal(document.getElementById('editModal'));
  modal.show();
});

  // Get the saveEditsBtn element
  const saveEditsBtn = document.getElementById('saveEditsBtnn');

  // Add click event listener
  saveEditsBtn.addEventListener('click', function(event) {
    event.preventDefault();

    // Get the value from the edittedNetSalary input field
    const edittedNetSalaryInput = document.getElementById('edittedNetSalary');
    const newNetSalary = parseInt(edittedNetSalaryInput.value, 10); // Convert to integer

    // Convert the newNetSalary to an integer and update the netMonthlySalary variable
    netMonthlySalary = parseInt(newNetSalary, 10);
    
    // Update the netMonthlySalaryDisplay element in the HTML
    const netMonthlySalaryDisplay = document.getElementById('netMonthlySalaryDisplay');
    netMonthlySalaryDisplay.textContent = newNetSalary;

    // Update the chartData array with the new value
    chartData.pop(); // Remove the previous netMonthlySalary value
    chartData.push(newNetSalary); // Add the new netMonthlySalary value
    myChart.data.datasets[0].data = chartData;
    myChart.update();

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
  });