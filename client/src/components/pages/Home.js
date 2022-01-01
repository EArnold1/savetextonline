import React, { useContext, useState } from 'react';
import TextForm from '../texts/TextForm';
import Texts from '../texts/Texts';
import AuthContext from '../contexts/auth/AuthContext';

const Home = () => {
  const { loadUser } = useContext(AuthContext);
  useState(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="row p-2">
      <div className="col mt-2">
        <TextForm />
      </div>
      <div className="col mt-2">
        <Texts />
      </div>
    </div>
  );
};

export default Home;
