import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
// import WishPage from './pages/WishPage/WishPage';
// import TaskPage from './pages/TaskPage/TaskPage';
import './App.css';

class App extends React.Component {
  render() { 
    return (
      <div className="App">
          <Route path="/" exact component={MainPage} />
          {/* <Route path="/wish" exact component={WishPage} />
          <Route path="/task" exact component={TaskPage} /> */}
      </div>
    );
  }
}

export default App;
