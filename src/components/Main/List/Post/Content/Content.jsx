import style from './Content.module.css';
import PropTypes from 'prop-types';
import {Text} from '../../../../../UI/Text';

export const Content = ({title, author}) => (
  <div className={style.content}>
    <Text As="h2" className={style.title}>
      <Text As="a" size={18} tsize={24} href="#post" className={style.linkPost}>
        {title}
      </Text>
    </Text>
    <Text
      As="a"
      size={12}
      tsize={14}
      color="orange"
      href="#author"
      className={style.linkAuthor}
    >
      {author}
    </Text>
  </div>
);

Content.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
};
