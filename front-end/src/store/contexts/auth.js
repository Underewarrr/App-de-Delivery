import { createContext } from 'react';

const authContext = createContext({
  user: null,
});

export default authContext;
