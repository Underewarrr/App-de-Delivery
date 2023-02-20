import { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';

import PrivateHeader from './component/PrivateHeader';
import authContext from '../store/contexts/auth';
import { requestData } from '../services/request';
import OrderCard from './component/OrderCard';

export default function SellerOrders() {
  const { user: seller } = useContext(authContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await requestData('orders/seller', seller.token);
      setOrders(data);
    };

    fetchOrders();
  }, [seller.token]);

  return (
    <>
      <PrivateHeader />
      <Container className="d-flex flex-wrap h-100 p-5">
        {orders.map((order) => (
          <OrderCard
            key={ order.id }
            order={ order }
            baseLink="seller"
            testSufix="seller_orders"
          />
        ))}
      </Container>
    </>
  );
}
