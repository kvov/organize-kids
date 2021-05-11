import React, { Component } from 'react';
import './MainPage.css';
import UserData from '../../components/UserData/UserData';
import AppTitle from '../../components/AppTitle/AppTitle';

class MainPage extends Component {
    render() { 
        return (
            <div className="main-page">
              
                    <UserData />
               
                    <AppTitle />
                
            </div>
        );
    }
}
 
export default MainPage;