import React, { Component } from 'react';
import './MainPage.css';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { saveData, onFileLoaded } from "../../redux/actions"; 
import { Link } from "react-router-dom";


class MainPage extends Component {
    state = {
        photo: '',
        userName: '',
        isLoaded: false
    }
  
    fileUploadHandler = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.addEventListener('load', () => {
            this.setState({photo: reader.result}
            );
        });
        reader.readAsDataURL(file);
        this.setState({ isLoaded: true})
    };
    saveUserName = (e) => {
        this.setState({ userName: e.target.value});
    }
    submitAuthForm = (e) => {
        this.props.saveData(this.state.photo, this.state.userName);
    }
    
    render() { 
        const { userName, isLoaded } = this.state;
        return (
            <div className="main-page">
                <div className="user-data">
                    <div className="user-data__form" >
                        <div className="user-data__photo-upload">
                            <input 
                            style={{display: 'none'}} 
                            type="file"
                            accept='.jpg, .png, .jpeg' 
                            className="user-data__photo" 
                            onChange={this.fileUploadHandler} 
                            ref={fileInput => this.fileInput = fileInput}/>
                            {!isLoaded ? 
                            (<button className="user-data__photo" onClick={() => this.fileInput.click()}>Выбери фото</button>) :
                            (<img className="user-data__photo" src={this.state.photo} alt="name"/>)
                            }
                        </div>
                        <input value={userName} type="text" className="user-data__user-name" onChange={this.saveUserName} placeholder="Введи имя"/>
                        <Link to="/user"><button className="user-data__save-button" onClick={this.submitAuthForm}> Сохранить</button></Link>
                    </div>
                </div>

                <div className="app-title">
                    <h1 className="app-title__text">
                        Organize <br /> Kids
                    </h1>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        photo: state.photo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveData: (photo, userName) => {
        dispatch(saveData(photo, userName));
        },
        onFileLoaded: (photo) => {
            dispatch(onFileLoaded(photo));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);