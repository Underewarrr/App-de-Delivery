import { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import authContext from '../store/contexts/auth';
import { requestData, updateOrderStatus } from '../services/request';
import PrivateHeader from './component/PrivateHeader';
import ClientProductTable from './component/ClientProductTable';

const MAX_LENGTH_STRING = 4;

export default function CustomerOrderDetails() {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const [order, setOrder] = useState(
    {
      sale: { totalPrice: '0.00', seller: { name: 'seller' }, status: 'Pendente' },
      products: [] },
  );
  // const [isCloseOrderButtonDisabled, setIsCloseOrderButtonDisabled] = useState(false);

  const fetchOrderDetails = useCallback(async () => {
    const { data } = await requestData(`/orders/${id}`, user.token);
    const { sale } = data[0];
    const products = data.map(({ product, quantity }) => (
      {
        productId: product.id,
        name: product.name,
        unitPrice: product.price,
        quantity,
        subTotal: product.price * quantity,
      }
    ));
    setOrder({ sale, products });
  }, [id, user.token]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const closeOrder = async () => {
    try {
      await updateOrderStatus('Entregue', id, user.token);
      await fetchOrderDetails();
    } catch (error) {
      console.error(error.message);
    }
  };

  const isCloseOrderButtonDisabled = order.sale.status !== 'Em Trânsito';

  const statusBadge = () => {
    let classes = 'p-2 rounded d-flex justify-content-center align-items-center ';
    switch (order.sale.status) {
    case 'Pendente':
      classes += 'bg-warning';
      break;
    case 'Preparando':
      classes += 'bg-success';
      break;
    case 'Em Trânsito':
      classes += 'bg-secondary';
      break;
    case 'Entregue':
      classes += 'bg-primary';
      break;
    default:
      classes += '';
    }

    return (
      <p
        className={ classes }
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        {order.sale.status}
      </p>
    );
  };

  const saleInfo = () => (
    <div className="d-flex justify-content-between w-100 align-items-start">
      <div
        className="d-flex align-items-center"
        style={ { gap: '1rem' } }
      >
        <p>
          Pedido
          {' '}
          <span
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            {String(order.sale.id).padStart(MAX_LENGTH_STRING, '0')}
          </span>
        </p>
        <p>
          P. Vendedora:
          {' '}
          <span
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            {order.sale.seller.name}
          </span>
        </p>
        <p
          className="py-2 px-5 rounded bg-light text-center"
          style={ { fontSize: '16px', fontWeight: 'bold' } }
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {new Date(order.sale.saleDate).toLocaleDateString('pt-BR')}
        </p>
        { statusBadge() }
      </div>
      <div
        className="d-flex align-items-center"
        style={ { gap: '1rem' } }
      >
        <Button
          className="bg-warning text-dark"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ isCloseOrderButtonDisabled }
          onClick={ closeOrder }
        >
          Marcar como entregue
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <PrivateHeader />
      <Container className="d-flex flex-wrap h-100 p-5">
        <h1 className="mb-2">Detalhe do Pedido</h1>
        <Container className="d-flex flex-column align-items-end border pt-4 pb-2">
          { saleInfo() }
          <ClientProductTable
            testSufix="customer_order_details"
            data={ order?.products }
          />
          <h2
            className="bg-success text-light rounded p-2"
          >
            Total: R$
            {' '}
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              { Number(order?.sale.totalPrice).toLocaleString('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
              })}
            </span>
          </h2>
        </Container>
      </Container>
    </>
  );
}
