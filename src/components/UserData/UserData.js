import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { saveData, onFileLoaded } from "../../redux/actions"; 
import './UserData.css';
// import axios from 'axios';

class UserData extends Component {
    state = {
        photo: '',
        userName: ''
    }
    // photoHandler = (e) => {
    //     console.log(e);
    //     this.setState({ photo: e.target.files[0]});
    // }
    fileUploadHandler = (event) => {
        event.preventDefault();
        const reader = new FileReader();
        const file = event.target.files[0];
    
        if (file) {
            reader.onloadend = () =>
            console.log(reader.result);
            this.setState({photo: reader.result}, console.log(this.state.photo));
            this.props.onFileLoaded(reader.result);
            reader.readAsDataURL(file);
        } else {
            alert('File uploaded is not valid.');
        }
    };
    saveUserName = (e) => {
        this.setState({ userName: e.target.value});
    }
    submitAuthForm = (e) => {
        e.preventDefault();
        this.props.saveData(this.state.photo, this.state.userName);
    }
    
    render() { 
        const { photo, userName } = this.state;
        return (
            <div className="user-data">
                <form className="user-data__form" onSubmit={this.submitAuthForm}>
                    <div className="user-data__photo-upload"> 
                        <input 
                        style={{display: 'none'}} 
                        value={photo} 
                        type="file"
                        accept='.jpg, .png, .jpeg' 
                        className="user-data__photo" 
                        onChange={this.fileUploadHandler} 
                        ref={fileInput => this.fileInput = fileInput}/>
                        <button className="user-data__photo" onClick={() => this.fileInput.click()}>Выбери фото</button>
                        <img className="u" src={this.state.photo} alt="name"/>
                    </div>
                    <br />
                    <br />
                    <input value={userName} type="text" className="user-data__user-name" onChange={this.saveUserName} placeholder="Ввести имя"/>
                    <br />
                    <br />
                    <button type="submit" className="user-data__save-button">Сохранить</button>
                </form>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserData);