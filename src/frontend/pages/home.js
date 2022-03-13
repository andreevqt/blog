import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Base from '../layouts/base';
import { fetchPosts } from '../services/slices/posts';
import { Col, Row } from '../components/grid';
import PostCard from '../components/post-card';
import Pagination from '../components/pagination';
import Button from '../components/button';
import { reset } from '../services/slices/posts';

const Home = () => {
  const dispatch = useDispatch();
  const {
    items,
    isLoading,
    hasMore,
    page,
    totalPages
  } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.user);

  const getPosts = (num) => dispatch(fetchPosts(num));

  useEffect(() => {
    getPosts();
    return () => {
      dispatch(reset());
    }
  }, []);

  return (
    <Base>
      <Row $center>
        <Col md={6}>
          {user && <Button to="/post/add" className='mb-15'>Add post</Button>}
          {items.map((post) => (
            <PostCard key={post.id} post={post}>
              {post.title}
            </PostCard>
          ))}
          <Pagination onClick={getPosts} pages={{ page, totalPages, perPage: 15 }} />
        </Col>
      </Row>
    </Base>
  );
};

export default Home;
