import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from '../../redux/shop/shop.selectors';

import './collection.styles.scss';


const CollectionPage = ({ collection }) => {
    const { title, items } = collection
    return (
        <div className='collection-page'>
            <h2 className='title'>{ title }</h2>
            <div className='items'>
                {
                    items.map( item => <CollectionItem key={item.id} item={item} /> )
                }
            </div>
        </div>
    )
};

//Ownprops are the props of the component
//State is passed to the selectCollection as its being used in the selector.
const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection( ownProps.match.params.collectionId )( state )
})

export default connect( mapStateToProps )( CollectionPage );