import React from 'react';
import styled from 'styled-components';
import pagination from '../services/pagination';

const List = styled.ul`
  padding-top: 15px;
  padding-bottom: 40px;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items:center;
  margin-bottom: 0;
  padding-left: 0;
`;

const ListItem = styled.li`
  margin-right: 15px;
`;

const ListLink = styled.a`
  ${({ theme, current = false }) => `
    color: ${current ? theme.colors.primary.base : theme.mutedColor};
    ${current && `font-weight: 500`};
  `}
`;

const Pagination = ({
  pages: { page, totalPages, perPage },
  onClick = () => null
}) => {
  const items = pagination.makePagination(page, totalPages, perPage);
  return (
    <List>{
      items.map((item, index) => (
        <ListItem key={index}>{
          item !== `...`
            ? (
              <ListLink
                current={page === item}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(item);
                }}
                href="/"
              >
                {item}
              </ListLink>
            )
            : item
        }</ListItem>))
    }</List>
  );
};

export default Pagination;
