import React from 'react';
import Header from '../components/header';
import Container from '../components/grid/container';

const Base = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container>
          {children}
        </Container>
      </main>
    </>
  );
};

export default Base;
