import React from 'react';
import Cell from '../Components/Cell';
import Form from '../Components/Form';
import Header from '../Components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
        <Cell />
      </div>
    );
  }
}
export default Wallet;
