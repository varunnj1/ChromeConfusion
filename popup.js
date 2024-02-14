/*
document.addEventListener('DOMContentLoaded', function () {
  // Load stored values
  loadStoredValues();

  // Add event listeners
  document.getElementById('calculateButton').addEventListener('click', function () {
    calculateMetrics();
    saveValues();
  });

  document.getElementById('resetButton').addEventListener('click', function () {
    resetValues();
    calculateMetrics();
    saveValues();
  });

  // Add event listeners to input fields to save values on change
  ['tp', 'fp', 'fn', 'tn'].forEach(function (id) {
    const inputElement = document.getElementById(id);
    if (inputElement) {
      inputElement.addEventListener('input', saveValues);
    } else {
      console.error(`Element with id '${id}' not found.`);
    }
  });
});

function loadStoredValues() {
  if (chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['tp', 'fp', 'fn', 'tn'], function (result) {
      document.getElementById('tp').value = result.tp || 0;
      document.getElementById('fp').value = result.fp || 0;
      document.getElementById('fn').value = result.fn || 0;
      document.getElementById('tn').value = result.tn || 0;

      // Calculate metrics
      calculateMetrics();
    });
  }
}

function calculateMetrics() {
  const tp = parseFloat(document.getElementById('tp').value) || 0;
  const fp = parseFloat(document.getElementById('fp').value) || 0;
  const fn = parseFloat(document.getElementById('fn').value) || 0;
  const tn = parseFloat(document.getElementById('tn').value) || 0;

  const specificity = tn === 0 ? 0 : tn / (tn + fp);
  const sensitivity = tp === 0 ? 0 : tp / (tp + fn);
  const precision = tp === 0 ? 0 : tp / (tp + fp);
  const accuracy = (tp + tn) === 0 ? 0 : (tp + tn) / (tp + fp + fn + tn);
  const f1Score = (2 * tp) === 0 ? 0 : (2 * tp) / (2 * tp + fp + fn);
  const negativeRate = tn === 0 ? 0 : tn / (tn + fn);

  // Display results
  document.getElementById('specificity').innerText = "Specificity: " + specificity.toFixed(4);
  document.getElementById('sensitivity').innerText = "Sensitivity: " + sensitivity.toFixed(4);
  document.getElementById('precision').innerText = "Precision: " + precision.toFixed(4);
  document.getElementById('accuracy').innerText = "Accuracy: " + accuracy.toFixed(4);
  document.getElementById('f1Score').innerText = "F1 Score: " + f1Score.toFixed(4);
  document.getElementById('negativeRate').innerText = "Negative Rate: " + negativeRate.toFixed(4);
}

function resetValues() {
  document.getElementById('tp').value = 0;
  document.getElementById('fp').value = 0;
  document.getElementById('fn').value = 0;
  document.getElementById('tn').value = 0;
}

function saveValues() {
  if (chrome.storage && chrome.storage.local) {
    const tp = parseFloat(document.getElementById('tp').value) || 0;
    const fp = parseFloat(document.getElementById('fp').value) || 0;
    const fn = parseFloat(document.getElementById('fn').value) || 0;
    const tn = parseFloat(document.getElementById('tn').value) || 0;

    // Save values to storage
    chrome.storage.local.set({ 'tp': tp, 'fp': fp, 'fn': fn, 'tn': tn });
  }
}*/
document.addEventListener('DOMContentLoaded', function () {
  // Load stored values
  loadStoredValues();

  // Add event listeners
  document.getElementById('calculateButton').addEventListener('click', function () {
    calculateMetrics();
    saveValues();
  });

  document.getElementById('resetButton').addEventListener('click', function () {
    resetValues();
    calculateMetrics();
    saveValues();
  });
});

function loadStoredValues() {
  chrome.storage.local.get(['tp', 'fp', 'fn', 'tn'], function (result) {
    document.getElementById('tp').value = result.tp || 0;
    document.getElementById('fp').value = result.fp || 0;
    document.getElementById('fn').value = result.fn || 0;
    document.getElementById('tn').value = result.tn || 0;

    // Calculate metrics
    calculateMetrics();
  });
}

function calculateMetrics() {
  const tp = parseFloat(document.getElementById('tp').value) || 0;
  const fp = parseFloat(document.getElementById('fp').value) || 0;
  const fn = parseFloat(document.getElementById('fn').value) || 0;
  const tn = parseFloat(document.getElementById('tn').value) || 0;

  const specificity = tn === 0 ? 0 : tn / (tn + fp);
  const sensitivity = tp === 0 ? 0 : tp / (tp + fn);
  const precision = tp === 0 ? 0 : tp / (tp + fp);
  const accuracy = (tp + tn) === 0 ? 0 : (tp + tn) / (tp + fp + fn + tn);
  const f1Score = (2 * tp) === 0 ? 0 : (2 * tp) / (2 * tp + fp + fn);
  const negativeRate = tn === 0 ? 0 : tn / (tn + fn);

  // Display results
  document.getElementById('specificity').innerText = "Specificity: " + specificity.toFixed(4);
  document.getElementById('sensitivity').innerText = "Sensitivity: " + sensitivity.toFixed(4);
  document.getElementById('precision').innerText = "Precision: " + precision.toFixed(4);
  document.getElementById('accuracy').innerText = "Accuracy: " + accuracy.toFixed(4);
  document.getElementById('f1Score').innerText = "F1 Score: " + f1Score.toFixed(4);
  document.getElementById('negativeRate').innerText = "Negative Rate: " + negativeRate.toFixed(4);

  // Send updated values to the background script
  chrome.runtime.sendMessage({
    updateStorage: true,
    tp: tp,
    fp: fp,
    fn: fn,
    tn: tn
  });
}

function resetValues() {
  document.getElementById('tp').value = 0;
  document.getElementById('fp').value = 0;
  document.getElementById('fn').value = 0;
  document.getElementById('tn').value = 0;
}

function saveValues() {
  const tp = parseFloat(document.getElementById('tp').value) || 0;
  const fp = parseFloat(document.getElementById('fp').value) || 0;
  const fn = parseFloat(document.getElementById('fn').value) || 0;
  const tn = parseFloat(document.getElementById('tn').value) || 0;

  // Send updated values to the background script
  chrome.runtime.sendMessage({
    updateStorage: true,
    tp: tp,
    fp: fp,
    fn: fn,
    tn: tn
  });
}




