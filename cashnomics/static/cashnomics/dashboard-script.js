window.addEventListener('load', function() {
  if (localStorage) {
    console.log('Local storage exists.');
  } else {
    console.log('Local storage is not supported.');
  }
});