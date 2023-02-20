import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import useStorage from '../hooks/useStorage';
import ClientProductTable from './component/ClientProductTable';
import DeliveryForm from './component/DeliveryForm';
import PrivateHeader from './component/PrivateHeader';
import { postSale } from '../services/request';
import authContext from '../store/contexts/auth';

const mockData = [
  {
    productId: 1,
    name: 'Produto x',
    quantity: 3,
    unitPrice: '3.14',
    subTotal: '9.42',
  },
  {
    productId: 2,
    name: 'Produto y',
    quantity: 1,
    unitPrice: '10.90',
    subTotal: '10.90',
  },
];

const timeOut = 2000;

function CustomerCheckout() {
  const navigate = useNavigate();
  const [products, setProducts] = useStorage('products', mockData);
  const { user } = useContext(authContext);

  const removeProduct = (id) => {
    const removedProducts = products.filter(({ productId }) => id !== productId);
    setProducts(removedProducts);
  };

  const cartTotal = products.reduce(
    (prev, { quantity, unitPrice }) => (
      prev + quantity * unitPrice),
    0,
  );

  const sendSale = async ({ sellerId, address, number }) => {
    const sale = {
      totalPrice: cartTotal,
      deliveryAddress: address,
      deliveryNumber: number,
      sellerId,
      products: products.map(({ productId, quantity }) => ({ productId, quantity })),
    };

    try {
      const { data: { id } } = await postSale(sale, user.token);
      setTimeout(() => {
        navigate(`/customer/orders/${id}`);
      }, timeOut);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PrivateHeader />
      <Container className="d-flex flex-column h-100 p-5">
        <h1 className="mb-2">Finalizar Pedido</h1>
        <Container className="d-flex flex-column align-items-end border pt-4 pb-2">
          <ClientProductTable
            testSufix="customer_checkout"
            data={ products }
            removeAction
            removeCallback={ removeProduct }
          />
          <h2
            className="bg-success text-light rounded p-2"
          >
            Total: R$
            {' '}
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              { cartTotal.toLocaleString('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
              })}
            </span>
          </h2>
        </Container>
      </Container>
      <Container className="d-flex flex-column h-100 p-5">
        <h2 className="mb-2">Detalhes e Endereço para Entrega</h2>
        <Container className="d-flex flex-column align-items-end border pt-4 pb-2">
          <DeliveryForm sendSale={ sendSale } />
        </Container>
      </Container>
    </>
  );
}

export default CustomerCheckout;
