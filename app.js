const input = document.querySelector('input[type=number]');
const checkbox = document.querySelector('input[type=checkbox]');

let value;

document.addEventListener('keypress', (e) => {
    console.log(e.target.value)
    if (e.target.value.length == 2) {
        e.preventDefault();
        return;
    }
})

document.addEventListener('input', () => {
    value = input.value;
})

paypal.Buttons({
    createOrder: function(data, actions) {
        value = (value) ? value : 5;
        return actions.order.create({
            purchase_units: [{
                amount: {
                value: `${value}`
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        (checkbox.checked) ? error() : success(actions);
    },
    onCancel: function (data) {
        alert('You cancled the transaction')
    },
    onError: (err) => {
        console.error('Something went wrong', err);
        alert(err);
    }
}).render('#paypal-button-container');

function success(actions) {
    return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
    });
}

function error() {
    throw new Error('You forced this error');
}