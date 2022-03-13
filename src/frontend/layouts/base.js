import React from 'react';
import Header from '../components/header';
import Container from '../components/grid/container';
import styled from 'styled-components';

const Main = styled.main`
  padding: 40px 0;
`;

const Base = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Container>
          {children}
        </Container>
      </Main>
    </>
  );
};

export default Base;
