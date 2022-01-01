import React, { useRef, useEffect, useContext } from 'react';
import TextContext from '../contexts/texts/TextContexts';

const Textfilter = () => {
  const { filtered, filterTexts, clearFilter } = useContext(TextContext);
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    // eslint-disable-next-line
  }, []);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterTexts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form className="my-2">
      <input
        ref={text}
        type="text"
        onChange={onChange}
        placeholder="Filter Contacts..."
        className="form-control"
      />
    </form>
  );
};

export default Textfilter;
