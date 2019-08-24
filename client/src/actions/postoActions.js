import {
  GET_POSTOS,
  ADD_POSTO,
  UPDATE_POSTO,
  DELETE_POSTO,
  SET_CURRENT_POSTO,
  CLEAR_CURRENT_POSTO,
  SEARCH_POSTOS,
  CLEAR_SEARCHED_POSTOS,
} from './types';

// Get postos from server
const getPostos = async () => {
  try {
    const res = await axios.get('/api/postos');

    dispatch({
      type: GET_POSTOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTO_ERROR,
      payload: err.response.msg
    });
  }
};

// Add Posto
const addPosto = async posto => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/contacts', posto, config);

    dispatch({
      type: ADD_POSTO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTO_ERROR,
      payload: err.response.msg
    });
  }
};