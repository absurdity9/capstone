// Get form steps
const formSteps = document.querySelectorAll('.form_wrap .data_info');

// Get progress bar elements  
const progressBars = document.querySelectorAll('.header ul li');

// Get buttons
const nextButtons = document.querySelectorAll('.btn_next');
const backButtons = document.querySelectorAll('.btn_back');

let currentStep = 0;

// Hide all steps
formSteps.forEach(step => step.style.display = 'none');

// Show first step
formSteps[0].style.display = 'block';

// Set first progress bar active  
progressBars[0].classList.add('active');

// Button click handlers
nextButtons.forEach(btn => {
  btn.addEventListener('click', nextStep)  
});

backButtons.forEach(btn => {
  btn.addEventListener('click', prevStep)
});

// Next step
function nextStep() {
	formSteps[currentStep].style.display = 'none';
	currentStep++;  
	formSteps[currentStep].style.display = 'block';
	progressBars[currentStep].classList.add('active');
  }
  
  // Previous step
  function prevStep() {
	progressBars[currentStep].classList.remove('active');
	formSteps[currentStep].style.display = 'none';
	currentStep--;
	formSteps[currentStep].style.display = 'block'; 
	progressBars[currentStep].classList.add('active');
  }