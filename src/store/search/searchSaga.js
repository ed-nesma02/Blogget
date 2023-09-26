import axios from 'axios';
import {URL_API} from '../../api/const';
import {takeLatest, put, select} from 'redux-saga/effects';
import {postsDataSlice} from '../postsData/postsDataSlice';

function* fetchSearch({payload: {search}}) {
  const token = yield select((state) => state.token.token);
  try {
    const request = yield axios(`${URL_API}/search?limit=10&q=${search}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    yield put(
      postsDataSlice.actions.searchRequestSuccess({
        data: request.data.data.children,
        after: request.data.data.after,
      })
    );
  } catch (error) {
    yield put(postsDataSlice.actions.searchRequestError({error}));
  }
}

export function* watchSearch() {
  yield takeLatest('postsData/searchRequest', fetchSearch);
}
