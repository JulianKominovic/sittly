import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';

const Commands = () => {
  return (
    <Routes>
      <Route path="/Commands/edit" element={<div>Hola</div>} />
      <Route path="/" element={<Link to="/Commands/edit">index</Link>} />
    </Routes>
  );
};

export default Commands;
