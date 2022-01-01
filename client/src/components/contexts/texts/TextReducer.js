import {
  ADD_TEXT,
  AUTH_ERROR,
  GET_TEXTS,
  DELETE_TEXT,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_ERRORS,
  CLEAR_TEXTS,
  CLEAR_FILTER,
  UPDATE_TEXT,
  FILTER_TEXTS,
  TEXT_ERROR,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TEXTS:
      return {
        ...state,
        texts: action.payload,
        loading: false,
      };
    case ADD_TEXT:
      return {
        ...state,
        texts: [action.payload, ...state.texts],
      };
    case DELETE_TEXT:
      return {
        ...state,
        texts: state.texts.filter((text) => text._id !== action.payload),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_TEXT:
      return {
        ...state,
        texts: state.texts.map((text) =>
          text._id === action.payload._id ? action.payload : text
        ),
        loading: false,
      };
    case FILTER_TEXTS:
      return {
        ...state,
        filtered: state.texts.filter((text) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return text.title.match(regex) || text.textarea.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case TEXT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_TEXTS:
      return {
        ...state,
        texts: null,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
