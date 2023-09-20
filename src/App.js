import React from 'react';
import {useDispatch} from 'react-redux';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';

function App() {
  const dispath = useDispatch();
  dispath(updateToken(getToken()));
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
