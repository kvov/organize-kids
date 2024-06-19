import React, { Component } from 'react';
import leftArrow from '../../images/left-arrow.png';
import Wallet from '../../components/Wallet/Wallet';
import './WishPage.css';
import { connect } from 'react-redux';
import { addWishToList, removeWishFromList, takeMoneyForWish } from "../../redux/actions";
import removeBtn from "../../images/remove24px.png";
import checkBtn from "../../images/tick24px.png";
import { Link } from "react-router-dom";
import Lottie from 'lottie-react-web'
import animation from '../../fireworks.json'


class WishPage extends Component {
    state = {
        wishTitle: '',
        wishPrice: '',
        modalIsOpen: false,
        congratsModalIsOpen: false
    }
    
        showCongratsModal = () => {
        this.setState({ congratsModalIsOpen: true });
        setTimeout(()=> {
            this.setState(()=> ({ congratsModalIsOpen: false }))
          }, 5000);
    }
    
    showModal = () => {
        this.setState({ modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, wishTitle: '', wishPrice: '' });
    }

    setWishDescription = (e) => {
        this.setState({ wishTitle: e.target.value });
    }

    setWishPrice = (e) => {
        this.setState({ wishPrice: e.target.value ? parseInt(e.target.value) : ''});
    }

    saveWishToList = () => {
        this.props.addWishToList(this.state.wishTitle, this.state.wishPrice);
        this.closeModal();
    }
    executeWish = (wish) => {
        this.showCongratsModal();
        this.props.removeWishFromList(wish.wishItemId);
        this.props.takeMoneyForWish(wish.wishPrice)
    }
    render() { 
        const { wishTitle, wishPrice, modalIsOpen, congratsModalIsOpen } = this.state;
      
        return (
            <div className="wish-page">

                <header className="wish-page__header">
                    <Link to="/user"><div className="wish-page__header__back-arrow"><img src={leftArrow} alt=""/></div></Link>
                    <p className="wish-page__header__user-name">{this.props.userName}</p>
                </header>

                <h1 className="wish-page__title">WISHES</h1>
                {modalIsOpen ? 
                (<form className="wish-modal">
                    <label className="wish-title__modal-label">WRITE YOUR WISH:
                        <input value={wishTitle} type="text" className="wish-title__modal-input" onChange={this.setWishDescription}/>
                    </label>
                    <label className="wish-price__modal-label">WISH PRICE:
                        <input value={wishPrice} type="number" className="wish-price__modal-input" onChange={this.setWishPrice}/>
                    </label>
                    <div className="wish-modal__button-div">
                        <button className="wish-modal__save-wish-button" onClick={this.saveWishToList}>SAVE</button>
                        <button className="wish-modal__cancel-wish-button" onClick={this.closeModal}>CANCEL</button>
                    </div>
                </form>) : null
                }

                {congratsModalIsOpen ? 
                (<div className="congrats-modal">
                    <Lottie
                        options={{
                        animationData: animation
                        }}
                    />
                    <p className="congrats-modal__text">YOUR WISH'S <br />COME TRUE!!!</p>
                     

                </div>) : null
                }

                <Wallet />

                <div className="wish-page__add-wish-button-div">
                    <button className="wish-page__add-wish-button" onClick={this.showModal}>ADD WISH</button>
                </div>

                <div className="wish-page__wish-list-div">
                    <ul className="wish-page__wish-list">
                        {this.props.wishList.map(item => (
                            <li key={item.wishItemId} className="wish-page__wish-list-item">
                                <div className="wish-item-div">
                                    <p className="wish-item">{item.wishTitle} {item.wishPrice} </p>
                                    {(item.wishPrice <= this.props.wallet) ? 
                                    (<button className="wish-item__buy-wish" onClick={() => this.executeWish(item)}>
                                        <img src={checkBtn} alt="" className="check-btn__image" style={{height: 24}}/>
                                    </button>) : null}
                                    <button className="wish-item__remove-from-list" onClick={() => this.props.removeWishFromList(item.wishItemId)}>
                                        <img src={removeBtn} alt="" className="remove-btn__image" style={{height: 24}}/>
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
      wishList: state.wishList,
      userName: state.userName
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      removeWishFromList: (wishItemId) => {
        dispatch(removeWishFromList(wishItemId))
      },
      addWishToList: (wishTitle, wishPrice) => {
        dispatch(addWishToList(wishTitle, wishPrice))
        }, 
       takeMoneyForWish: (wishPrice) => {
           dispatch(takeMoneyForWish(wishPrice))
       }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(WishPage);