paypal.Buttons({
    createOrder: (data,actions) => {
       return actions.order.create({
        purchase_units: [{
            amount: {
                value:'100.00'
            }

        }]
       })

    },
    onApprove: (data, actions) => {

    }
}).render('#paypal-button');