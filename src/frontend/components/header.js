import React from 'react';
import styled from 'styled-components';
import Button from './button';
import Container from './grid/container';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  ${({ theme }) => `
    padding: 15px 0;
    background-color: ${theme.colors.primary.base};
    color: #fff;
    & > ${Container} {
      display: flex;
      align-items: center;
    }
  `}
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 600;
`;

const Buttons = styled.div`
  margin-left: auto;
  display: flex;
`;

const Header = () => {
  return (
    <StyledHeader>
      <Container>
        <Logo to="/">
          The Blog App
        </Logo>
        <Buttons>
          <Button to="/register" variant="secondary" className="mr-10">
            Регистрация
          </Button>
          <Button to="/register" variant="secondary">
            Вход
          </Button>
        </Buttons>
      </Container>
    </StyledHeader>
  );
};

export default Header;
