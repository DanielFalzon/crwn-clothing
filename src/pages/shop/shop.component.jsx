import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

class  ShopPage extends React.Component {

    // constructor(){
    //     //Never move api calls in constructor. This is because this code triggers different rener states
    // }

    // UNSAFE_componentWillMount(){
    //     //Fires before render. But this is fired multipletimes and so it's not a good idea to use it either.
    // }

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render(){
        const {match} = this.props;

        return( 
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch( fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);