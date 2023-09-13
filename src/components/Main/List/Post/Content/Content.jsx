import style from './Content.module.css';
import PropTypes from 'prop-types';

export const Content = ({title, author}) => (
  <div className={style.content}>
    <h2 className={style.title}>
      <a href="#post" className={style.linkPost}>
        {title}
      </a>
    </h2>
    <a href="#author" className={style.linkAuthor}>
      {author}
    </a>
  </div>
);

Content.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
};
