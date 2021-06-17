import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component.jsx';
import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

class App extends React.Component  {

  unsubscribedFromAuth = null;

  //Runs everytime the page is refreshed.
  componentDidMount(){
    const {setCurrentUser} = this.props;

    //User auth is created and retrieved from firebase.
    //Entire app might need the user so every time a child theme renders, this is always mounted
    this.unsubscribedFromAuth = auth.onAuthStateChanged( async userAuth => {
      
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        //Set the current user with the data retrieved from firebase.
        //Whenever the document changes, the snapshot is passed to the listener.
        //The redux method setCurrentUser is passed when the onSnapshot listener is triggered.
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
        });
      } else {
        setCurrentUser( userAuth );
      }

      //Returns an array of just title and items so that the ids are excluded
      //addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({ title, items })));

    });
  }

  componentWillUnmount(){
    this.unsubscribedFromAuth();
  }
  
  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (< SignInAndSignUpPage />) } />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
        <span>Built by Daniel Falzon</span>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

//Dispatch allows redux to know that the object passed will be an action
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

//Null since App component does not use the state, it is only setting it
export default connect(mapStateToProps, mapDispatchToProps)(App);
