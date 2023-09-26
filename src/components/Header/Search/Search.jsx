import {useDispatch} from 'react-redux';
import style from './Search.module.css';
import {ReactComponent as SearchIcon} from './img/search.svg';
import {useEffect, useState} from 'react';
import {postsDataSlice} from '../../../store/postsData/postsDataSlice';
import {useNavigate, useParams} from 'react-router-dom';

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const {page} = useParams();
  const handlerSubmit = (e) => {
    e.preventDefault();
    dispatch(postsDataSlice.actions.searchRequest({search}));
    navigate(`/category/search`);
  };

  useEffect(() => {
    setSearch('');
  }, [page]);

  return (
    <form className={style.form} onSubmit={handlerSubmit}>
      <input
        className={style.search}
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button className={style.button} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
