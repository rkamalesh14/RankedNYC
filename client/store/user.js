import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';
const GOT_DATA = 'GOT_DATA';
const SELECTED_LIST = 'SELECTED_LIST';

/**
 * INITIAL STATE
 */
const initialState = { user: {}, lists: [], selected: {} };

/**
 * ACTION CREATORS
 */
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const gotData = data => ({ type: GOT_DATA, data });
const selectedList = list => ({ type: SELECTED_LIST, list });

/**
 * THUNK CREATORS
 */

export const selectList = list => dispatch => {
  dispatch(selectedList(list));
  history.push('/');
};
export const getData = (url, name) => async dispatch => {
  try {
    const { data } = await axios.post('/api/search', { url, name });
    dispatch(gotData({ name, data }));
    history.push('/');
  } catch (err) {
    console.error(err);
  }
};

export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || initialState.user)))
    .catch(err => console.error(err));

export const auth = (email, password, method) => dispatch =>
  axios
    .post(`/auth/${method}`, { email, password })
    .then(
      res => {
        dispatch(getUser(res.data));
        history.push('/home');
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({ error: authError }));
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr));

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser());
      history.push('/login');
    })
    .catch(err => console.error(err));

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return initialState;
    case GOT_DATA:
      return {
        ...state,
        lists: [...state.lists, action.data],
        selected: action.data,
      };
    case SELECTED_LIST:
      return { ...state, selected: action.list };
    default:
      return state;
  }
}
