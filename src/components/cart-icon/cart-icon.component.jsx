import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selector';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='cart-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch( toggleCartHidden() )
})

//Selector: Code that gets state and pulls a small portion of the state. Gets re-run every time when the state changes
//Memoization: Cache the selected value so that the reduce isn't always run when the state is refreshed. If the value
//is the same and the output is not different, then it won't be passed into the component, it will pass the old value.
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon)