import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
import Header from './components/header/header.component.jsx';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions.js';


class App extends Component {


// we need to close the open communication system to prevent memory leaks
unsubscribeFromAuth = null;

// open communication system
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot =>{
              setCurrentUser ({
                  id:snapShot.id,
                  ...snapShot.data()
              });
              // == handleClick = () =>{
              //   const { changeUserName } = this.props;
              //   changeUserName({
              //     username:"HaHa",
              //   })
              // }
              console.log(this.state);
      });
    }else {
      setCurrentUser(userAuth);
    }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return(
      <div className="App">
        <Header />
        <Switch> 
          <Route  exact path="/" component={HomePage}/>
          <Route  path="/shop" component={ShopPage}/>
          <Route  exact path="/signin" render={()=>this.props.currentUser ? (<Redirect to='./' />) : (<SignInAndSignUpPage />)} />
        </Switch>
        {/* Renders the first child <Route> or <Redirect> that matches the location. */}
      </div>
    );
  }
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
