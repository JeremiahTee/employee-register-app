import React from 'react';
import { Employee } from './Employee';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const EmployeeList = () => {
  const employeeAPI = (url = 'https://localhost:7279/api/Employee') => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + id, updateRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  // Consume WebApi methods for insert/update image operations
  const addOrEdit = (formData, onSuccess) => {
    employeeAPI()
      .create(formData)
      .then((res) => {
        onSuccess();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Row>
      <Container fluid>
        <h2 className='text-center'>Employee Register</h2>
      </Container>
      <Col md={4}>
        <Employee addOrEdit={addOrEdit} />
      </Col>
      <Col md={8}>
        <div>List of employee records</div>
      </Col>
    </Row>
  );
};
