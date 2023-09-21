import {Text} from '../../../UI/Text';
import style from './ErrorPage.module.css';

export const ErrorPage = () => (
  <Text As="p" center={true} color='orange' className={style.text}>
    404
  </Text>
);
