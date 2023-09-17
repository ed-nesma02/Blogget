import style from './Auth.module.css';
import {ReactComponent as LoginIcon} from './img/login.svg';
import {urlAuth} from '../../../api/auth';
import {Text} from '../../../UI/Text/Text';
import {useContext, useState} from 'react';
import {authContext} from '../../../context/authContext';

export const Auth = () => {
  const [logout, setLogout] = useState(false);
  const {auth, unAuth} = useContext(authContext);
  const changeLogout = () => {
    setLogout(!logout);
  };

  return (
    <div className={style.container}>
      {auth.name ? (
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
      ) : (
        <Text As="a" href={urlAuth}>
          <LoginIcon className={style.svg} />
        </Text>
      )}
    </div>
  );
};
