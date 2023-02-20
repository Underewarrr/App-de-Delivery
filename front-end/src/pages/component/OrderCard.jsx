import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MAX_LENGTH_STRING = 4;

export default function OrderCard({ order, baseLink, testSufix }) {
  const fullAddress = `${order.deliveryAddress}, ${order.deliveryNumber}`;

  const statusBadge = () => {
    let classes = 'p-4 rounded d-flex justify-content-center align-items-center ';
    switch (order.status) {
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
      <h2
        className={ classes }
        data-testid={ `${testSufix}__element-delivery-status-${order.id}` }
      >
        {order.status}
      </h2>
    );
  };

  const saleDate = () => (
    <p
      className="py-2 px-5 rounded bg-light text-center"
      style={ { fontSize: '20px', fontWeight: 'bold' } }
      data-testid={ `${testSufix}__element-order-date-${order.id}` }
    >
      {new Date(order.saleDate).toLocaleDateString('pt-BR')}
    </p>
  );

  const totalPrice = () => (
    <p
      className="py-2 px-5 rounded bg-light text-center m-0"
      style={ { fontSize: '20px', fontWeight: 'bold' } }
    >
      R$
      {' '}
      <span
        data-testid={ `${testSufix}__element-card-price-${order.id}` }
      >
        {order.totalPrice.replace('.', ',')}
      </span>
    </p>
  );

  return (
    <Link
      to={ `/${baseLink}/orders/${order.id}` }
      className="d-flex flex-row align-items-center border justify-content-end text-dark"
      style={
        { backgroundColor: '#dddddd', width: 'fit-content', textDecoration: 'none' }
      }
    >
      <div
        className="
        d-flex flex-column align-items-center justify-content-center p-4 h-auto"
        style={ { backgroundColor: '#ffffff', alignSelf: 'stretch' } }
      >
        Pedido
        {' '}
        <span
          data-testid={ `${testSufix}__element-order-id-${order.id}` }
        >
          {String(order.id).padStart(MAX_LENGTH_STRING, '0')}
        </span>
      </div>
      <div
        className="p-2"
        style={ { flex: 1 } }
      >
        <div className="d-flex">
          { statusBadge() }
          <div className="pb-2 px-2">
            { saleDate() }
            { totalPrice() }
          </div>
        </div>
        <p
          className="m-0 text-end"
          data-testid={ `${testSufix}__element-card-address-${order.id}` }
        >
          {fullAddress}
        </p>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  testSufix: PropTypes.string.isRequired,
  baseLink: PropTypes.string.isRequired,
  order: PropTypes.shape({
    id: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};
