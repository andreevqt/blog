import React from 'react';
import styled from 'styled-components';
import Button from './button';
import Container from './grid/container';
import { Link } from 'react-router-dom';
import Popup from './popup';
import { useDispatch, useSelector } from 'react-redux';

const StyledHeader = styled.header`
  ${({ theme }) => `
    position: relative;
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
  const { lastErr, user } = useSelector((store) => ({
    user: store.user.user,
    lastErr: store.error.lastErr
  }));

  return (
    <>
      <StyledHeader>
        <Container>
          <Logo to="/">
            The Blog App
          </Logo>
          <Buttons>
            {user
              ? <Button to="/logout"  variant="secondary" >Logout</Button>
              : (
                <>
                  <Button to="/register" variant="secondary" className="mr-10">
                    Register
                  </Button>
                  <Button to="/login" variant="secondary">
                    Login
                  </Button>
                </>
              )
            }
          </Buttons>
        </Container>
      </StyledHeader>
      {lastErr && (
        <Popup>{
          lastErr
        }</Popup>
      )}
    </>
  );
};

export default Header;
