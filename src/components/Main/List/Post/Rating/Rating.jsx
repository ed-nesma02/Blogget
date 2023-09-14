import style from './Rating.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const Rating = ({ups}) => (
  <div className={style.rating}>
    <button className={style.up} aria-label="Повысить рейтинг"></button>
    <Text As="a" size={10} tsize={16} bold={true} color="grey99">
      {ups}
    </Text>
    <button className={style.down} aria-label="Понизить рейтинг"></button>
  </div>
);

Rating.propTypes = {
  ups: PropTypes.number,
};
