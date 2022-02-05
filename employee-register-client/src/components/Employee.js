import React from 'react';
import { useState, useEffect } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';

const defaultImageSrc = '/img/image_placeholder.png';

const initialFieldValues = {
  employeeID: 0,
  employeeName: '',
  occupation: '',
  imageName: '',
  imageSrc: defaultImageSrc,
  imageFile: null,
};

export const Employee = ({ addOrEdit }) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

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

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName === '' ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;
    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    document.getElementById('image-uploader').value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('employeeID', values.employeeID);
      formData.append('employeeName', values.employeeName);
      formData.append('occupation', values.occupation);
      formData.append('imageName', values.imageName);
      formData.append('imageFile', values.imageFile);
      formData.append('imageSrc', values.imageSrc);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? ' invalid-field' : '';

  return (
    <>
      <div className='container text-center'>
        <p className='lead'>Employee</p>
      </div>
      <form autoComplete='off' noValidate onSubmit={handleFormSubmit}>
        <div className='card'>
          <img src={values.imageSrc} className='card-img-top' alt='employee' />
          <div className='card-body'></div>
          <FormGroup>
            <input
              type='file'
              accept='image/*'
              className={'form-control-file' + applyErrorClass('imageSrc')}
              onChange={showPreview}
              id='image-uploader'
            ></input>
          </FormGroup>
          <FormGroup>
            <FormControl
              className={'form-control' + applyErrorClass('employeeName')}
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
            <FormGroup className='text-center'>
              <button type='submit' className='btn btn-light'>
                Submit
              </button>
            </FormGroup>
          </FormGroup>
        </div>
      </form>
    </>
  );
};
