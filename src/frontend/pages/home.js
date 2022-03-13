import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Base from '../layouts/base';
import Text from '../components/text';
import { fetchPosts } from '../services/slices/posts';
import Col from '../components/grid/col';
import Row from '../components/grid/row';

const Home = () => {
  const dispatch = useDispatch();
  const {
    items,
    isLoading,
    hasMore
  } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Base>
      <Row $center>
        <Col md={6}>
          {items.map((post) => (
            <Text key={post.id} variant="h5">
              {post.title}
            </Text>
          ))}
        </Col>
      </Row>
    </Base>
  );
};

export default Home;
