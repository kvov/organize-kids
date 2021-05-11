import React, { Component } from 'react';
import './AppTitle.css';

class AppTitle extends Component {
    render() { 
        return (
            <div className="app-title">
                <h1 className="app-title__text">
                    Organize <br /> Kids
                </h1>
            </div>
        );
    }
}
 
export default AppTitle;