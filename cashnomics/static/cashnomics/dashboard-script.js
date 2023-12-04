window.addEventListener('load', function() {
  if (localStorage) {
    showSuccessAlert();
  }
});

function showSuccessAlert() {
  const alertBanner = document.createElement('div');
  alertBanner.classList.add('alert', 'alert-success');
  alertBanner.textContent = 'Your cashnomics chart has been saved!';

  const container = document.querySelector('.container');
  container.prepend(alertBanner);
}