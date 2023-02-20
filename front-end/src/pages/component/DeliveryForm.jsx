import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import { requestData } from '../../services/request';

const INITIAL_SELLERS = [];

const INITIAL_INPUT = {
  sellerId: '',
  address: '',
  number: '',
};

export default function DeliveryForm({ sendSale }) {
  const [sellers, setSellers] = useState(INITIAL_SELLERS);
  const [input, setInput] = useState(INITIAL_INPUT);

  useEffect(() => {
    const getSellers = async () => {
      const data = await requestData('/sellers');
      setSellers(data);
    };

    getSellers();
  }, []);

  const isButtonEnabled = Object.values(input).every((value) => value);

  return (
    <Form className="d-flex flex-column w-100 align-items-center">
      <div className="d-flex w-100 justify-content-between mb-3">
        <Form.Group>
          <p className="mb-2">P. Vendedora Responsável:</p>
          <select
            id="seller"
            className="form-control"
            onChange={ (e) => setInput({ ...input, sellerId: e.target.value }) }
            data-testid="customer_checkout__select-seller"
          >
            <option value="">Selecione um vendedor</option>
            {sellers.map(({ id, name }) => (
              <option key={ id } value={ id }>{ name }</option>
            ))}
          </select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Endereço:</Form.Label>
          <Form.Control
            value={ input.address }
            onChange={ ({ target: { value } }) => setInput({ ...input, address: value }) }
            name="address"
            type="text"
            placeholder="Endereço para entrega"
            data-testid="customer_checkout__input-address"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Número:</Form.Label>
          <Form.Control
            value={ input.number }
            onChange={ ({ target: { value } }) => setInput({ ...input, number: value }) }
            name="number"
            type="text"
            placeholder="Endereço para entrega"
            data-testid="customer_checkout__input-address-number"
          />
        </Form.Group>
      </div>
      <Button
        data-testid="customer_checkout__button-submit-order"
        onClick={ () => sendSale(input) }
        className="bg-success"
        style={ { fontSize: '1.5rem' } }
        disabled={ !isButtonEnabled }
      >
        Finalizar Pedido
      </Button>
    </Form>
  );
}

DeliveryForm.propTypes = {
  sendSale: PropTypes.func.isRequired,
};
