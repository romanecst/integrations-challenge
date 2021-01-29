let authResponse = null;

window.addEventListener('load', onLoad);

function onLoad() {
  renderPayPalButton();

  document
    .getElementById('cancel-button')
    .addEventListener('click', onCancelTransaction);

  document
    .getElementById('capture-button')
    .addEventListener('click', onCaptureTransaction);
}

function renderPayPalButton() {
  const button = document.getElementById('paypal-button');

  /**
   * Pass the correct options to the paypal SDK in order to create an order for EUR 12.99
   * When the order is approved, you should call `authorizePayment(...)` with the orderID
   * that you receive from PayPal
   */
  const options = {
    /** */
  };

  window.paypal.Buttons(options).render(button);
}

function onCancelTransaction() {
  fetch('/api/cancel', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: authResponse.processorTransactionId }),
  });
}

function onCaptureTransaction() {
  fetch('/api/capture', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: authResponse.processorTransactionId }),
  });
}

function authorizePayment(orderId) {
  fetch('/api/authorize', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  })
    .then((r) => r.json())
    .then((response) => {
      authResponse = response;
    });
}
