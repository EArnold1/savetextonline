import React, { useState, useContext } from 'react';
import TextContext from '../contexts/texts/TextContexts';
import Textfileitem from './Textfileitem';
import Textfilter from '../texts/Textfilter';
import AuthContext from '../contexts/auth/AuthContext';

const Textfiles = (props) => {
  const { loadUser, token } = useContext(AuthContext);
  const { texts, filtered, getTexts } = useContext(TextContext);

  useState(() => {
    loadUser();
    getTexts();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <Textfilter />
      <div className="row">
        {filtered !== null
          ? filtered.map((text) => <Textfileitem text={text} key={text._id} />)
          : texts.map((text) => <Textfileitem text={text} key={text._id} />)}
      </div>
    </div>
  );
};

export default Textfiles;
