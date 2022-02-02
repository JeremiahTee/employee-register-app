import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

const defaultImageSrc = '/img/image_placeholder.png';

const initialFieldValues = {
  employeeId: 0,
  employeeName: '',
  occupation: '',
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export const Employee = () => {
  const [values, setValues] = useState(initialFieldValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  return (
    <>
      <div className='container text-center'>
        <p className='lead'>Employee</p>
      </div>
      <form autoComplete='off' noValidate>
        <div className='card'>
          <img src={values.imageSrc} className='card-img-top' alt='employee' />
          <div className='card-body'></div>
          <FormGroup>
            <input
              type='file'
              accept='image/*'
              className='form-control-file'
              onChange={showPreview}
            ></input>
          </FormGroup>
          <FormGroup>
            <FormControl
              placeholder={'Employee Name'}
              name='employeeName'
              value={values.employeeName}
              onChange={handleInputChange}
            ></FormControl>
            <FormControl
              placeholder={'Occupation'}
              name='occupation'
              value={values.occupation}
              onChange={handleInputChange}
            ></FormControl>
          </FormGroup>
        </div>
      </form>
    </>
  );
};
