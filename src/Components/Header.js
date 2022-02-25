import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalSum = expenses[0] ? expenses
      .map((item) => (Number(item.value) * Number(item.exchangeRates[item.currency].ask)))
      .reduce((acc, n) => acc + n) : 0;
      const hour = () => {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return today = mm + '/' + dd + '/' + yyyy;
      }
    return (
      <header className='headerHeader'>
        <div className='headerTxt'>
          <p>{hour()}</p>
          <p>My Wallet</p>
          <p data-testid="email-field">{email}</p>
        </div>
        <section className='headerSection'>
          <p data-testid="total-field">{totalSum}</p>
          <span data-testid="header-currency-field">BRL</span>
        </section>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.string,
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
