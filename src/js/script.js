$(document).ready(function() {
  var range = document.getElementById('range');

  noUiSlider.create(range, {
      start: [49],
      step: 1,
      range: {
          'min': [0],
          'max': [100]
      }
  });

  autosize($('textarea'));
});