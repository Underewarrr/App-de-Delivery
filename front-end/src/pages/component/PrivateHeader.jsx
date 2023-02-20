import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import authContext from '../../store/contexts/auth';

const NAV_BAR_BUTTON_BG = 'bg-primary';

function PrivateHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(authContext);
  const { name, role } = user;

  const logOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const navBar = () => {
    switch (role) {
    case 'customer':
      return (
        <>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
            className={
              `${location.pathname === '/customer/products' ? NAV_BAR_BUTTON_BG : ''} 
              text-light h-100 d-flex align-items-center px-5 w-fit`
            }
          >
            Produtos
          </Link>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
            className={
              `${location.pathname === 'customer/orders' ? NAV_BAR_BUTTON_BG : ''} 
              text-light h-100 d-flex align-items-center px-5`
            }
          >
            Meus Pedidos
          </Link>
        </>
      );
    case 'seller':
      return (
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
          className={
            `${location.pathname === '/seller/orders' ? NAV_BAR_BUTTON_BG : ''} 
            text-light h-100 d-flex align-items-center px-5 w-fit`
          }
        >
          Pedidos
        </Link>
      );
    case 'administrator':
      return (
        <Link
          to="/admin/manage"
          data-testid="customer_products__element-navbar-link-orders"
          className={
            `${location.pathname === '/admin/manage' ? NAV_BAR_BUTTON_BG : ''} 
            text-light h-100 d-flex align-items-center px-5 w-fit`
          }
        >
          Gerencia Usuários
        </Link>
      );
    default:
      return null;
    }
  };

  return (
    <header className="d-flex justify-content-between bg-success">
      <Navbar className="row py-0 gx-0 text-light">
        { navBar() }
      </Navbar>
      <div className="d-flex justify-content-between align-items-center bg-warning p-2">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          className="h-100 d-flex align-items-center px-5 mb-0"
        >
          { name }
        </p>
        <Button
          onClick={ logOut }
          data-testid="customer_products__element-navbar-link-logout"
          className="px-3"
        >
          sair
        </Button>
      </div>
    </header>
  );
}

export default PrivateHeader;
