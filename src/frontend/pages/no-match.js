import React from 'react';
import { Link } from 'react-router-dom'
import Base from '../layouts/base';
import Text from '../components/text';
import { Col, Row } from '../components/grid';

const NoMatch = () => {
  return (
    <Base>
      <Row $center>
        <Col md={5}>
          <Text variant="h3" className="mb-20">404 Not Found</Text>
          <Link className="link" to="/">Home</Link>
        </Col>
      </Row>
    </Base>
  );
};

export default NoMatch;
