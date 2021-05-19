import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import WishPage from './pages/WishPage/WishPage';
import TaskPage from './pages/TaskPage/TaskPage';
import './App.css';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

class App extends React.Component {
  render() { 
    return (
      <div className="App">
          <Route path="/" exact component={MainPage} />
          <Route path="/user" exact component={UserProfilePage} />
          <Route path="/wishlist" exact component={WishPage} />
          <Route path="/tasklist" exact component={TaskPage} /> 
      </div>
    );
  }
}

export default App;
