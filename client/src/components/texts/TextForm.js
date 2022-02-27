import React, { useState, useContext, useEffect, Fragment } from 'react';
import TextContext from '../contexts/texts/TextContexts';
import { v4 } from 'uuid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'

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

  const [txtEditor, setTxtEditor] = useState('')

  const txtHandler = (e, editor) => {
    const data = editor.getData()
    setTxtEditor(data)
    console.log(editor.getData())
  }

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
    <Fragment>
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
      <br />
      <CKEditor editor={ClassicEditor} onChange={txtHandler} />
      <hr />
      <p>{parse(txtEditor)}</p>
    </Fragment>

  );
};

export default TextForm;
