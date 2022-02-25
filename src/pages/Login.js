import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      btndisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
    this.verifyPass = this.verifyPass.bind(this);
    this.clickBtn = this.clickBtn.bind(this);
    this.verifyBtnEnable = this.verifyBtnEnable.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyBtnEnable);
  }

  verifyEmail() {
    const { email } = this.state;
    return email.includes('@') && email.endsWith('.com');
  }

  verifyPass() {
    const { pass } = this.state;
    const maxPassLength = 6;
    return pass.length >= maxPassLength;
  }

  verifyBtnEnable() {
    const email = this.verifyEmail();
    const pass = this.verifyPass();
    if (email === true && pass === true) {
      this.setState({ btndisabled: false });
    } else {
      this.setState({ btndisabled: true });
    }
  }

  clickBtn() {
    const { email } = this.state;
    const { history, sendToStore } = this.props;
    history.push('/carteira');
    sendToStore(email);
  }

  render() {
    const { email, pass, btndisabled } = this.state;
    return (
      <div className='loginImgContainer'>
        <div className='loginContainer'>
          <p>My Wallet</p>
          <label htmlFor="email">
            <input
              placeholder='Email'
              type="text"
              id="email"
              onChange={ this.handleChange }
              name="email"
              value={ email }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="pass">
            <input
              placeholder='Password'
              type="password"
              id="pass"
              name="pass"
              onChange={ this.handleChange }
              value={ pass }
              data-testid="password-input"
            />
          </label>
          <button
            className='button-59 '
            onClick={ this.clickBtn }
            disabled={ btndisabled }
            type="button"
            >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  sendToStore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendToStore: (state) => dispatch(userLogin(state)) });

export default connect(null, mapDispatchToProps)(Login);
