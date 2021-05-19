import React, { Component } from 'react';
import './Wallet.css';
import purse from '../../images/piggy.png';
import { connect } from 'react-redux';

class Wallet extends Component {
    render() { 
        return (
            <div className="wallet">
                <img src={purse} alt="" className="wallet__image" style={{height: 210, width: 230}}/>
                <p className="wallet__text">НАКОПЛЕНО <br /><span className="wallet__sum">{this.props.wallet}</span><br /> МОНЕТ</p>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      wallet: state.wallet,
    }
  }
  
  export default connect(mapStateToProps, null)(Wallet);