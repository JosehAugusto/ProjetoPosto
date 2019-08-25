import axios from 'axios';

import {
  GET_POSTOS,
  ADD_POSTO,
  UPDATE_POSTO,
  DELETE_POSTO,
  SET_CURRENT_POSTO,
  CLEAR_CURRENT_POSTO,
  SEARCH_POSTOS,
  CLEAR_SEARCHED_POSTOS,
  POSTO_ERROR,
  SET_CURRENT_DAY_AVGS,
  SET_PREVIOS_DAY_AVGS
} from './types';


//Calculate avgs

export const calcAvgs = postos => dispatch => {

  console.log(postos);

  let result = {comun: 4, aditivada: 5, alcool: 2, diesel: 3, gnv: 2, etanol: 6};

  dispatch({
    type: SET_CURRENT_DAY_AVGS,
    payload: result
  });
}

// Get postos from server
export const getPostos = () => async dispatch => {
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

export const addPosto = posto => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/postos', posto, config);

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

// Delete Posto
export const deletePosto = id => async dispatch => {
  try {
    await axios.delete(`/api/postos/${id}`);

    dispatch({
      type: DELETE_POSTO,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: POSTO_ERROR,
      payload: err.response.msg
    });
  }
};

// Clear searched postos from state
export const clearSearchedPostos = () => {
  return {
    type: CLEAR_SEARCHED_POSTOS
  };
};

// Search postos
export const searchPostos = search_text => {
  return {
    type: SEARCH_POSTOS,
    payload: search_text
  };
};

// Set current posto
export const setCurrentPosto = posto => {
  return {
    type: SET_CURRENT_POSTO,
    payload: posto
  };
};

// Set current posto
export const clearCurrentPosto = () => {
  return {
    type: CLEAR_CURRENT_POSTO
  };
};


// Update posto
export const updatePosto = posto => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      `/api/postos/${posto._id}`,
      posto,
      config
    );

    dispatch({
      type: UPDATE_POSTO,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POSTO_ERROR,
      payload: err.response.msg
    });
  }
};