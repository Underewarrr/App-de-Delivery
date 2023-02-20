import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import authContext from '../contexts/auth';
import useStorage from '../../hooks/useStorage';

function AuthProvider({ children }) {
  const [user, setUser] = useStorage('user', null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <authContext.Provider
      value={ value }
    >
      {children}
    </authContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;
