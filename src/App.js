import React from 'react';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {useToken} from './hooks/useToken';

function App() {
  const [token, delToken] = useToken('');

  return (
    <React.Fragment>
      <Header token={token} delToken={delToken} />
      <Main />
    </React.Fragment>
  );
}

export default App;
