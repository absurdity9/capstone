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

// Progress pill click handler
progressPills.forEach((pill, index) => {
  pill.addEventListener('click', () => {
    updateStep(index);
  });
});

// Next step
function nextStep() {
  updateStep(currentStep + 1);
}

// Previous step
function prevStep() {
  updateStep(currentStep - 1);
}

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
    // Final step
  if (currentStep === formSteps.length - 1) {
    console.log("End");
    nextButton.style.display = 'none';
    backButton.style.display = 'none';
  
    // Create new buttons
    const saveButton = document.createElement('a');
    saveButton.innerText = 'Save my moneymap';
    saveButton.href = '/signup';
    saveButton.classList.add('btn', 'btn-success', 'mr-3');
  
    const exploreButton = document.createElement('a');
    exploreButton.innerText = 'Explore';
    exploreButton.href = '/explore';
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
    let netMonthlySalary = calculateNetSalary(salaryValue);
    let cashLeft;
    // Div for information container 1 tab 2
    if (currentStep === 1) {
      salaryAmount.textContent = salaryValue;
      netMonthlySalaryDisplay.textContent = netMonthlySalary.toFixed(2);
      chartData.push(netMonthlySalary);
    }
    // Saving Inputs for Form 2 in tab 3
    const costShBills = document.getElementById('cost_sh_bills').value;
    const costTravel = document.getElementById('cost_travel').value;
    const costGroceries = document.getElementById('cost_groceries').value;
    const costOther = document.getElementById('cost_other').value;
    const totalCost = parseInt(costShBills) + parseInt(costTravel) + parseInt(costGroceries) + parseInt(costOther);
    
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
      
      console.log('Savings Amounts after each year:', savingsAmounts);
      console.log('Vanguard Amounts after each year:', vanguardAmounts);
      console.log('Capitals after each year:', capitals);
    
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