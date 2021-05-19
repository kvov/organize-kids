import React, { Component } from 'react';
import './UserProfilePage.css';
import leftArrow from '../../images/left-arrow.png';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import profile from "../../images/user.png";


class UserProfilePage extends Component {

    render() { 
        const { userName, photo, wallet } = this.props;
        return (
            <div className="user-profile-page">
                <div className="user-profile">
                    <Link to="/" className="user-profile__back-arrow"><img src={leftArrow} alt=""/></Link>
                    <p className="user-profile__name">{userName}</p>
                    <p className="user-profile__photo-wrapper">
                        {photo ? 
                        (<img className="user-profile__photo" src={photo} alt=""/>) : 
                        (<img src={profile} alt="" className="execute-task-btn__image" style={{height: 100, width: 100}}/>)} 
                    </p>
                    <br />
                    <p className="user-profile__wallet-sum">{wallet}</p>
                    <br />
                    <p className="user-profile__wallet-text">монет</p>
                </div>

                <div className="user-profile-page__buttons">
                    <button className="user-profile-page__wish-button" type="submit"><Link to="/wishlist">ЖЕЛАНИЯ</Link></button>
                    <button className="user-profile-page__task-button" type="submit"><Link to="/tasklist">ЗАДАНИЯ</Link></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        photo: state.photo,
        wallet: state.wallet
    }
};

export default connect(mapStateToProps, null)(UserProfilePage);