import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text/Text';
import {useEffect, useState} from 'react';
import {useAuth} from '../../../hooks/useAuth';
import {PuffPreloader} from '../../../UI/PuffPreloader/PuffPreloader';
import {Notification} from '../../Notification/Notification';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {
  const [logout, setLogout] = useState(false);
  const [auth, status, unAuth] = useAuth();
  const navigate = useNavigate();
  const changeLogout = () => {
    setLogout(!logout);
  };

  useEffect(() => {
    if (status === 'loaded') {
      navigate('/');
    }
  }, [status]);

  return (
    <div className={style.container}>
      {status === 'loading' && <PuffPreloader />}
      {(status === 'idle' || status === 'error') && (
        <>
          {status === 'error' && <Notification />}
          <Text As="a" href={urlAuth}>
            <LoginIcon className={style.svg} />
          </Text>
        </>
      )}
      {status === 'loaded' && (
        <>
          <button className={style.btn} onClick={changeLogout}>
            <img
              className={style.img}
              src={auth.img}
              alt={`Аватар ${auth.name}`}
              title={auth.name}
            />
          </button>
          {logout && (
            <button href="/" className={style.logout} onClick={unAuth}>
              Выйти
            </button>
          )}
        </>
      )}
    </div>
  );
};
