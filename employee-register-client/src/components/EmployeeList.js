import React, { useState, useEffect, useCallback } from 'react';
import { Employee } from './Employee';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  const employeeAPI = (url = 'https://localhost:7279/api/Employee') => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updateRecord) => axios.put(url + id, updateRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  const refreshEmployeeList = useCallback(() => {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        console.log(
          `Res.data: ${JSON.stringify(
            res.data
          )} of type: ${typeof JSON.stringify(res.data)}`
        );
        setEmployeeList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    refreshEmployeeList();
  }, [refreshEmployeeList]);

  // Consume WebApi methods for insert/update image operations
  const addOrEdit = (formData, onSuccess) => {
    employeeAPI()
      .create(formData)
      .then((res) => {
        onSuccess();
        refreshEmployeeList();
      })
      .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const imageCard = (data) => (
    <div className='card' onClick={() => showRecordDetails(data)}>
      <img
        src={data.imageSrc}
        className='card-img-top rounded'
        alt='employee'
      />
      <div className='card-body'>
        <h5>{data.employeeName}</h5>
        <span>{data.occupation}</span>
      </div>
    </div>
  );

  return (
    <Row>
      <Container fluid>
        <h2 className='text-center'>Employee Register</h2>
      </Container>
      <Col md={4}>
        <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </Col>
      <Col md={8}>
        <table>
          <tbody>
            {
              // tr > 3 td
              [...Array(Math.ceil(employeeList.length / 3))].map((e, i) => (
                <tr key={i}>
                  <td>{imageCard(employeeList[3 * i])}</td>
                  <td>
                    {employeeList[3 * i + 1] // display employee for a single td cell
                      ? imageCard(employeeList[3 * i + 1])
                      : null}
                  </td>
                  <td>
                    {employeeList[3 * i + 2]
                      ? imageCard(employeeList[3 * i + 2])
                      : null}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </Col>
    </Row>
  );
};
