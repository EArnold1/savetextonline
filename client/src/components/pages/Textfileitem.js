import React, { useContext, useState } from 'react';
import TextContext from '../contexts/texts/TextContexts';
import { Link, Redirect } from 'react-router-dom';
import parse from 'html-react-parser'


const Textfileitem = ({ text }) => {
  const { title, textarea } = text;

  const { setCurrent, current, deleteText } = useContext(TextContext);
  const onSetCurrent = () => {
    setCurrent(text);
  };
  const onDelete = () => {
    deleteText(text._id);
  };
  return text === null || text === [] ? (
    <Link to="/">
      <div className="text-center btn">Add Text</div>
    </Link>
  ) : (
    <div className="col-sm-12 my-1">
      <div className="card p-2">
        {title && <h3 className="card-title">{title}</h3>}
        <div className="card-body">{parse(textarea)}</div>
        <div className="m-1">
          {current !== null ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/textfiles" />
          )}
          <button
            className="btn btn-info btn-sm float-start"
            onClick={onSetCurrent}
          >
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button
            className="btn btn-danger btn-sm float-end"
            onClick={onDelete}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Textfileitem;
