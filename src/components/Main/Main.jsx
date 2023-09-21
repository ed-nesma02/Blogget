import style from './Main.module.css';
import Layout from '../Layout';
import Tabs from './Tabs';
import List from './List';
import {Route, Routes} from 'react-router-dom';
import {Modal} from '../Modal/Modal';
import {ErrorPage} from './ErrorPage/ErrorPage';
import {StartPage} from './StartPage/StartPage';

export const Main = () => (
  <main className={style.main}>
    <Layout>
      <Tabs />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<StartPage />} />
        <Route path="/category/:page" element={<List />}>
          <Route path="post/:id" element={<Modal />} />
        </Route>
      </Routes>
    </Layout>
  </main>
);
