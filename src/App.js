import React from 'react';
import {useDispatch} from 'react-redux';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';
import {Route, Routes} from 'react-router-dom';

function App() {
  const dispath = useDispatch();
  dispath(updateToken(getToken()));
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      ></Route>
    </Routes>
  );
}

export default App;
