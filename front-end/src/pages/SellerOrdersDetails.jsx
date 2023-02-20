import { useContext, useEffect, useState, useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import authContext from '../store/contexts/auth';
import { requestData, updateOrderStatus } from '../services/request';
import PrivateHeader from './component/PrivateHeader';
import SellerOrderProductsTable from './component/SellerOrderProductsTable';

const MAX_LENGTH_STRING = 4;

export default function SellerOrdersDetails() {
  const { user: seller } = useContext(authContext);
  const { id } = useParams();
  const [order, setOrder] = useState(
    { sale: { totalPrice: '0.00', status: 'Pendente' }, products: [] },
  );
  // const [isPreparingButtonDisabled, setIsPreparingButtonDisabled] = useState(false);
  // const [isDispatchButtonDisabled, setIsDispatchButtonDisabled] = useState(true);

  const fetchOrderDetails = useCallback(async () => {
    const { data } = await requestData(`/orders/${id}`, seller.token);
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
  }, [id, seller.token]);

  useEffect(() => {
    fetchOrderDetails();
  }, [fetchOrderDetails]);

  const prepareOrder = async () => {
    try {
      await updateOrderStatus('Preparando', id, seller.token);
      // setIsPreparingButtonDisabled(true);
      // setIsDispatchButtonDisabled(false);
      await fetchOrderDetails();
    } catch (error) {
      console.error(error.message);
    }
  };

  const sendOrder = async () => {
    try {
      await updateOrderStatus('Em Trânsito', id, seller.token);
      await fetchOrderDetails();
    } catch (error) {
      console.error(error.message);
    }
  };

  const isPreparingButtonDisabled = order.sale.status !== 'Pendente';
  const isDispatchButtonDisabled = order.sale.status !== 'Preparando';

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
        data-testid="seller_order_details__element-order-details-label-delivery-status"
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
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {String(order.sale.id).padStart(MAX_LENGTH_STRING, '0')}
          </span>
        </p>
        <p
          className="py-2 px-5 rounded bg-light text-center"
          style={ { fontSize: '16px', fontWeight: 'bold' } }
          data-testid="seller_order_details__element-order-details-label-order-date"
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
          data-testid="seller_order_details__button-preparing-check"
          disabled={ isPreparingButtonDisabled }
          onClick={ prepareOrder }
        >
          Preparar Pedido
        </Button>
        <Button
          className="bg-success text-light"
          data-testid="seller_order_details__button-dispatch-check"
          disabled={ isDispatchButtonDisabled }
          onClick={ sendOrder }
        >
          Saiu Para Entrega
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
          <SellerOrderProductsTable
            data={ order?.products }
          />
          <h2
            className="bg-success text-light rounded p-2"
          >
            Total: R$
            {' '}
            <span
              data-testid="seller_order_details__element-order-total-price"
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
