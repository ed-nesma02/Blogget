import React from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../hooks/useAuth';

export const authContext = React.createContext({});

export const AuthContextProvider = ({children}) => {
  const [auth, unAuth] = useAuth();

  return (
    <authContext.Provider value={{auth, unAuth}}>
      {children}
    </authContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
