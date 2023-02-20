import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from '../store/contexts/auth';

function PrivateRoutes({ permissionRole = null }) {
  const { user } = useContext(authContext);

  if (permissionRole) {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

PrivateRoutes.propTypes = {
  permissionRole: PropTypes.string,
};

PrivateRoutes.defaultProps = {
  permissionRole: null,
};

export default PrivateRoutes;
