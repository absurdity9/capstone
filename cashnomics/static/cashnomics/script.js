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

  if (currentStep === formSteps.length - 1) {
    console.log("End")
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
    const buttonContainer = document.getElementById('pills-step5'); // Replace 'buttonContainer' with the actual ID of the container element
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(exploreButton);
    } else {
      nextButton.innerText = 'Next';
      nextButton.classList.add('m-2');
    }
      // Add salary input value to chartData array
    if (currentStep === 1) {
      const salaryValue = parseInt(salaryInput.value);
      const salaryAmount = document.getElementById('salaryAmount');
      salaryAmount.textContent = salaryValue;
      chartData.push(salaryValue);
      localStorage.setItem('chartData', JSON.stringify(chartData));
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