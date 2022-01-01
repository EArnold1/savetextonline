import React, { useContext } from 'react';
import TextContext from '../contexts/texts/TextContexts';

const Textitem = ({ text }) => {
  const { setCurrent, deleteText } = useContext(TextContext);
  const { title, textarea } = text;

  const onSetCurrent = () => {
    setCurrent(text);
  };
  const onDelete = () => {
    deleteText(text._id);
  };
  return (
    <div className="card mb-1">
      <div className="card-title">
        <h3 className="border-bottom p-1">{title}</h3>
      </div>
      <p className="card-body"> {textarea} </p>
      <div className="m-1">
        <button
          className="btn btn-info btn-sm float-start"
          onClick={onSetCurrent}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button className="btn btn-danger btn-sm float-end" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Textitem;
