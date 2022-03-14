import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Text from './text';
import ChevronDown from '../icons/chevron-down';
import Pen from '../icons/pen';
import { useSelector } from 'react-redux';

const Card = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 2px rgb(48 54 60 / 15%);
  border-radius: 3px;
  margin-bottom: 15px;
`

const CardTitle = styled(Text).attrs(() => ({ variant: 'h5', className: 'mb-0' }))`
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;
`;

const CardHeader = styled.div`
  position: relative;
  padding: 20px 40px 20px 20px;
  display: flex;
  cursor: pointer;
`;

const CardBody = styled.div`
  ${({ theme }) => `
    border-top: 1px solid ${theme.borderColor};
    padding: 20px;
  `}
  img {
    margin-bottom: 10px;
  }
`;

const Icon = styled.div`
  position: absolute;
  right: 20px;
  font-size: 0;
`;

const EditBtn = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: -60px;
  top: 0;
  background-color: #fff;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  box-shadow: 0 1px 2px rgb(48 54 60 / 15%);
`;

const PostCard = ({
  post
}) => {
  const [isOpen, setOpen] = useState(false);

  const { user } = useSelector((store) => store.user);
  const isAuthor = user && user.id == post.author.id;

  const history = useHistory();
  const onEditClick = () => history.push({ pathname: `/post/${post.id}` });

  return (
    <Card>
      <CardHeader onClick={() => setOpen(!isOpen)}>
        <CardTitle variant="h5" className="mb-0">
          {post.title}
        </CardTitle>
        <Icon type="button">
          <ChevronDown width="12" heigh="12" />
        </Icon>
      </CardHeader>
      {isOpen && (
        <CardBody dangerouslySetInnerHTML={{__html: post.content}} />
      )}
      {isAuthor && (
        <EditBtn onClick={onEditClick}>
          <Pen width="16" height="16" />
        </EditBtn>
      )}
    </Card>
  );
};

export default PostCard;
