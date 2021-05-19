import React, { Component } from 'react';
import leftArrow from '../../images/left-arrow.png';
import Wallet from '../../components/Wallet/Wallet';
import './TaskPage.css';
import { connect } from 'react-redux';
import { addTaskToList, removeTaskFromList, addMoneyToWallet, takeMoneyFromWallet } from "../../redux/actions";
import removeBtn from "../../images/remove24px.png";
import happy from "../../images/star-thumbup.png";
import crying from "../../images/crying.png";
import execute from "../../images/angel.png";
import lose from "../../images/devil.png";
import { Link } from "react-router-dom";


class TaskPage extends Component {
    state = {
        taskTitle: '',
        taskPrice: '',
        taskModalIsOpen: false,
        earnedModalIsOpen: false,
        lostModalIsOpen: false,
        earnedTask: undefined,
        lostTask: undefined
    }
    
    showEarnedModal = (task) => {
        this.setState({ earnedModalIsOpen: true, earnedTask: task});
        setTimeout(()=> {
            this.setState(()=> ({ earnedModalIsOpen: false, earnedTask: undefined }))
          }, 3000);
    }

    showLostModal = (task) => {
        this.setState({ lostModalIsOpen: true, lostTask: task });
        setTimeout(()=> {
            this.setState(()=> ({ lostModalIsOpen: false, lostTask: undefined }))
          }, 3000);
    }
    
    showTaskModal = () => {
        this.setState({ taskModalIsOpen: true});
    }

    closeTaskModal = () => {
        this.setState({ taskModalIsOpen: false, taskTitle: '', taskPrice: '' });
    }

    
    setTaskTitle = (e) => {
        this.setState({ taskTitle: e.target.value });
    }

    setTaskPrice = (e) => {
        this.setState({ taskPrice: e.target.value ? parseInt(e.target.value) : ''});
    }

    saveTaskToList = () => {
        this.props.addTaskToList(this.state.taskTitle, this.state.taskPrice);
        this.closeTaskModal();
    }
    executeTask = (task) => {
        this.showEarnedModal(task);
        this.props.removeTaskFromList(task.taskItemId);
        this.props.addMoneyToWallet(task.taskPrice)
    }

    loseTask = (task) => {
        this.showLostModal(task);
        this.props.removeTaskFromList(task.taskItemId);
        this.props.takeMoneyFromWallet(task.taskPrice)
    }
    render() { 
        const { taskTitle, taskPrice, taskModalIsOpen, earnedModalIsOpen, lostModalIsOpen } = this.state;
      
        return (
            <div className="task-page">

                <header className="task-page__header">
                    <Link to="/user"><div className="task-page__header__back-arrow"><img src={leftArrow} alt=""/></div></Link>
                    <p className="task-page__header__user-name">{this.props.userName}</p>
                </header>

                <h1 className="task-page__title">ЗАДАНИЯ</h1>
                {taskModalIsOpen ? 
                (<form className="task-modal">
                    <label className="task-title__modal-label">ОПИСАНИЕ ЗАДАНИЯ:
                        <input value={taskTitle} type="text" className="task-title__modal-input" onChange={this.setTaskTitle}/>
                    </label>
                    <label className="task-price__modal-label">ЦЕНА ЗАДАНИЯ:
                        <input value={taskPrice} type="number" className="task-price__modal-input" onChange={this.setTaskPrice}/>
                    </label>
                    <div className="task-modal__button-div">
                        <button className="task-modal__save-task-button" onClick={this.saveTaskToList}>СОХРАНИТЬ</button>
                        <button className="task-modal__cancel-task-button" onClick={this.closeTaskModal}>ОТМЕНА</button>
                    </div>
                </form>) : null
                }

                {earnedModalIsOpen ? 
                (<div className="earned-modal">
                    <img src={happy} alt="" className="earned-modal__image" style={{width: '100%', height: 250, backgroundColor: 'white'}}/>
                    <p className="earned-modal__text">ЗАРАБОТАНО {this.state.earnedTask.taskPrice} МОНЕТ!!!</p>  
                </div>) : null
                }

                {lostModalIsOpen ? 
                    (<div className="lost-modal">
                    <img src={crying} alt="" className="lost-modal__image" style={{width: '100%'}}/>
                    <p className="lost-modal__text">ПОТЕРЯНО {this.state.lostTask.taskPrice} МОНЕТ!!!</p>  
                </div>) : null }
                
                <Wallet />

                <div className="task-page__add-task-button-div">
                    <button className="task-page__add-task-button" onClick={this.showTaskModal}>ДОБАВИТЬ ЗАДАНИЕ</button>
                </div>

                <div className="task-page__task-list-div">
                    <ul className="task-page__task-list">
                        {this.props.taskList.map(item => (
                            <li key={item.taskItemId} className="task-page__task-list-item">
                                <div className="task-item-div">
                                    <p className="task-item">{item.taskTitle} {item.taskPrice} </p>
                                     
                                    <button className="task-item__execute-task-btn" onClick={() => this.executeTask(item)}>
                                        <img src={execute} alt="" className="execute-task-btn__image" style={{height: 24}}/>
                                    </button>

                                    <button className="task-item__lose-task-btn" onClick={() => this.loseTask(item)}>
                                        <img src={lose} alt="" className="lose-task-btn__image" style={{height: 24}}/>
                                    </button>

                                    <button className="task-item__remove-from-list" onClick={() => this.props.removeTaskFromList(item.taskItemId)}>
                                        <img src={removeBtn} alt="" className="task-remove-btn__image" style={{height: 24}}/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      wallet: state.wallet,
      taskList: state.taskList,
      userName: state.userName
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      removeTaskFromList: (taskItemId) => {
        dispatch(removeTaskFromList(taskItemId))
      },
      addTaskToList: (taskTitle, taskPrice) => {
        dispatch(addTaskToList(taskTitle, taskPrice))
        }, 
       takeMoneyFromWallet: (wallet) => {
           dispatch(takeMoneyFromWallet(wallet))
       },
       addMoneyToWallet: (wallet) => {
        dispatch(addMoneyToWallet(wallet))
       }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);