import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './MainPageButtons.css';

class MainPageButtons extends Component {
    render() { 
        return (
            <div className="main-page__buttons">
                <button className="main-page__wish-button" type="submit"><Link to="/wishlist">Желания</Link></button>
                <button className="main-page__task-button" type="submit"><Link to="/tasklist">Задания</Link></button>
            </div>
        );
    }
}
 
export default MainPageButtons;