import React, { Fragment, useContext, useState } from 'react';
import TextContext from '../contexts/texts/TextContexts';
import Textitem from './Textitem';

const Texts = () => {
  const { texts, getTexts } = useContext(TextContext);
  useState(() => {
    getTexts();
  });

  return (
    <div className="container">
      {texts !== null && <Textitem text={texts[0]} key={texts[0]._id} />}
    </div>
  );
};

export default Texts;
