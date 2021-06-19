import React from 'react';

import { SpinnerOverlay, SpinnerContainer } from './with-spinner.styles';

//Higher Order component (HOC).
//Takes the initial component which gets wrapped into a new component.
//Based on the isLoading property, render the spinner, otherwise just return the component.
const WithSpinner = WrappedComponent =>  {
    const Spinner = ({ isLoading, ...otherProps}) =>{

    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
        ) : (
            <WrappedComponent {...otherProps} />
        );
    };

    return Spinner
}

export default WithSpinner;