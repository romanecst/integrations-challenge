let authResponse = null;

window.primer.setup().then(onLoad);

function renderPayPalButton() {
  const button = document.getElementById('paypal-button');

  /**
   * The PayPal SDK has been loaded with the client ID which you configured in PayPal.ts.
   *
   * Pass the correct options to the paypal SDK in order to create an order for EUR 12.99
   * When the order is approved, you should call `onAuthorizeTransaction(...)` with the orderID
   * that you receive from PayPal
   */
  const options = {
    //create an order on click on the paypal button for an amount of 12.99€
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: '12.99'
          }
        }]
      })
    },
    //call onAuthoriseTransaction function with the orderID of the created order
    onApprove: function(data, actions) {
      return onAuthorizeTransaction(data.orderID)
    },
  };

  window.paypal.Buttons(options).render(button);
}

async function onLoad() {
  renderPayPalButton();

  document
    .getElementById('cancel-button')
    .addEventListener('click', onCancelTransaction);
}

function onAuthorizeTransaction(orderId) {
  fetch('/api/authorize', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  })
    .then((r) => r.json())
    .then((response) => {
      authResponse = response;
      document.getElementById('cancel-button').removeAttribute('disabled');
    });
}

function onCancelTransaction() {
  fetch('/api/cancel', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId: authResponse.processorTransactionId }),
  })
  .then((r) => r.json())
  .then((response) => {
      authResponse = response;
      //disables the cancel button once authorisation is voided and displays 'Payment authorisation has been cancelled.'
      document.getElementById('cancel-button').setAttribute('disabled', 'true');
      let text = document.createTextNode('Payment authorisation has been cancelled.');
      document.getElementById('root').appendChild(text);
  });;
}
