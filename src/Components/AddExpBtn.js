import PropTypes from 'prop-types';
import React, { Component } from 'react';

class AddExpBtn extends Component {
  render() {
    const { funcProp } = this.props;
    return (
      <button
      className='button-59'
        type="button"
        onClick={ () => funcProp() }
      >
        add expense
      </button>
    );
  }
}
AddExpBtn.propTypes = {
  funcProp: PropTypes.func,
}.isRequired;
export default AddExpBtn;
