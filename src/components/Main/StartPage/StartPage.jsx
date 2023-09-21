import {Text} from '../../../UI/Text';
import style from './StartPage.module.css';

export const StartPage = () => (
  <div className={style.wrapper}>
    <Text As="h2" tsize={26} size={22} className={style.title}>
      Стартовая страница
    </Text>
    <Text As="p" tsize={20} size={16}>Добро пожаловать!</Text>
    <Text As="p" tsize={18} size={14}>Выберите категорию</Text>
  </div>
);
