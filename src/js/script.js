var range = document.getElementById('range');

  noUiSlider.create(range, {
      start: [4000],
      step: 1000,
      range: {
          'min': [2000],
          'max': [10000]
      }
  });

$(document).ready(function() {
  
});