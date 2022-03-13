import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${({ theme, $gutter = true, $center = false, $end = false }) => `
    ${$gutter && `margin-left: -${theme.grid.gutter}px;`}
    ${$gutter && `margin-right: -${theme.grid.gutter}px;`}
    ${$center && `justify-content: center;`}
    ${$end && `justify-content: end;`}
    ${$gutter && `padding: 0 ${theme.grid.gutter}px;`}
    & > * {
      box-sizing: border-box;
      flex-shrink: 0;
      width: 100%;
      max-width: 100%;
      ${$gutter && `padding: 0 ${theme.grid.gutter}px;`}
    }
  `}
`;

export default Row;
