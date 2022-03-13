import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.2;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.2;
    font-weight: 600;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  .mr-10 {
    margin-right: 10px;
  }
`;

export default GlobalStyle;
