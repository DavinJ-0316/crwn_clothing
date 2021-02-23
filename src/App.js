import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import { Switch, Route } from 'react-router-dom';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


class App extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }

// we need to close the open communication system to prevent memory leaks
unsubscribeFromAuth = null;

// open communication system
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot =>{
              this.setState({
                currentUser: {
                  id:snapShot.id,
                  ...snapShot.data()
                }
              });
              console.log(this.state);
      });
    }else {
      this.setState({currentUser: userAuth});
    }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return(
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch> 
          <Route  exact path="/" component={HomePage}/>
          <Route  path="/shop" component={ShopPage}/>
          <Route  path="/signin" component={SignInAndSignUpPage}/>
        </Switch>
        {/* Renders the first child <Route> or <Redirect> that matches the location. */}
      </div>
    );
  }
}

export default App;
