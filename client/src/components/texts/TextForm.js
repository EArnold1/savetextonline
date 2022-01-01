import React, { useState, useContext, useEffect } from 'react';
import TextContext from '../contexts/texts/TextContexts';
import { v4 } from 'uuid';

const TextForm = () => {
  const { addText, current, clearCurrent, updateText } =
    useContext(TextContext);

  const [textstate, setText] = useState({
    title: '',
    textarea: '',
    id: v4(),
  });

  useEffect(() => {
    if (current !== null) {
      setText(current);
    } else {
      setText({
        title: '',
        textarea: '',
        id: v4(),
      });
    }
  }, [current, TextContext]);

  const clearAll = () => {
    clearCurrent();
    setText({
      title: '',
      textarea: '',
      id: v4(),
    });
  };

  const { title, textarea } = textstate;
  const onChange = (e) => {
    setText({ ...textstate, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current !== null) {
      updateText(textstate);
    } else {
      addText(textstate);
    }
    clearAll();
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control"
        type="text"
        name="title"
        value={title}
        placeholder="Enter Title"
        onChange={onChange}
      />
      <textarea
        className="form-control mt-3"
        name="textarea"
        id=""
        cols="30"
        value={textarea}
        rows="10"
        placeholder="Type here....."
        onChange={onChange}
        required
      ></textarea>
      <div className="d-grid mt-3">
        {current === null ? (
          <button className="bd-success btn btn-success btn-block">
            Add <i className="fas fa-plus-circle"></i>{' '}
          </button>
        ) : (
          <button className="bd-success btn btn-success btn-block">
            Update <i className="fas fa-plus-circle"></i>{' '}
          </button>
        )}
      </div>
    </form>
  );
};

export default TextForm;