import React from 'react';
import { Employee } from './Employee';
import { Container, Row, Col } from 'react-bootstrap';

export const EmployeeList = () => {
  return (
    <Row>
      <Container fluid>
        <h2>Employee Register</h2>
      </Container>
      <Col md={4}>
        <Employee />
      </Col>
      <Col md={8}>
        <div>List of employee records</div>
      </Col>
    </Row>
  );
};
