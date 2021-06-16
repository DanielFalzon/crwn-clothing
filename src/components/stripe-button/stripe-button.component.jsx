import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J34YOAZ1WBe7cFW0aBZWlxiqEiGLDwn8MBGb8grKNr0OoIHYhMGzXwQmx8YO2H25Oyu1H9ashFbaL1F3of8vDxf00VHisHis0';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }

    return(
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={ onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;