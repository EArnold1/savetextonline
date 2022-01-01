import React, { useReducer } from 'react';
import TextContext from './TextContexts';
import axios from 'axios';
import { v4 } from 'uuid';
import TextReducer from './TextReducer';
import {
  ADD_TEXT,
  TEXT_ERROR,
  GET_TEXTS,
  DELETE_TEXT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_ERRORS,
  CLEAR_TEXTS,
  CLEAR_FILTER,
  UPDATE_TEXT,
  FILTER_TEXTS,
} from '../types';

const TextState = (props) => {
  const initialState = {
    texts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(TextReducer, initialState);

  //ADD TEXTS
  const addText = async (text) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/texts', text, config);
      dispatch({ type: ADD_TEXT, payload: res.data });
    } catch (err) {
      dispatch({ type: TEXT_ERROR, payload: err.response.msg });
    }
  };
  //GET TEXTS
  const getTexts = async () => {
    try {
      const res = await axios.get('/api/texts');
      dispatch({ type: GET_TEXTS, payload: res.data });
    } catch (err) {
      dispatch({ type: TEXT_ERROR, payload: err.response.msg });
    }
  };
  //UPDATE TEXTS
  const updateText = async (text) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/texts/${text._id}`, text, config);
      dispatch({ type: UPDATE_TEXT, payload: res.data });
    } catch (err) {
      dispatch({ type: TEXT_ERROR, payload: err.message.msg });
    }

    dispatch({ type: UPDATE_TEXT, payload: text });
  };
  //DELETE TEXTS
  const deleteText = async (id) => {
    try {
      await axios.delete(`/api/texts/${id}`);
      dispatch({ type: DELETE_TEXT, payload: id });
    } catch (err) {
      dispatch({ type: TEXT_ERROR, payload: err.response.msg });
    }
  };
  //SET CURRENT
  const setCurrent = (texts) => {
    dispatch({ type: SET_CURRENT, payload: texts });
  };
  //CLEAR CURRENT TEXTS
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //FILTER TEXTS
  const filterTexts = (texts) => {
    dispatch({ type: FILTER_TEXTS, payload: texts });
  };
  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  //Clear Texts
  const clearTexts = () => {
    dispatch({ type: CLEAR_TEXTS });
  };

  return (
    <TextContext.Provider
      value={{
        texts: state.texts,
        filtered: state.filtered,
        current: state.current,
        addText,
        filterTexts,
        clearFilter,
        setCurrent,
        updateText,
        clearCurrent,
        deleteText,
        getTexts,
        clearTexts,
      }}
    >
      {props.children}
    </TextContext.Provider>
  );
};

export default TextState;
